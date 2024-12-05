import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesWrapper from "@/routes/RoutesWrapper";
import { TimerProvider } from "./contexts/TimerContext";
import { QueueProvider } from "./contexts/QueueContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueueProvider>
        <TimerProvider>
          <RoutesWrapper />
        </TimerProvider>
      </QueueProvider>
    </BrowserRouter>
  );
};

export default App;
