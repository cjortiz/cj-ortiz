import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import EarthTexture from "../../assets/earth_texture.jpg"; // Make sure this path is correct

interface EarthComponentProps {
  setPercent: (data: number) => void;
  setAssetLoaded: (data: boolean) => void;
  assetLoaded: boolean;
}

export const EarthComponent = (props: EarthComponentProps) => {
  const { setPercent, setAssetLoaded, assetLoaded } = props;
  const mountRef = useRef<HTMLDivElement | null>(null);
  const moonRef = useRef<THREE.Mesh | null>(null); // Reference to the moon mesh

  useEffect(() => {
    if (!mountRef.current) return;

    // Create a scene
    const scene = new THREE.Scene();
    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Load the Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(EarthTexture);

    // Create a sphere geometry for Earth
    const geometry = new THREE.SphereGeometry(1, 60, 60);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: earthTexture,
    });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-100, 10, 50);
    scene.add(light);

    // Set the camera position
    camera.position.z = 5;

    // Animation logic for spinning
    let angle = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Update the rotation angle
      angle += 0.01;

      // Spin the Earth
      earth.rotation.y = angle;

      // Render the scene
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onResize, false);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
      ref={mountRef}
    />
  );
};
