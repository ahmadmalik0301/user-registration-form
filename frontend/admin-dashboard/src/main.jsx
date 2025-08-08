import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import ShowUsers from "./ShowUsers";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/update-user" element={<UpdateUser />} />
      <Route path="/delete-user" element={<DeleteUser />} />
      <Route path="/show-users" element={<ShowUsers />} />
    </Routes>
  </BrowserRouter>
);
