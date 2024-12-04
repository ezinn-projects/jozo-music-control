import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesWrapper from "@/routes/RoutesWrapper";
import { TimerProvider } from "./contexts/TimerContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <TimerProvider>
        <RoutesWrapper />
      </TimerProvider>
    </BrowserRouter>
  );
};

export default App;
