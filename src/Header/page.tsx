import React from "react";
import "./Header.scss";
import { Icon } from "@iconify/react";

export default function Header() {
  return (
    <header>
      <a href="/" className="header">
        <picture>
          <img src="/img/logo-cubos.svg" alt="logo" width="247" height="36" />
        </picture>
        <div className="icon">
          <span className="icon-container-small">
            <Icon
              icon="lets-icons:sun-duotone"
              className="icon"
              width="24"
              height="24"
            />
          </span>
        </div>
      </a>
    </header>
  );
}
