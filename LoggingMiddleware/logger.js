const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "logs.json");

function logToFile(entry) {
  const logEntry = JSON.stringify(entry) + "\n";
  fs.appendFileSync(logFile, logEntry);
}

module.exports = function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const logEntry = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: Date.now() - start + "ms",
      timestamp: new Date().toISOString(),
    };
    logToFile(logEntry);
  });

  next();
};