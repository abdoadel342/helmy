import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { AlertTriangle, Camera } from 'lucide-react';

export default function LivePoseDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [warning, setWarning] = useState(false);
  const [backAngle, setBackAngle] = useState<number | null>(null);

  useEffect(() => {
    let detector: poseDetection.PoseDetector;
    let animationFrameId: number;

    const initPoseDetection = async () => {
      await tf.ready();
      const model = poseDetection.SupportedModels.MoveNet;
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };
      detector = await poseDetection.createDetector(model, detectorConfig);

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
              setIsReady(true);
              detectPose();
            };
          }
        } catch (err) {
          console.error("Error accessing webcam:", err);
        }
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
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 aspect-video">
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 z-10 bg-zinc-950">
          <Camera className="w-12 h-12 mb-4 animate-pulse text-purple-500" />
          <p>جاري تشغيل الكاميرا وتحميل نموذج الذكاء الاصطناعي...</p>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* UI Overlay */}
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
    </div>
  );
}
