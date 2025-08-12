import { notification } from "antd";
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { LeftPanel, MainLayout, RightPanel } from "./component";

function App() {
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
    <MainLayout>
      <LeftPanel />
      <RightPanel />
    </MainLayout>
  );
}

export default App;
