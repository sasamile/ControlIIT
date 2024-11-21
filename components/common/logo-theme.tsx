"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

function LogoTheme() {
  const { theme, systemTheme } = useTheme();

  const getImageSource = () => {
    // Si el tema es system, usamos systemTheme para determinar la imagen
    if (theme === "system") {
      return systemTheme === "dark" ? "/Logo1.png" : "/logo2.png";
    }
    // Si no es system, usamos la lógica original
    return theme === "dark" ? "/Logo1.png" : "/logo2.png";
  };

  return (
    <div>
      <Image src={getImageSource()} width={100} height={50} alt="logo" />
    </div>
  );
}

export default LogoTheme;
