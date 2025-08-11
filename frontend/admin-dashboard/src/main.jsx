import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddUser from "./Pages/AddUser/AddUser";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import DeleteUser from "./Pages/DeleteUser/DeleteUser";
import ShowUsers from "./Pages/ShowUsers/ShowUsers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/update-user" element={<UpdateUser />} />
      <Route path="/delete-user" element={<DeleteUser />} />
      <Route path="/show-users" element={<ShowUsers />} />
    </Routes>
  </BrowserRouter>
);
