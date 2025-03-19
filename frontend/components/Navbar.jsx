"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import "@fortawesome/fontawesome-free/css/all.min.css";
import { userStore } from "@/store/userStore";

export default function Navbar() {
  const { id } = useParams();
  const router = useRouter(); // Initialize useRouter
  const { user, loading, error, fetchUserById, logout } = userStore();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoggedIn(true);
    }
  }, [id]);

  const handleLogout = async () => {
    await logout(); // Call Zustand logout function
    router.push("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-md h-[100px]">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-full">
        {/* Logo */}
        <div className="flex items-center h-full">
          <Link href={id ? `/${id}/` : "/"}>
            <img
              src="/image/logo-edit.png"
              alt="Travel With Us"
              className="h-[160px] w-auto object-contain"
            />
          </Link>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-7">
          <Link
            href={id ? `/${id}/` : "/"}
            className="text-green-700 hover:text-green-900 flex items-center space-x-2"
            aria-label="Home"
          >
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </Link>
          <Link
            href={id ? `/${id}/about` : "/about"}
            className="text-green-700 hover:text-green-900 flex items-center space-x-2"
            aria-label="About"
          >
            <i className="fa-solid fa-users"></i>
            <span>About</span>
          </Link>
          <Link
            href={id ? `/${id}/contact` : "/contact"}
            className="text-green-700 hover:text-green-900 flex items-center space-x-2"
            aria-label="Contact"
          >
            <i className="fa-solid fa-phone"></i>
            <span>Contact</span>
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                href={`/${id}/list-tour`}
                className="border-2 border-yellow-500 text-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-500 hover:text-white flex items-center space-x-2"
                aria-label="Booking"
              >
                <i className="fa-solid fa-calendar-check"></i>
                <span>Booking Now</span>
              </Link>

              <Link
                href={`/profile/${id}/myprofile`}
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
                <i className="fas fa-sign-in-alt"></i>
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
