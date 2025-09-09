import React from "react";

interface URLDetailsProps {
  urlData: {
    originalUrl: string;
    shortLink: string;
    expiry: string;
  };
}

const URLDetails: React.FC<URLDetailsProps> = ({ urlData }) => {
  if (!urlData) return null;

  return (
    <div className="bg-white p-4 rounded shadow mb-3">
      <p>
        <strong>Original URL:</strong>{" "}
        <a
          href={urlData.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {urlData.originalUrl}
        </a>
      </p>
      <p>
        <strong>Short URL:</strong>{" "}
        <a
          href={urlData.shortLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {urlData.shortLink}
        </a>
      </p>
      <p>
        <strong>Expiry:</strong>{" "}
        {new Date(urlData.expiry).toLocaleString()}
      </p>
    </div>
  );
};

export default URLDetails;
