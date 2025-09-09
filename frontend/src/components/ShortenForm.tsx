import React, { useState } from "react";
import { createShortURL } from "../services/api";

interface ShortenFormProps {
  onNewURL: (data: any) => void;
}

const ShortenForm: React.FC<ShortenFormProps> = ({ onNewURL }) => {
  const [url, setURL] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !shortcode) {
      setError("Original URL and shortcode are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await createShortURL({ url, shortcode, validity });
      onNewURL({ originalUrl: url, ...data }); // Pass originalUrl + API response
      setURL("");
      setShortcode("");
      setValidity(undefined);
    } catch (err: any) {
      setError(err.message || "Error creating short URL");
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-3 mb-6" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Original URL"
        className="p-2 border rounded"
        value={url}
        onChange={(e) => setURL(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter Shortcode"
        className="p-2 border rounded"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Validity in minutes (optional)"
        className="p-2 border rounded"
        value={validity ?? ""}
        onChange={(e) =>
          setValidity(e.target.value ? Number(e.target.value) : undefined)
        }
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Creating..." : "Shorten URL"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default ShortenForm;
