import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const authToken = localStorage.getItem("authToken"); 
  return authToken ? children : <Navigate to="/login" />;
}
