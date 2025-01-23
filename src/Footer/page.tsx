import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        {new Date().getFullYear()} © - Todos os direitos reservados a Cubos
        Movies
      </p>
    </footer>
  );
}
