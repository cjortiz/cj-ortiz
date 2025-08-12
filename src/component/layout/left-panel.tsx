import { useEffect, useState } from "react";
import "./lay-out.css";
import { CommonCardLayout } from "./layout-card";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { GiBalloons } from "react-icons/gi";

interface BasicInfoInterface {
  img: React.ReactNode;
  title: string;
  details: string;
}

const infoArr: BasicInfoInterface[] = [
  {
    img: <FiMail size={20} color="#ffbe26" />,
    title: "Email",
    details: "celmarortiz24@gmail.com",
  },
  {
    img: <FiPhone size={20} color="#ffbe26" />,
    title: "Mobile No.",
    details: "+639762912232",
  },
  {
    img: <GiBalloons size={20} color="#ffbe26" />,
    title: "Birthdate",
    details: "May 28,1998",
  },
  {
    img: <FiMapPin size={20} color="#ffbe26" />,
    title: "Address",
    details: "Poblacion, Dauis, Bohol",
  },
];

export const LeftPanel = () => {
  const roles = ["Developer", "Engineer"];
  const [text, setText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => {
    const currentRole = roles[index];
    const typingSpeed = isDeleting ? 100 : 200;

    const typeEffect = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentRole.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % roles.length); // Switch role
      }
    }, typingSpeed);

    return () => clearTimeout(typeEffect);
  }, [text, isDeleting, index]);

  const leftPanelFooter = <div></div>;

  return (
    <CommonCardLayout isLeft={true} footer={leftPanelFooter}>
      {/* Name details */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "40%",
          gap: 10,
          alignItems: "center",
        }}
      >
        {/* Image container */}
        <div className="image-container">
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "60px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* <img
              style={{
                width: "100%",
                height: "100%",
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6vKo8J_pF6ZztLYwFiwCywhiVWUXqc5jSPQ&s"
            /> */}
          </div>
        </div>
        {/* Name container */}
        <h1
          style={{
            fontSize: 18,
            color: "#969494",
            background:
              "linear-gradient(to right, #CCC7BF ,rgb(156, 164, 168))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Celmar John S. Ortiz
        </h1>
        {/* Job title */}
        <h3
          style={{
            fontSize: 13,
            color: "#969494",
            background:
              "linear-gradient(to right, #CCC7BF ,rgb(156, 164, 168))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Software <span>{text}</span>
          <span className="cursor">|</span>
        </h3>
      </div>
      <div
        style={{
          marginLeft: "6%",
          width: "90%",
          height: 5,
          boxShadow: `
      0px 10px 15px rgba(199, 195, 195, 0.81), /* Subtle main shadow */
      0px 4px 6px rgba(199, 195, 195, 0.81)  /* Soft secondary shadow */`,
        }}
      />
      {/* Basic contact info */}
      <div
        style={{
          width: "100%",
          marginTop: 30,
          display: "flex",
          flexDirection: "column",
          gap: 15,
          alignItems: "center",
        }}
      >
        {infoArr.map((info: BasicInfoInterface, idx: number) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              // background: "rgba(255, 190, 38, 0.08)",
              borderRadius: 12,
              padding: "10px 15px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              transition: "0.2s",
            }}
          >
            <div style={{ marginRight: 12 }}>{info.img}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: ".7rem", color: "#ffff" }}>
                {info.title}
              </div>
              <div
                style={{
                  fontSize: ".85rem",
                  fontWeight: 500,
                }}
              >
                {info.details}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CommonCardLayout>
  );
};
