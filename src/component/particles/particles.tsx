import { useEffect, useState, useRef } from "react";
import { Particles } from "react-tsparticles";
import * as THREE from "three";
import html2canvas from "html2canvas";

const ParticleBackground = () => {
  const [particleImage, setParticleImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const threeContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !threeContainerRef.current) return;

    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    // Create a cube to be used as the custom particle
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set the camera position and the renderer size
    camera.position.z = 3; // Make sure the cube is within the camera's view
    renderer.setSize(100, 100); // Set canvas size for particle image

    // Append renderer's DOM element to the container
    threeContainerRef.current.appendChild(renderer.domElement);

    // Render the scene and convert to an image after it has been drawn
    const convertToImage = async () => {
      // Use html2canvas to capture the scene rendered by Three.js
      const canvas = await html2canvas(threeContainerRef.current!);
      const imageData = canvas.toDataURL("image/png");
      setParticleImage(imageData); // Set the image data as the particle texture
    };

    // Wait for the first render to happen before capturing the image
    setTimeout(() => {
      convertToImage();
    }, 1000); // Wait a little bit for the first render

    // Animation loop to update the scene
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01; // Rotate the cube
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      threeContainerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Show loading state if the particle image isn't ready yet
  if (!particleImage) {
    return <div>Loading particles...</div>;
  }

  return (
    <div>
      {/* This is the container for the Three.js canvas */}
      <div ref={threeContainerRef} style={{ display: "none" }}></div>

      {/* This is where react-tsparticles is used to display the particle background */}
      <Particles
        id="tsparticles"
        options={{
          particles: {
            shape: {
              type: "image",
              image: {
                src: particleImage, // Use the generated 3D texture as particle image
                width: 20,
                height: 20,
              },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
            },
            size: {
              value: 10, // Adjust the size of the particles
            },
          },
          background: {
            color: {
              value: "#000000",
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
