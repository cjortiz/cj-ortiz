import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./modals.css"; // We'll create this file

export const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_lbp3a54",
        "template_60kdamu",
        form.current,
        "gVucQ7J2VN3o3_kOf"
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          e.target.reset();
        },
        () => {
          setStatus("❌ Failed to send. Please try again.");
        }
      );
  };

  return (
    <div className="contact-form-container">
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="title" placeholder="Subject" required />
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};
