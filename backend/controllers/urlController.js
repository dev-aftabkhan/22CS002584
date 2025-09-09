const Url = require("../models/urlModel");
const { createShortUrl, getUrl, addClick } = require("../services/urlService");

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const urlDoc = await createShortUrl(url, validity, shortcode);

    return res.status(201).json({
      shortLink: `${process.env.BASE_URL}/${urlDoc.shortcode}`,
      expiry: urlDoc.expiry.toISOString(),
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const urlDoc = await getUrl(shortcode);

    if (!urlDoc) {
      return res.status(404).json({ error: "Shortcode not found" });
    }

    if (new Date() > urlDoc.expiry) {
      return res.status(410).json({ error: "Link expired" });
    }

    await addClick(shortcode, req.get("referer") || "direct", req.ip, "unknown");

    return res.redirect(urlDoc.url);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const urlDoc = await getUrl(shortcode);

    if (!urlDoc) {
      return res.status(404).json({ error: "Shortcode not found" });
    }

    return res.json({
      url: urlDoc.url,
      createdAt: urlDoc.createdAt,
      expiry: urlDoc.expiry,
      totalClicks: urlDoc.clicks.length,
      clicks: urlDoc.clicks,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

