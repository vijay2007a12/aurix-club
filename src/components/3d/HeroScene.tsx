import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { HolographicOrb, NeuralNetwork, AnimatedGridBackground, ParticleCloud } from './Effects';

const Scene: React.FC = () => {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.z = 5;
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d9ff" />
      <pointLight position={[-10, -10, 10]} intensity={1} color="#ff00ff" />
      <pointLight position={[0, 0, 5]} intensity={2} color="#00d9ff" />
      
      {/* Sky and Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* 3D Elements */}
      <HolographicOrb />
      <NeuralNetwork />
      <ParticleCloud count={150} speed={0.8} />
      <AnimatedGridBackground />

      {/* Environment */}
      <fog attach="fog" args={['#000a15', 1, 50]} />
    </>
  );
};

interface HeroSceneProps {
  className?: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          precision: 'highp',
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
