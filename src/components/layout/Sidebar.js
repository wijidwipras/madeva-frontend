import "../../styles/sidebar.scss";
import React, { useState } from "react";
import {
  BsGraphUp,
  BsPerson,
  BsFilePerson,
  BsCapsulePill,
  BsArchive,
  BsCart3,
  BsCreditCard2Front,
} from "react-icons/bs";
import { FaStethoscope, FaCashRegister } from "react-icons/fa";

const Sidebar = () => {
  const navItems = [
    { id: "dashboard", icon: <BsGraphUp />, label: "Dashboard", path: "#" },
    { id: "pasien", icon: <BsPerson />, label: "Pasien", path: "#" },
    { id: "kunjungan", icon: <BsFilePerson />, label: "Kunjungan", path: "#" },
    { id: "pelayanan", icon: <FaStethoscope />, label: "Pelayanan", path: "#" },
    { id: "kasir", icon: <FaCashRegister />, label: "Kasir", path: "#" },
    { id: "farmasi", icon: <BsCapsulePill />, label: "Farmasi", path: "#" },
    { id: "inventori", icon: <BsArchive />, label: "Inventori", path: "#" },
    { id: "purchasing", icon: <BsCart3 />, label: "Purchasing", path: "#" },
    {
      id: "pembayaran",
      icon: <BsCreditCard2Front />,
      label: "Pembayaran",
      path: "#",
    },
  ];

  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <aside className="sidebar">
      <ul className="sidebar-nav-list">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`sidebar-nav-item ${
              activeItem === item.id ? "active" : ""
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            <a href={item.path} className="sidebar-nav-link">
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span className="sidebar-nav-label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
