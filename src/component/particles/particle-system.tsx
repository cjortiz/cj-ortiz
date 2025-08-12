import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader, MeshSurfaceSampler } from "three-stdlib"; // GLTFLoader

export const ParticleSystem: React.FC = () => {
  const [particles, setParticles] = useState<THREE.Mesh[]>([]); // Store particles
  const sphereGeometry = new THREE.SphereGeometry(0.01, 8, 8); // Small sphere for particles
  const [model, setModel] = useState<THREE.Group | null>(null); // Store the model

  // Load the GLTF model and sample points for particles
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/src/assets/laptop.glb", (gltf) => {
      const loadedModel = gltf.scene;
      loadedModel.scale.set(0.8, 0.8, 0.8);
      loadedModel.position.set(0, -0.7, -1);

      // Store the model in state (but do not render it)
      setModel(loadedModel);

      // Generate particles based on the model's geometry
      createParticles(loadedModel);
    });
  }, []);

  const createParticles = (model: THREE.Group) => {
    const newParticles: THREE.Mesh[] = [];
    const numParticles = 200;

    // Traverse through model to find meshes
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Create a surface sampler for the mesh's geometry
        const sampler = new MeshSurfaceSampler(child).build();

        for (let i = 0; i < numParticles; i++) {
          const sample = new THREE.Vector3();
          sampler.sample(sample); // Sample a point on the mesh surface

          const particle = new THREE.Mesh(
            sphereGeometry,
            new THREE.MeshStandardMaterial({
              color: new THREE.Color(
                Math.random(),
                Math.random(),
                Math.random()
              ), // Random color
              emissive: new THREE.Color(
                Math.random(),
                Math.random(),
                Math.random()
              ), // Emissive color
              roughness: 0.5,
              metalness: 0.5,
            })
          );

          // Convert from local space to world space
          particle.position.copy(sample);
          particle.position.copy(child.localToWorld(particle.position));

          console.log(particle);
          newParticles.push(particle); // Add particle to the array
        }
      }
    });

    // Set the generated particles into state
    setParticles(newParticles);
  };

  return (
    <>
      {/* Only render the particles (without rendering the model itself) */}
      {particles.map((particle, index) => {
        const material = particle.material as THREE.MeshStandardMaterial;
        material.color.setHSL((Math.sin(index * 0.1) + 1) / 2, 1, 0.5); // Pulsating color effect

        return (
          <mesh key={index} position={particle.position} material={material}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshStandardMaterial
              color={material.color}
              emissive={material.emissive}
            />
          </mesh>
        );
      })}
    </>
  );
};
