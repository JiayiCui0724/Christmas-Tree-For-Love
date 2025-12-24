
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { TreeState } from './types';
import { COLORS } from './constants';
import TreeExperience from './components/TreeExperience';
import PostEffects from './components/PostEffects';

const App: React.FC = () => {
  const [state, setState] = useState<TreeState>(TreeState.FORMED);

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      {/* 3D Canvas */}
      <Canvas shadows gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <PerspectiveCamera makeDefault position={[0, 5, 20]} fov={45} />
        <OrbitControls 
          enablePan={false} 
          minDistance={10} 
          maxDistance={40} 
          autoRotate={state === TreeState.FORMED}
          autoRotateSpeed={0.5}
        />
        
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 20, 50]} />
        
        <ambientLight intensity={0.4} /> {/* Increased ambient */}
        <spotLight position={[10, 20, 10]} angle={0.2} penumbra={1} intensity={3} color={COLORS.BRIGHT_GOLD} castShadow />
        <pointLight position={[0, -5, 5]} intensity={2} color={COLORS.VIBRANT_GREEN} /> {/* Under-glow for foliage */}
        <pointLight position={[-10, 10, -10]} intensity={1.5} color={COLORS.EMERALD} />

        <Suspense fallback={null}>
          <TreeExperience state={state} />
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        <PostEffects />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between p-8 md:p-12">
        <header className="flex flex-col gap-2">
            <h1 className="luxury-font text-4xl md:text-7xl text-amber-500 uppercase tracking-tighter leading-none drop-shadow-2xl">
              LOVE YOU
            </h1>
            <p className="text-amber-200/60 font-light tracking-[0.2em] uppercase text-xs md:text-sm">
              MERRY CHRISTMAS
            </p>
        </header>

        <footer className="flex flex-col items-center gap-6 pointer-events-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-4" />
            <button 
              onClick={() => setState(state === TreeState.CHAOS ? TreeState.FORMED : TreeState.CHAOS)}
              className="px-12 py-4 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold uppercase tracking-widest transition-all duration-500 border border-amber-400/50 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95"
            >
              {state === TreeState.CHAOS ? "Form the Tree" : "Unleash Chaos"}
            </button>
            <p className="text-amber-500/50 text-[10px] uppercase mt-4">Handcrafted for Ultimate Prosperity</p>
          </div>
        </footer>

        {/* Decorative Borders */}
        <div className="absolute inset-4 border border-amber-500/20 pointer-events-none" />
        <div className="absolute inset-6 border-[0.5px] border-amber-500/10 pointer-events-none" />
      </div>
    </div>
  );
};

export default App;
