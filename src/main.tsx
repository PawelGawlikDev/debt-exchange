import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.less";
import { ViewportProvider } from "./context/VievportContext.tsx";
import { store } from "./store.ts";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ViewportProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ViewportProvider>
    </QueryClientProvider>
  </StrictMode>,
);
