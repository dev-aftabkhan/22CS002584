import React from "react";
import URLDetails from "./URLDetails";

interface URLListProps {
  urls: any[];
}

const URLList: React.FC<URLListProps> = ({ urls }) => {
  return (
    <div>
      {urls.map((url) => (
        <URLDetails key={url.shortcode} urlData={url} />
      ))}
    </div>
  );
};

export default URLList;
