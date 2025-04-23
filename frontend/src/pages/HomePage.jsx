import React from "react";
import { Link } from "react-router-dom";
import libreria from "../assets/img/fondo1.png";
import lectores from "../assets/img/lectora.png";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <img src={libreria} alt="Libreria" className="background-image" />

      <div className="foreground-container">
        <div className="content-wrapper">
          <div className="image-container">
            <img src={lectores} alt="Lectores" className="foreground-image" />
            <h1>Designed by DIEGUS15</h1>
          </div>

          <div className="navigation-buttons">
            <Link to="/login" className="nav-button login-btn">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="nav-button register-btn">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
