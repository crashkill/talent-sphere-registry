
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particles = React.useMemo(() => {
    const temp = new Float32Array(1500 * 3); // Reduced particle count
    for (let i = 0; i < 1500; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 15;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 15;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.2;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4338ca"
        size={0.008}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

const FloatingOrb = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.5;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[1]) * 0.3;
      ref.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.4 + position[2]) * 0.2;
      
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshPhongMaterial 
        color="#8b5cf6" 
        transparent 
        opacity={0.15}
        emissive="#4c1d95"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const WebGLBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        <ParticleField />
        
        <FloatingOrb position={[-4, 3, -3]} />
        <FloatingOrb position={[4, -2, -4]} />
        <FloatingOrb position={[0, 4, -5]} />
        <FloatingOrb position={[-3, -3, -2]} />
        <FloatingOrb position={[5, 1, -3]} />
      </Canvas>
    </div>
  );
};

export default WebGLBackground;
