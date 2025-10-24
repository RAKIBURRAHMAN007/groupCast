// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import AuthProvider from "./provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "./provider/SoketProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <RouterProvider router={router}></RouterProvider>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
