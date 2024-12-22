import { useState, useEffect, Suspense } from "react";
import "./App.css";
import { EarthComponent } from "./component/earth/earth";
import ParticleBackground from "./component/particles/particles";

function App() {
  const [particlesLoaded, setParticlesLoaded] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(0);
  const [assetLoaded, setAssetLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (percent === 100) {
      const delay = setTimeout(() => {
        setAssetLoaded(true);
      }, 1000); // 1-second delay (1000 milliseconds)

      return () => clearTimeout(delay);
    }
  }, [percent]);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <ParticleBackground onParticlesLoaded={() => setParticlesLoaded(true)} />
      <EarthComponent
        setPercent={setPercent}
        setAssetLoaded={setAssetLoaded}
        assetLoaded={assetLoaded}
      />
      {/* Show loading screen until particlesLoaded is true */}
      {!particlesLoaded ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#000",
            color: "#fff",
          }}
        >
          <h2>Loading particles...</h2>
        </div>
      ) : (
        <>
          <div
            style={{
              position: "relative",
              zIndex: 1,
              color: "white",
              padding: "20px",
            }}
          >
            <h1>Welcome to My Website</h1>
            <p>Cj portfolio</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
