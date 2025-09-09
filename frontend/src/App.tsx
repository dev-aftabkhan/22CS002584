import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import axios from "axios";

const queryClient = new QueryClient();

const App = () => {
  const [showStatistics, setShowStatistics] = useState(false);
  const [shortenResponse, setShortenResponse] = useState(null);
  const [statisticsResponse, setStatisticsResponse] = useState(null);
  const [shortcode, setShortcode] = useState("");

  const handleShortenLink = async () => {
    try {
      const response = await axios.post("http://localhost:4141/api/url/", {
        url: "https://www.google.com",
        validity: 10,
        shortcode: "mycode1",
      });
      setShortenResponse(response.data);
    } catch (error) {
      console.error("Error creating shortened link:", error);
    }
  };

  const handleFetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:4141/api/url/${shortcode}`);
      setStatisticsResponse(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
