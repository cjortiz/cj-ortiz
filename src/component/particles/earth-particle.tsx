import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client"; // Updated for React 18+
import html2canvas from "html2canvas";

const useParticleImage = (earth: React.ReactElement) => {
  const [particleImage, setParticleImage] = useState<string | null>(null);

  useEffect(() => {
    const createImage = async () => {
      // Create a temporary container
      const container = document.createElement("div");
      document.body.appendChild(container);

      // Create the root container for React 18+ and render the Earth component
      const root = ReactDOM.createRoot(container); // Create root with React 18
      root.render(earth); // Render the earth component

      // Wait for the component to render, then capture it
      const canvas = await html2canvas(container);
      const imgData = canvas.toDataURL("image/png");

      // Set the image as the particle source
      setParticleImage(imgData);

      // Clean up the rendered component
      root.unmount(); // Unmount the component using `root.unmount()` in React 18+
      document.body.removeChild(container); // Remove the container
    };

    createImage();
  }, [earth]);

  return particleImage;
};

export default useParticleImage;
