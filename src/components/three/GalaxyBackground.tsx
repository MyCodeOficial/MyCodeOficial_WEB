"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/* ---------------------------------- shaders --------------------------------- */

const galaxyVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;

    // Rotación diferencial: velocidad inversa a la distancia al centro (remolino).
    float distanceToCenter = length(pos.xz);
    float angle = atan(pos.x, pos.z);
    angle += uTime * (1.0 / max(distanceToCenter, 0.22)) * 0.12;
    pos.x = sin(angle) * distanceToCenter;
    pos.z = cos(angle) * distanceToCenter;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * uSize * (1.0 / -mvPosition.z);

    vColor = color;
  }
`;

const galaxyFragmentShader = /* glsl */ `
  varying vec3 vColor;

  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 6.0);
    gl_FragColor = vec4(vColor * strength, strength);
  }
`;

/* ----------------------------------- galaxy ---------------------------------- */

const GALAXY_RADIUS = 4.2;
const BRANCHES = 5;
const SPIN = 1.15;

function buildGalaxy(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  const colorCore = new THREE.Color("#ffffff").lerp(new THREE.Color("#67e8f9"), 0.55);
  const colorMid = new THREE.Color("#3b82f6");
  const colorEdge = new THREE.Color("#7c3aed");
  const tmp = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Radio con concentración al centro.
    const radius = Math.pow(Math.random(), 1.9) * GALAXY_RADIUS;
    // Ángulo del brazo + giro proporcional al radio.
    const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
    const spinAngle = radius * SPIN;

    // Dispersión pseudo-gaussiana creciente con el radio.
    const spread = 0.18 + (radius / GALAXY_RADIUS) * 0.45;
    const randomX =
      Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * radius;
    const randomY =
      Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * radius * 0.45;
    const randomZ =
      Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * radius;

    positions[i3] = Math.sin(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.cos(branchAngle + spinAngle) * radius + randomZ;

    // Color por vértice: núcleo blanco-cian → azul → bordes violeta.
    const t = radius / GALAXY_RADIUS;
    if (t < 0.45) {
      tmp.copy(colorCore).lerp(colorMid, t / 0.45);
    } else {
      tmp.copy(colorMid).lerp(colorEdge, (t - 0.45) / 0.55);
    }
    colors[i3] = tmp.r;
    colors[i3 + 1] = tmp.g;
    colors[i3 + 2] = tmp.b;

    scales[i] = 0.4 + Math.random() * 1.3;
  }

  return { positions, colors, scales };
}

function Galaxy({ count }: { count: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const gl = useThree((state) => state.gl);

  const geometry = useMemo(() => {
    const { positions, colors, scales } = buildGalaxy(count);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: galaxyVertexShader,
        fragmentShader: galaxyFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 32 * gl.getPixelRatio() },
        },
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        transparent: true,
      }),
    [gl]
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <points ref={materialRef as never} geometry={geometry} material={material} />;
}

/* --------------------------- estrellas lejanas fijas -------------------------- */

function DistantStars({ count = 2500 }: { count?: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribución esférica lejana.
      const r = 22 + Math.random() * 38;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.05,
        sizeAttenuation: true,
        color: new THREE.Color("#cdd6f4"),
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return <points geometry={geometry} material={material} />;
}

/* ------------------------------- parallax cámara ------------------------------ */

function CameraRig({ parallax }: { parallax: boolean }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!parallax) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [parallax]);

  useFrame((state) => {
    const targetX = parallax ? mouse.current.x * 0.4 : 0;
    const targetY = 1.8 + (parallax ? -mouse.current.y * 0.25 : 0);
    state.camera.position.x += (targetX - state.camera.position.x) * 0.03;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

/* -------------------------------- fallback CSS -------------------------------- */

function CssFallback() {
  const stars = useMemo(() => {
    let shadows = "";
    for (let i = 0; i < 140; i++) {
      const x = (Math.random() * 100).toFixed(2);
      const y = (Math.random() * 100).toFixed(2);
      const o = (0.2 + Math.random() * 0.6).toFixed(2);
      shadows += `${shadows ? ", " : ""}${x}vw ${y}vh 0 ${Math.random() > 0.85 ? "1px" : "0"} rgba(255,255,255,${o})`;
    }
    return shadows;
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(59,130,246,0.16), transparent 65%), radial-gradient(ellipse 45% 35% at 50% 42%, rgba(103,232,249,0.12), transparent 60%), radial-gradient(ellipse 90% 70% at 50% 45%, rgba(124,58,237,0.10), transparent 70%)",
        }}
      />
      <div className="absolute h-px w-px rounded-full" style={{ boxShadow: stars }} />
    </div>
  );
}

/* ---------------------------------- wrapper ---------------------------------- */

export default function GalaxyBackground() {
  const [mode, setMode] = useState<"loading" | "webgl" | "fallback">("loading");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const canvas = document.createElement("canvas");
      webgl = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      webgl = false;
    }

    const mobile =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(mobile);
    setMode(reduced || !webgl ? "fallback" : "webgl");
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {mode === "webgl" && (
        <Canvas
          dpr={[1, 1.75]}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            alpha: true,
          }}
          camera={{ position: [0, 1.8, 4.5], fov: 55 }}
        >
          <Galaxy count={isMobile ? 7000 : 20000} />
          <DistantStars count={isMobile ? 1200 : 2500} />
          <CameraRig parallax={!isMobile} />
        </Canvas>
      )}
      {mode === "fallback" && <CssFallback />}

      {/* Fade-out inferior hacia el fondo del sitio */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-space" />
    </div>
  );
}
