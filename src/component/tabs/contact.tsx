import { DarkGoogleMap } from "../earth/google-maps";
import ContactMe from "../../assets/contact-me.png";
import "./tabs.css";
import { useRef, useState } from "react";
import { Tooltip } from "antd";

export const ContactTab = () => {
  const [address, setAddress] = useState("");
  const center = { lat: 9.62525, lng: 123.85797 };
  const mapRef = useRef(null);

  const handleResetCenter = () => {
    if (mapRef.current) {
      mapRef.current.panTo(center);
      mapRef.current.setZoom(15); // Optional: reset zoom level too
    }
  };
  return (
    <div className="contact-tab-container">
      <h2 className="about-title">Contact</h2>

      <div className="map-container">
        <DarkGoogleMap setAddress={setAddress} mapRef={mapRef} />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            fontSize: 20,
          }}
        >
          📍
        </div>
        {address && (
          <Tooltip title="Click to center address">
            <div
              className="address-class"
              style={{
                top: 0,
                marginTop: "10px",
                marginLeft: 20,
                width: " 18%",
                padding: 10,
                fontFamily: "Manrope, sans-serif",
                textAlign: "center",
                position: "absolute",
                background: "#1f1f1f",
                borderRadius: 10,
              }}
              onClick={handleResetCenter}
            >
              📍 {address}
            </div>
          </Tooltip>
        )}
      </div>

      <div className="mascot" onClick={() => {}}>
        <img src={ContactMe} alt="Contact me" />
      </div>
    </div>
  );
};
