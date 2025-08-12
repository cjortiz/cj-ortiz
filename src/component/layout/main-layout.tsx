import { useState, useEffect } from "react";
import "./lay-out.css";
import { MobileContent } from "../mobile-content";

export const MainLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${isMobile ? "main-layout-mobile" : "main-layout"}`}>
      {isMobile ? <MobileContent /> : children}
    </div>
  );
};
