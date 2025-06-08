// https://ui.aceternity.com/components/github-globe
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { WorldProps } from "@/types/components";

import ThreeGlobe from "three-globe";

extend({ ThreeGlobe: ThreeGlobe });

export function Globe() {
  const { gl, size } = useThree();
  const globeRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!gl || !size.width || !size.height) return;
    
    const ring = new THREE.RingGeometry(1, 1.1, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });

    const mesh = new THREE.Mesh(ring, material);
    const currentGlobe = globeRef.current;
    if (currentGlobe) {
      currentGlobe.add(mesh);
    }

    return () => {
      if (currentGlobe) {
        currentGlobe.remove(mesh);
      }
    };
  }, [gl, size.width, size.height]);

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial color="#1a1a1a" />
    </mesh>
  );
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    if (typeof window !== "undefined") {
      gl.setPixelRatio(window.devicePixelRatio);
      gl.setSize(size.width, size.height);
      gl.setClearColor(0xffaaff, 0);
    }
  }, [gl, size.width, size.height]);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 400, 2000);

  return (
    <Canvas scene={scene} camera={new THREE.PerspectiveCamera(50, 1.2, 180, 1800)}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new THREE.Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new THREE.Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new THREE.Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={300}
        maxDistance={300}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
