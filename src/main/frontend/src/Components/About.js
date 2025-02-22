import React from 'react';
import './About.css';

function About() {
  return (
    <div className="container">
      <h1>About INVIA</h1>
      <p>
        INVIA is a streamlined solution designed to simplify your logistics and inventory management. Our platform
        provides real-time shipment tracking alongside intuitive tools to manage your inventory efficiently. Whether
        you’re overseeing deliveries or monitoring stock levels, INVIA offers a user-friendly interface that keeps you
        informed and in control.
      </p>
      <img src="/Images/truck.webp" alt="Truck" className="about-image"/>
      <p>
        Built with modern web technologies, INVIA is committed to delivering a secure, reliable, and responsive
        experience. Our goal is to help you focus on growing your business while we take care of the essential details.
      </p>
    </div>
  );
}

export default About;
