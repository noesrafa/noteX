import React, { ButtonHTMLAttributes } from "react";

const themes = [
  {
    color: "#F2FBFD",
    name: "theme1",
  },
  {
    color: "#F3E6CF",
    name: "theme2",
  },
  {
    color: "#182938",
    name: "theme3",
  },
];

const ButtonTheme = () => {
  const changeTheme = (theme: string) => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  };
  
  return (
    <div className="flex flex-wrap gap-2 p-5 ">
      {themes.map((theme) => (
        <button
          onClick={() => changeTheme(theme.name)}
          className={`w-4 h-4 border border-detail`}
          style={{ backgroundColor: theme.color }}
        />
      ))}
    </div>
  );
};

export default ButtonTheme;
