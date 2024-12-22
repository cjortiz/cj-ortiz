import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

interface ParticleBackgroundProps {
  onParticlesLoaded: () => void;
}

const ParticleBackground = (props: ParticleBackgroundProps) => {
  const { onParticlesLoaded } = props;
  const particlesInit = useCallback(async (engine) => {
    console.log("Ss");
    await loadFull(engine); // Load full tsparticles engine

    // Custom shape registration
    engine.addShape("customStar", {
      draw: (context, particle, radius) => {
        context.beginPath();
        const spikes = 5;
        const outerRadius = radius;
        const innerRadius = radius / 2;
        let rotation = (Math.PI / 2) * 3;
        let x = particle.position.x;
        let y = particle.position.y;
        let step = Math.PI / spikes;

        context.moveTo(x, y - outerRadius);

        for (let i = 0; i < spikes; i++) {
          x = particle.position.x + Math.cos(rotation) * outerRadius;
          y = particle.position.y + Math.sin(rotation) * outerRadius;
          context.lineTo(x, y);
          rotation += step;

          x = particle.position.x + Math.cos(rotation) * innerRadius;
          y = particle.position.y + Math.sin(rotation) * innerRadius;
          context.lineTo(x, y);
          rotation += step;
        }

        context.lineTo(particle.position.x, particle.position.y - outerRadius);
        context.closePath();
        context.fill();
      },
    });
    onParticlesLoaded();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -2,
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#000000", // Black background
            },
          },
          particles: {
            number: {
              value: 1000, // Number of particles
              density: {
                enable: true,
                area: 800,
              },
            },
            // shape: {
            //   type: "image", // Use an image as the particle shape
            //   image: {
            //     src: "/path/to/your/texture.png", // Path to the texture image
            //     width: 50, // Width of the particle (in pixels)
            //     height: 50, // Height of the particle (in pixels)
            //   },
            // },
            shape: {
              type: ["circle", "customStar"], // Include multiple shapes
            },
            color: {
              value: "#ffffff", // Starting color for particles (red)
              animation: {
                enable: true, // Enable color animation
                speed: 10, // Speed of color change
                sync: false, // Particles animate independently
              },
            },
            move: {
              enable: true,
              speed: 0.05,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
            },
            size: {
              value: 0.5, // Base size of particles
              random: { enable: true, minimumValue: 1 }, // Randomize size
              animation: {
                enable: true, // Enable size animation
                speed: 5, // Animation speed
                minimumValue: 0.5, // Minimum size during animation
                sync: false, // Each particle animates independently
              },
            },
          },

          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
