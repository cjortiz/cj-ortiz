import { useEffect, useState } from "react";
import "./lay-out.css";
import { MobileContent } from "../mobile-content";
export const CommonCardLayout = ({ children, isLeft, footer }) => {
  return (
    <div
      className={`parent-card ${
        isLeft ? `left-card-width` : `right-card-width`
      }`}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          borderWidth: 2,
          background:"#1f1f1f",
          position: "relative",
          boxShadow: `
      0px 10px 15px rgba(237, 217, 119, 0.1), /* Subtle main shadow */
      0px 4px 6px rgba(142, 138, 138, 0.98)  /* Soft secondary shadow */`,
        }}
      >
        {children}
        <div style={{ position: "absolute", bottom: "0" }}>{footer}</div>
      </div>
    </div>
  );
};
