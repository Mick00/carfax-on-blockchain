import React from "react";
import ResearchPane from "./panes/ResearchPane";
import AppProviders from "./components/AppProviders";
import Dashboard from "./layouts/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contributors from "./panes/Contributors";
import Cars from "./panes/cars";
import Registrar from "./panes/registrar";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Dashboard>
          <Routes>
            <Route path={"/"} element={<ResearchPane />} />
            <Route path={"/contributors"} element={<Contributors />} />
            <Route path={"/registrars"} element={<Registrar />} />
            <Route path={"/cars"} element={<Cars />} />
          </Routes>
        </Dashboard>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
