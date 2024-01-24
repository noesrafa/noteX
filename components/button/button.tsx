"use client";

import React, { ButtonHTMLAttributes } from "react";
import Styles from "./button.module.css";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button className={Styles.spacex} {...props}>
      <div className={Styles.spacexHover}></div>
      <span className={Styles.spacexText}>{children}</span>
    </button>
  );
};

export default Button;
