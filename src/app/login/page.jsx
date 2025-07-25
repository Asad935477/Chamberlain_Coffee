"use client";
import { useRef, useEffect } from "react";
import "./login.css";
import { useLenis } from "lenis/react";
import DisplacementPlane from "@/components/Texture/shader";
import LoginForm from "@/components/LoginForm/LoginForm";
import InteractiveGradient from "@/components/InteractiveGradient/InteractiveGradient";
const LoginPage = () => {
  const containerRef = useRef(null);

  useLenis(({ scroll }) => {});

  return (
    <>
      <div className="login-page">
        <div className="shader-container">
          <InteractiveGradient
            brushSize={25.0}
            brushStrength={0.5}
            distortionAmount={2.5}
            fluidDecay={0.98}
            trailLength={0.8}
            stopDecay={0.85}
            // color1="#662916" /* Mocha Brown */
            // color2="#8B4529" /* Espresso */
            // color3="#B67E57" /* Cinnamon Cocoa */
            // color4="#C5997E" /* Latte Cream */
            color1="#3B1F1B" /* Dark Cocoa */
            color2="#553024" /* Bitter Mocha */
            color3="#7B4A3A" /* Roasted Chestnut */
            color4="#A6785E" /* Burnt Caramel */
            colorIntensity={1.0}
            softness={1.0}
          />
        </div>
        <div className="form">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
