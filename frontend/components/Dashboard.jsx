"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBook,
  faThLarge,
  faPlusSquare,
  faCommentDots,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const Sidebar = ({ children, id }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white border-r shadow-lg overflow-y-auto fixed">
        <div className="text-center py-6 border-b">
          <Image
            src="/image/login.jpg"
            alt="logo"
            width={120}
            height={120}
            className="m-auto object-cover"
          />
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {[
              {
                href: `/${id}/dashboard`,
                icon: faTachometerAlt,
                label: "Dashboard",
              },
              { href: `/${id}/booking`, icon: faBook, label: "Booking" },
              { href: `/${id}/category`, icon: faThLarge, label: "Category" },
              {
                href: `/${id}/addpackage`,
                icon: faPlusSquare,
                label: "Add Package",
              },
              {
                href: `/${id}/feedback`,
                icon: faCommentDots,
                label: "Feedback",
              },
              { href: "/logout", icon: faSignOutAlt, label: "Logout" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-lg mx-4"
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6 bg-gray-50">{children}</div>
    </div>
  );
};

export default Sidebar;
