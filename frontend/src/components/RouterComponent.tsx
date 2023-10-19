import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogIn from "./../routes/LogIn";
import { PublicRoute } from "../routes/PublicRoute";
import { PrivateRoute } from "../routes/PrivateRoute";
import { AppRoutes } from "../routes/AppRoutes";

export default function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LogIn />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <AppRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
