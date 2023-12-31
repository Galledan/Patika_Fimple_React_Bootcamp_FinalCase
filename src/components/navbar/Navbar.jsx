import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar() {
  return (
    <nav>
      <Link to="/basvuru-olustur">Başvuru Oluştur</Link>

      <Link to="/basvuru-sorgula">Başvuru Sorgula</Link>

      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;
