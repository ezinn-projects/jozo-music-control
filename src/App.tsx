import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesWrapper from "@/routes/RoutesWrapper";
import { TimerProvider } from "./contexts/TimerContext";
import { QueueProvider } from "./contexts/QueueContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "@/components/ToastContainer";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
      <BrowserRouter>
        <QueueProvider>
          <TimerProvider>
            <RoutesWrapper />
          </TimerProvider>
        </QueueProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
