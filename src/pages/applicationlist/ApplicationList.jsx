import React, { useState, useEffect } from "react";
import { useApplication } from "../../context/ApplicationContext";
import Application from "../../components/application/Application";
import "./applist.css";

function ApplicationList() {
  const { applications, getApplications } = useApplication();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredApplications = applications.filter(
    (app) =>
      (app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || app.status === statusFilter)
  );

  useEffect(() => {
    getApplications();
  }, [applications]);

  return (
    <div className="application-list-container">
      <div className="filters-container">
        <div className="search-container">
          <label htmlFor="search">Ad Soyad Filtrele:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-container">
      <label htmlFor="status">Durum Filtrele:</label>
      <select
        id="status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">Hepsi</option>
        <option value="pending">Beklemede</option>
        <option value="answered">Cevaplandı</option>
      </select>
    </div>
      </div>

      <div className="applications-container">
        <h2>Başvuru Listesi:</h2>
        <table className="application-table">
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>Tarih</th>
              <th>ID</th>
              <th>Status</th>
              <th>Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id}>
                <Application
                  firstName={app.firstName}
                  lastName={app.lastName}
                  applicationReason={app.applicationReason}
                  applicationDate={app.applicationDate}
                  id={app.id}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApplicationList;
