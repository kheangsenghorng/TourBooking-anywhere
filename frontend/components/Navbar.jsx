"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogout = () => {
    // Perform logout operations here
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white shadow-md h-[100px]">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-full">
        {/* Logo */}
        <div className="flex items-center h-full">
          <img
            src="/image/logo-edit.png"
            alt="Travel With Us"
            className="h-[160px] w-auto object-contain"
          />
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-7">
          <Link
            href="/"
            className="text-green-700 hover:text-green-900 flex items-center space-x-2"
            aria-label="Home"
          >
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </Link>
          <Link
            href="/about"
            className="text-green-700 hover:text-green-900 flex items-center space-x-2"
            aria-label="About"
          >
            <i className="fa-solid fa-users"></i>
            <span>About</span>
          </Link>
          <Link
            href="/contact"
            className="text-green-700 hover:text-green-900 flex items-center space-x-2"
            aria-label="Contact"
          >
            <i className="fa-solid fa-phone"></i>
            <span>Contact</span>
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <Link
            href="#"
            className="border-2 border-yellow-500 text-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-500 hover:text-white flex items-center space-x-2"
            aria-label="Booking"
          >
            <i className="fa-solid fa-b"></i>
            <span>Booking Now</span>
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="text-green-700 py-2 px-4 border border-green-700 rounded-md hover:bg-green-700 hover:text-white flex items-center space-x-2"
                aria-label="Profile"
              >
                <i className="fa-solid fa-user"></i>
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-green-700 py-2 px-4 border border-green-700 rounded-md hover:bg-green-700 hover:text-white flex items-center space-x-2"
                aria-label="Logout"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-green-700 py-2 px-4 border border-green-700 rounded-md hover:bg-green-700 hover:text-white flex items-center space-x-2"
                aria-label="Login"
              >
                <i className="fas fa-sign-in"></i>
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="text-green-700 py-2 px-4 border border-green-700 rounded-md hover:bg-green-700 hover:text-white flex items-center space-x-2"
                aria-label="Register"
              >
                <i className="fa-solid fa-registered"></i>
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
