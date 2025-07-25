"use client";
import "./Footer.css";
import { useState, useEffect } from "react";
import Link from "next/link";

const Footer = () => {
  const [delhiTime, setDelhiTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: "Asia/Kolkata",
      };

      const formatter = new Intl.DateTimeFormat("en-US", options);
      const timeString = formatter.format(new Date());
      setDelhiTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="footer">
      <div className="footer-col">
        <p>&copy;2025 All right reserved</p>
      </div>
      <div className="footer-col">
        <div className="footer-clock">
          <p>New Delhi , ON {delhiTime}</p>
        </div>
        <div className="footer-author">
          <p>
            For Hackathon at &nbsp;
            <Link href="https://www.youtube.com/@sheryians"> Sheryians</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
