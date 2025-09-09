const Url = require("../models/urlModel");
const generateCode = require("../utils/generateCode");

async function createShortUrl(originalUrl, validity, customCode) {
  let shortcode = customCode || generateCode(6);

  // ensure uniqueness
  const exists = await Url.findOne({ shortcode });
  if (exists) {
    throw new Error("Shortcode already taken");
  }

  const expiry = new Date(Date.now() + (validity || 30) * 60000);

  const urlDoc = await Url.create({
    url: originalUrl,
    shortcode,
    expiry,
  });

  return urlDoc;
}

async function getUrl(shortcode) {
  return await Url.findOne({ shortcode });
}

async function addClick(shortcode, referrer, ip, location) {
  const urlDoc = await Url.findOne({ shortcode });
  if (!urlDoc) throw new Error("Shortcode not found");
  urlDoc.clicks.push({ referrer, ip, location });
  await urlDoc.save();
  return urlDoc;
}

module.exports = { createShortUrl, getUrl, addClick };
