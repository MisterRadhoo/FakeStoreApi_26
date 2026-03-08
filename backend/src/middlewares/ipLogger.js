const fs = require("fs");
const path = require("path");
require("colors");

const logsDir = path.resolve(__dirname, "..", "logs");
const logsPath = path.resolve(logsDir, "requests.csv");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

if (!fs.existsSync(logsPath)) {
  fs.writeFileSync(logsPath,
    "timestamp,ip,method,url,user_agent\n",
    "utf-8");
}

const ipLogger = (req, res, next) => {
  const xff = req.headers["x-forwarded-for"];
  const ip = xff
    ? xff.split(",")[0].trim()
    : req.socket?.remoteAddress || req.connection?.remoteAddress;
  const ua = req.headers["user-agent"] || "-";
  const method = req.method;
  const url = req.originalUrl || req.url;
  const time = new Date().toISOString();

  const line = `${time},${ip},${method},${url},"${ua}"\n`;
  fs.appendFileSync(logsPath, line, "utf-8");

  console.log(`[${time}] ip: ${ip} -> ${method} ${url}\n`.blue.bold);
  next();
};

module.exports = ipLogger;

