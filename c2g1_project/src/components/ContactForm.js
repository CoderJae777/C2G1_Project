import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useScroll } from "framer-motion";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [company_name, setCompanyName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //EmailJS service ID, template ID, and Public Key
    const serviceId = "service_dvdgd1k";
    const templateId = "template_quyan3n";
    const publicKey = "wFwJ1xYLVkfwNbAUj";

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "DellAcademy",
      message: message,
      phone: phone,
      company_name: company_name,
    };

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
        alert(
          "Your Message Has Been Sent! An Admin will contact you within 3 working days"
        );
        setName("");
        setEmail("");
        setMessage("");
        setPhone("");
        setCompanyName("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="contact_form">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form_control"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form_control"
      />
      <input
        type="phone"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="form_control"
      />
      <input
        type="company_name"
        placeholder="Your Company"
        value={company_name}
        onChange={(e) => setCompanyName(e.target.value)}
        className="form_control"
      />
      <textarea
        cols="30"
        rows="10"
        value={message}
        placeholder="Your Message"
        onChange={(e) => setMessage(e.target.value)}
        className="form_control"
      ></textarea>
      <div>
        <motion.button
          type="submit"
          className="sendemailbutton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Send!
        </motion.button>
      </div>
    </form>
  );
};

export default ContactForm;
