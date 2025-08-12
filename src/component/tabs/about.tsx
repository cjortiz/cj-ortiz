import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { notification, Tooltip } from "antd";
import {
  FaBasketballBall,
  FaLaptopCode,
  FaMicrochip,
  FaMobileAlt,
  FaPhone,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImageBoy from "../../assets/boy.png";
import ImageGirl from "../../assets/girl.png";
import { CommonModal } from "../modals";
import "./tabs.css";
import { NotificationType, openModernNotification } from "../notifications";

interface TestimonialsInterface {
  img: string;
  name: string;
  title: string;
  detail: string;
  contact: string;
}

interface ThingsGoodAtInterface {
  img: React.ReactNode;
  title: string;
  content: string;
}

export const AboutTab = () => {
  const [api, contextHolder] = notification.useNotification();

  const [openTestimony, setOpenTestimony] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();

  const thingsGoodAtArr: ThingsGoodAtInterface[] = [
    {
      img: <FaLaptopCode title="Web Development" size={25} />,
      title: "Web Development",
      content: "A sample content for web development.",
    },
    {
      img: <FaMobileAlt title="Mobile Development" size={25} />,
      title: "Mobile Development",
      content: " A sample content for Mobile Development.",
    },
    {
      img: <FaMicrochip title="IoT Device" size={25} />,
      title: "IoT",
      content: "A sample content for Internet of things.",
    },
    {
      img: <FaBasketballBall title="Basketball" size={25} />,
      title: "Sports",
      content: "A sample content for Sports field of interest.",
    },
  ];

  const testimonialsArr: TestimonialsInterface[] = [
    {
      img: ImageBoy,
      name: "Dan Lester Sanz",
      title: "Software Engineer / Developer",
      detail: "He is a good coworker, a good leader",
      contact: "+69674682150",
    },
    {
      img: ImageGirl,
      name: "Hazel Maquinta ",
      title: "Project Manager / Project Leader ",
      detail:
        "He is a good coworker, a good leader.He is a good coworker, a good leader. ",
      contact: "+6392233323345",
    },
    {
      img: ImageBoy,
      name: "Nino Pantaleon ",
      title: "Software Developer",
      detail:
        "He is a good coworker, a good leader.He is a good coworker, a good leader. ",
      contact: "+6392233323345",
    },
    {
      img: ImageGirl,
      name: "Alyssa Joyce Tan ",
      title: "Software Developer ",
      detail:
        "He is a good coworker, a good leader.He is a good coworker, a good leader. ",
      contact: "+6392233323345",
    },
  ];

  const getFirstNameHandler = (name: string) => {
    const splitName = name.split(" ");
    return splitName[0];
  };

  const onClickContactHandler = (e) => {
    try {
      handleCopy(e);
    } catch (err) {
      return openModernNotification(
        api,
        "Action Failed",
        "Copy failed , please try again later",
        NotificationType.error
      );
    }
  };

  const handleCopy = (e) => {
    const textToCopy = e.currentTarget.textContent; // get div text content
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        openModernNotification(
          api,
          "Action Successful",
          "Contact info succesfully copied to clipboard",
          NotificationType.success
        );
      });
    } else {
      // fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const onClickTestimonyHandler = (testimonyDetails: TestimonialsInterface) => {
    const testimonyContent = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            flexBasis: "40%",
            overflow: "hidden",
            borderRadius: "50%",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
            border: "3px solid #ffbe26",
            aspectRatio: "1 / 1",
          }}
        >
          <img
            src={testimonyDetails.img}
            alt={testimonyDetails.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              display: "block",
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontWeight: "700",
              fontSize: "1.25rem",
              color: "#ffbe26",
            }}
          >
            {testimonyDetails.name}
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: "500",
              color: "#bbb",
              fontStyle: "italic",
            }}
          >
            {testimonyDetails.title}
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.4,
              color: "#ddd",
              marginTop: 10,
              fontStyle: "normal",
            }}
          >
            “{testimonyDetails.detail}”
          </div>
        </div>
        <div
          className="contact-class"
          style={{
            position: "absolute",
            bottom: 20,
            right: 30,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
          onClick={onClickContactHandler}
        >
          <FaPhone />
          <Tooltip
            title={`${getFirstNameHandler(
              testimonyDetails.name
            )}'s contact info`}
          >
            {testimonyDetails.contact}
          </Tooltip>
        </div>
      </div>
    );

    setModalContent(testimonyContent);

    setOpenTestimony(true);
  };

  return (
    <div
      style={{
        padding: ".01rem 4%",
      }}
    >
      {contextHolder}
      {/* Title */}
      <h2 className="about-title">About</h2>
      <div style={{ maxHeight: 500, overflow: "auto" }}>
        <p className="about-content">
          A passionate full-stack developer with over 3 years of experience
          building scalable web applications using React, TypeScript, Java /
          Springboot, and Node.js. I focus on writing clean, maintainable code
          and solving real-world problems through efficient architecture and
          thoughtful user experience.
        </p>

        <p className="about-content">
          I’ve contributed to projects across e-commerce, logistics, and
          enterprise software. I enjoy collaborating with teams to turn ideas
          into reality. Outside of work, I love tinkering with embedded systems
          and automation. I'm always open to collaboration—feel free to get in
          touch or explore my projects.
        </p>

        <h3 className="good-title-class">What I'm good at</h3>

        {/* Good at Container */}
        <div className="good-parent-class">
          {thingsGoodAtArr.map((item, key) => {
            return (
              <div
                className="good-class"
                key={key} // Optional: add a key if available
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {item.img}
                  <h3 style={{ color: "#ffff" }}>{item.title}</h3>
                </div>
                <p style={{ fontSize: "1rem", marginTop: -5 }}>
                  {item.content}
                </p>
                {/* Content goes here */}
              </div>
            );
          })}
        </div>

        {/* Testimonials Container */}
        <div className="testimonial-class">
          <h3 className="good-title-class">Testimonials</h3>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }}
            style={{ width: "100%" }} // ✅ Ensure visible
            loop
          >
            {testimonialsArr.map((user: TestimonialsInterface, key) => {
              return (
                <SwiperSlide
                  key={key}
                  onClick={() => onClickTestimonyHandler(user)}
                >
                  <div className="slider-container">
                    <div
                      style={{
                        width: "40%",
                        padding: 10,
                        boxSizing: "border-box",
                        position: "relative",
                        borderRadius: 50,
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 50,
                        }}
                        src={user.img}
                      />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        paddingLeft: 20,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ fontWeight: "bold", color: "#ffffff" }}>
                        {user.name}
                      </div>
                      <span style={{ fontSize: ".8rem" }}>{user.title}</span>
                      <div style={{ fontSize: ".78rem", marginTop: 15 }}>
                        " {user.detail} "
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <CommonModal
        open={openTestimony}
        onClose={() => setOpenTestimony(false)}
        title="Testimony"
        children={modalContent}
      />
    </div>
  );
};
