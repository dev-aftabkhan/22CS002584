import React, { useState } from "react";
import { getURLByShortcode } from "../services/api";

const FetchByShortcode: React.FC = () => {
  const [shortcode, setShortcode] = useState("");
  const [urlData, setUrlData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!shortcode) return;
    setLoading(true);
    setError("");
    setUrlData(null);

    try {
      const data = await getURLByShortcode(shortcode);
      setUrlData(data);
    } catch (err: any) {
      setError(err.message || "Error fetching URL");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-bold mb-2">Fetch URL by Shortcode</h2>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Enter Shortcode"
          className="p-2 border rounded flex-1"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700 transition"
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {urlData && (
        <div className="bg-gray-50 p-3 rounded border">
          <p>
            <strong>Original URL:</strong>{" "}
            <a
              href={urlData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {urlData.url}
            </a>
          </p>
          <p><strong>Created At:</strong> {new Date(urlData.createdAt).toLocaleString()}</p>
          <p><strong>Expiry:</strong> {new Date(urlData.expiry).toLocaleString()}</p>
          <p><strong>Total Clicks:</strong> {urlData.totalClicks}</p>

          {urlData.clicks && urlData.clicks.length > 0 && (
            <div className="mt-2">
              <strong>Click Details:</strong>
              <ul className="list-disc list-inside text-sm">
                {urlData.clicks.map((click: any) => (
                  <li key={click._id}>
                    {click.timestamp}: IP {click.ip}, Referrer {click.referrer}, Location {click.location}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchByShortcode;
