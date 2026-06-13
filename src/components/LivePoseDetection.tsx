import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { AlertTriangle, Camera, Download, X } from 'lucide-react';

interface LivePoseDetectionProps {
  className?: string;
  hideCapture?: boolean;
  hideOverlayUI?: boolean;
}

export default function LivePoseDetection({ className, hideCapture, hideOverlayUI }: LivePoseDetectionProps = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [warning, setWarning] = useState(false);
  const [backAngle, setBackAngle] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    // Create an offscreen canvas to combine video and overlay
    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = videoRef.current.videoWidth;
    combinedCanvas.height = videoRef.current.videoHeight;
    const ctx = combinedCanvas.getContext('2d');
    
    if (ctx) {
      // Mirror context so the captured image matches the CSS-mirrored preview
      ctx.translate(combinedCanvas.width, 0);
      ctx.scale(-1, 1);
      
      // Draw video frame first
      ctx.drawImage(videoRef.current, 0, 0, combinedCanvas.width, combinedCanvas.height);
      // Draw the AR overlay on top
      ctx.drawImage(canvasRef.current, 0, 0, combinedCanvas.width, combinedCanvas.height);
      
      // Get the composite image as data URL
      const dataUrl = combinedCanvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(dataUrl);
    }
  };

  const downloadImage = () => {
    if (!capturedImage) return;
    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = `helmy-ar-performance-${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    let detector: poseDetection.PoseDetector;
    let animationFrameId: number;

    const initPoseDetection = async () => {
      try {
        await tf.ready();
        const model = poseDetection.SupportedModels.MoveNet;
        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        };
        detector = await poseDetection.createDetector(model, detectorConfig);

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: { ideal: 'user' } },
            });
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play().catch(e => console.error("Play error:", e));
              setIsReady(true);
              detectPose();
            }
          } catch (err: any) {
            console.error("Error accessing webcam:", err);
            setErrorMsg("تعذر الوصول للكاميرا. يرجى التأكد من إعطاء الصلاحيات، أو أنك تستخدم HTTPS / Localhost. التفاصيل: " + (err.message || ""));
          }
        } else {
          setErrorMsg("متصفحك لا يدعم الوصول للكاميرا (getUserMedia غير متاح).");
        }
      } catch (err: any) {
        console.error("TF initialization error:", err);
        setErrorMsg("خطأ في تشغيل محرك الذكاء الاصطناعي (TensorFlow). قد لا يدعم جهازك WebGL. التفاصيل: " + (err.message || ""));
      }
    };

    const getAngle = (
      firstPoint: poseDetection.Keypoint,
      midPoint: poseDetection.Keypoint,
      lastPoint: poseDetection.Keypoint
    ) => {
      if (!firstPoint || !midPoint || !lastPoint) return 0.0;
      if (firstPoint.score && firstPoint.score < 0.3) return 0.0;
      if (midPoint.score && midPoint.score < 0.3) return 0.0;
      if (lastPoint.score && lastPoint.score < 0.3) return 0.0;

      const angle =
        (Math.atan2(lastPoint.y - midPoint.y, lastPoint.x - midPoint.x) -
          Math.atan2(firstPoint.y - midPoint.y, firstPoint.x - midPoint.x)) *
        (180 / Math.PI);

      let finalAngle = Math.abs(angle);
      if (finalAngle > 180) {
        finalAngle = 360.0 - finalAngle;
      }
      return finalAngle;
    };

    const detectPose = async () => {
      if (!videoRef.current || !detector || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (video.readyState === 4) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const poses = await detector.estimatePoses(video);

        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          if (poses.length > 0) {
            const pose = poses[0];
            const keypoints = pose.keypoints;

            // Draw keypoints
            keypoints.forEach((keypoint) => {
              if (keypoint.score && keypoint.score > 0.3) {
                ctx.beginPath();
                ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = '#a855f7'; // purple-500
                ctx.fill();
              }
            });

            // Calculate back angle (Left Shoulder, Left Hip, Left Knee)
            const leftShoulder = keypoints.find((k) => k.name === 'left_shoulder');
            const leftHip = keypoints.find((k) => k.name === 'left_hip');
            const leftKnee = keypoints.find((k) => k.name === 'left_knee');

            if (leftShoulder && leftHip && leftKnee) {
              const angle = getAngle(leftShoulder, leftHip, leftKnee);
              if (angle > 0) {
                setBackAngle(Math.round(angle));
                // إصدار تنبيه إذا كان الظهر مقوساً بشكل خطير!
                if (angle < 120.0) {
                  setWarning(true);
                } else {
                  setWarning(false);
                }

                // Draw lines connecting the points
                if (leftShoulder.score! > 0.3 && leftHip.score! > 0.3 && leftKnee.score! > 0.3) {
                  ctx.beginPath();
                  ctx.moveTo(leftShoulder.x, leftShoulder.y);
                  ctx.lineTo(leftHip.x, leftHip.y);
                  ctx.lineTo(leftKnee.x, leftKnee.y);
                  ctx.strokeStyle = angle < 120.0 ? '#ef4444' : '#22c55e'; // red or green
                  ctx.lineWidth = 4;
                  ctx.stroke();
                }
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(detectPose);
    };

    initPoseDetection();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (detector) detector.dispose();
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={className || "relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 aspect-video"}>
      {!isReady && !errorMsg && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 z-10 bg-zinc-950">
          <Camera className="w-12 h-12 mb-4 animate-pulse text-purple-500" />
          <p>جاري تشغيل الكاميرا وتحميل نموذج الذكاء الاصطناعي...</p>
        </div>
      )}

      {errorMsg && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-zinc-950 p-6 text-center">
          <AlertTriangle className="w-16 h-16 mb-4 text-red-500" />
          <h3 className="text-xl font-bold text-white mb-2">عذراً، حدث خطأ!</h3>
          <p className="text-red-400 text-sm max-w-md">{errorMsg}</p>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover -scale-x-100"
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-10 -scale-x-100"
      />

      {/* UI Overlay */}
      {!hideOverlayUI && (
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-zinc-800">
            <p className="text-sm text-zinc-400">زاوية الجذع</p>
            <p className={`text-2xl font-bold ${warning ? 'text-red-500' : 'text-green-500'}`}>
              {backAngle ? `${backAngle}°` : '--'}
            </p>
          </div>

          {warning && (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 text-red-100 px-4 py-3 rounded-2xl flex items-center gap-3 animate-pulse">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div>
                <p className="font-bold">تحذير: تقوس الظهر!</p>
                <p className="text-sm opacity-80">خطر الانزلاق الغضروفي، حافظ على استقامة ظهرك.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Capture Button */}
      {isReady && !errorMsg && !capturedImage && !hideCapture && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <button 
            onClick={captureImage}
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border-4 border-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl"
            title="التقاط صورة للأداء"
          >
            <div className="w-12 h-12 rounded-full bg-transparent border-2 border-white flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </button>
        </div>
      )}

      {/* Captured Image Preview Modal */}
      {capturedImage && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6">
          <div className="relative w-full max-w-lg bg-zinc-900 rounded-3xl border border-zinc-700 overflow-hidden shadow-2xl">
            <img src={capturedImage} alt="Captured Performance" className="w-full h-auto" />
            
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setCapturedImage(null)}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 flex justify-between items-center bg-zinc-950">
              <div>
                <h4 className="text-white font-bold text-lg">صورة الأداء الحركي</h4>
                <p className="text-zinc-400 text-sm">تم حفظ إحداثيات وزوايا الجسم بنجاح.</p>
              </div>
              <button 
                onClick={downloadImage}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-bold transition-colors"
              >
                <Download className="w-5 h-5" />
                حفظ الصورة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
