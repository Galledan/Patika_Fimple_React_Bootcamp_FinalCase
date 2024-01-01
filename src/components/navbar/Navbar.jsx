import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useAdmin } from "../../context/AdminContext";
function Navbar() {

  const {isLoggedIn, logOut} = useAdmin()

  return (
    <nav>
      <Link to="/basvuru-olustur">Başvuru Oluştur</Link>

      <Link to="/basvuru-sorgula">Başvuru Sorgula</Link>

      <Link to="/admin">Admin</Link>

      {isLoggedIn && <Link to="/admin/basvuru-listesi">Başvuru Listesi</Link>}
      {isLoggedIn && <div onClick={logOut}>
        <Link to="/admin">Çıkış yap</Link>
      </div>}
    </nav>
  );
}

export default Navbar;
