import axios from "axios";

const API_BASE = "http://localhost:4141/api/url";

export const createShortURL = async (data: {
  url: string;
  shortcode: string;
  validity?: number;
}) => {
  try {
    const res = await axios.post(API_BASE, data);
    return res.data; // { shortLink, expiry }
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

export const getURLByShortcode = async (shortcode: string) => {
  try {
    const res = await axios.get(`${API_BASE}/${shortcode}`);
    return res.data; // { url, createdAt, expiry, totalClicks, clicks }
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

