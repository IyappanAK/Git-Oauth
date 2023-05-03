import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import Routes from "./routes/Routes";
import "./index.css";
import PageInfoProvider from "./contexts/PageInfoProvider";
import { setupAxiosInterceptor } from "./api/axios.helper";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setupAxiosInterceptor(navigate, pathname);
  }, []);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PageInfoProvider>
        <Routes />
      </PageInfoProvider>
    </QueryClientProvider>
  );
}

export default App;
