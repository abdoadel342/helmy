import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Programs from './pages/Programs';
import Education from './pages/Education';
import Biomechanics from './pages/Biomechanics';
import Anatomy from './pages/Anatomy';
import Physiology from './pages/Physiology';
import Psychology from './pages/Psychology';
import Training from './pages/Training';
import Nutrition from './pages/Nutrition';
import SportsNutrition from './pages/SportsNutrition';
import DietarySystems from './pages/DietarySystems';
import MediterraneanDiet from './pages/MediterraneanDiet';
import DashDiet from './pages/DashDiet';
import SpeedProgram from './pages/SpeedProgram';
import PlantBasedDiet from './pages/PlantBasedDiet';
import ExchangeLists from './pages/ExchangeLists';
import HealthyPlate from './pages/HealthyPlate';
import EnergyCalculator from './pages/EnergyCalculator';
import NutritionPlan from './pages/NutritionPlan';
import FatLossPlan from './pages/FatLossPlan';
import Recipes from './pages/Recipes';
import AI from './pages/AI';
import Telemetry from './pages/Telemetry';
import Team from './pages/Team';
import Login from './pages/Login';
import Settings from './pages/Settings';
import DarkVeil from './components/react-bits/DarkVeil';
import KidsTraining from './pages/KidsTraining';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex flex-col">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-800 rounded-lg animate-pulse"></div>
          <div className="w-24 h-6 bg-zinc-800 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-zinc-800 rounded-full animate-pulse"></div>
          <div className="w-10 h-10 bg-zinc-800 rounded-full animate-pulse"></div>
        </div>
      </header>
      {/* Main Content Skeleton */}
      <div className="flex-1 px-4 py-6">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-zinc-800/50 rounded-2xl animate-pulse"></div>
          <div className="grid grid-cols-3 gap-6 md:gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-zinc-800/50 rounded-xl animate-pulse"></div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-zinc-800/50 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom Nav Skeleton (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-primary/10 px-6 py-2 flex items-center justify-between max-w-md mx-auto">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-12 h-12 bg-zinc-800 rounded-xl animate-pulse"></div>
        ))}
      </nav>
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

import MuscleStrengthBuilder from './pages/MuscleStrengthBuilder';
import MuscleBuilding from './pages/MuscleBuilding';
import FatLossProgram from './pages/FatLossProgram';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#0e0e0e]">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="programs" element={<Programs />} />
            <Route path="programs/muscle-strength" element={<MuscleStrengthBuilder />} />
            <Route path="programs/muscle-building" element={<MuscleBuilding />} />
            <Route path="programs/fat-loss" element={<FatLossProgram />} />
            <Route path="education" element={<Education />} />
            <Route path="education/biomechanics" element={<Biomechanics />} />
            <Route path="education/anatomy" element={<Anatomy />} />
            <Route path="education/physiology" element={<Physiology />} />
            <Route path="education/psychology" element={<Psychology />} />
            <Route path="education/training" element={<Training />} />
            <Route path="education/training/speed" element={<SpeedProgram />} />
            <Route path="nutrition" element={<Nutrition />} />
            <Route path="nutrition/systems" element={<DietarySystems />} />
            <Route path="nutrition/systems/mediterranean" element={<MediterraneanDiet />} />
            <Route path="nutrition/systems/dash" element={<DashDiet />} />
            <Route path="nutrition/systems/plant-based" element={<PlantBasedDiet />} />
            <Route path="nutrition/systems/exchange" element={<ExchangeLists />} />
            <Route path="nutrition/systems/healthy-plate" element={<HealthyPlate />} />
            <Route path="nutrition/calculator" element={<EnergyCalculator />} />
            <Route path="education/sports-nutrition" element={<SportsNutrition />} />
            <Route path="nutrition/plan" element={<NutritionPlan />} />
            <Route path="nutrition/fat-loss" element={<FatLossPlan />} />
            <Route path="nutrition/recipes" element={<Recipes />} />
            <Route path="ai" element={<AI />} />
            <Route path="kids-training" element={<KidsTraining />} />
            <Route path="team" element={<Team />} />
            <Route path="telemetry" element={<Telemetry />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
