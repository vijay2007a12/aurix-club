import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';

export const HolographicOrb: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }

    if (sphereRef.current) {
      // Create pulsing effect
      const time = Date.now() * 0.001;
      const scale = 1 + Math.sin(time) * 0.1;
      sphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <Trail
        width={10}
        length={20}
        decay={0.8}
        attenuation={(width) => (width *= Math.random())}
      >
        <Sphere ref={sphereRef} args={[1, 64, 64]}>
          <meshPhongMaterial
            emissive="#00d9ff"
            emissiveIntensity={0.5}
            color="#00d9ff"
            wireframe={false}
          />
        </Sphere>
      </Trail>

      {/* Outer rings */}
      <mesh>
        <torusGeometry args={[1.3, 0.05, 16, 100]} />
        <meshPhongMaterial
          emissive="#00d9ff"
          emissiveIntensity={0.8}
          color="#00d9ff"
          wireframe={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.04, 16, 100]} />
        <meshPhongMaterial
          emissive="#0066ff"
          emissiveIntensity={0.6}
          color="#0066ff"
          wireframe={false}
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, Math.PI / 3]}>
        <torusGeometry args={[1.2, 0.035, 16, 100]} />
        <meshPhongMaterial
          emissive="#ff00ff"
          emissiveIntensity={0.4}
          color="#ff00ff"
          wireframe={false}
        />
      </mesh>
    </group>
  );
};

export const NeuralNetwork: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0005;
    }
  });

  // Generate random neural network nodes
  const nodeCount = 50;
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 8,
    z: (Math.random() - 0.5) * 8,
  }));

  return (
    <group ref={groupRef}>
      {/* Draw connections */}
      {nodes.map((node, i) => {
        const connections = nodes
          .slice(i + 1, i + 4)
          .filter(() => Math.random() > 0.6);

        return connections.map((target) => (
          <line key={`${i}-${target.id}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([node.x, node.y, node.z, target.x, target.y, target.z]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00d9ff" transparent opacity={0.3} />
          </line>
        ));
      })}

      {/* Draw nodes */}
      {nodes.map((node) => (
        <mesh key={node.id} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshPhongMaterial emissive="#00d9ff" emissiveIntensity={0.8} color="#00d9ff" />
        </mesh>
      ))}
    </group>
  );
};

export const AnimatedGridBackground: React.FC = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (gridRef.current) {
      gridRef.current.position.z = camera.position.z * 0.01;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[50, 50, 0x00d9ff, 0x003366]} />
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#000a15" wireframe={true} />
      </mesh>
    </group>
  );
};

export const ParticleCloud: React.FC<{ count?: number; speed?: number }> = ({
  count = 100,
  speed = 0.5,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesRef.current = positions;
  }, [count]);

  useFrame(() => {
    if (groupRef.current && groupRef.current.children[0]) {
      const positions = (groupRef.current.children[0] as THREE.Points).geometry.attributes
        .position.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += speed * 0.001;

        if (positions[i + 1] > 10) {
          positions[i + 1] = -10;
        }
      }

      (groupRef.current.children[0] as THREE.Points).geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesRef.current || new Float32Array(count * 3), 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#00d9ff" sizeAttenuation={true} />
      </points>
    </group>
  );
};
