import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="contactform">
      <div className="form_group">
        <label className="label" htmlFor="name">
          Name *
        </label>
        <input
          className="form_control username"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form_group">
        <label className="label" htmlFor="email">
          Email *
        </label>
        <input
          className="form_control username"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form_group">
        <label className="label" htmlFor="phone">
          Phone
        </label>
        <input
          className="form_control username"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form_group">
        <label className="label" htmlFor="company">
          Company
        </label>
        <input
          className="form_control username"
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div className="form_group">
        <label className="label" htmlFor="message">
          Message *
        </label>
        <textarea
          className="form_control"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form_group">
        <button type="submit" className="signin_button">
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
