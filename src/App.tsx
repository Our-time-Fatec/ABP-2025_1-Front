import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import MapViewer from "./pages/mapView/MapViewer";
import { AuthProvider } from "./context/auth";
import { PrivateRoute } from "./pages/routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/mapa"
            element={
              <PrivateRoute>
                <MapViewer />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
