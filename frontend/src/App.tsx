import React, { useState } from "react";
import Header from "./components/Header";
import ShortenForm from "./components/ShortenForm";
import URLDetails from "./components/URLDetails";
import FetchByShortcode from "./components/FetchByShortcode"; // ✅ import new component

const App: React.FC = () => {
  const [urls, setURLs] = useState<
    { originalUrl: string; shortLink: string; expiry: string }[]
  >([]);

  const handleNewURL = (data: any) => {
    setURLs([data, ...urls]);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Header />

      {/* Form to create a new short URL */}
      <ShortenForm onNewURL={handleNewURL} />

      {/* Display newly created URLs */}
      {urls.map((url) => (
        <URLDetails key={url.shortLink} urlData={url} />
      ))}

      {/* New section: Fetch URL details by shortcode */}
      <FetchByShortcode />
    </div>
  );
};

export default App;
