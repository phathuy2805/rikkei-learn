require('dotenv').config();

let initCount = 0;
initCount++;

const levels = { info: 0, warn: 1, error: 2 };
const currentLogLevel = (process.env.LOG_LEVEL || 'info').toLowerCase();
const minLevel = levels[currentLogLevel] !== undefined ? levels[currentLogLevel] : 0;

function log(levelName, format, msg) {
  if (levels[levelName] >= minLevel) {
    console.log(`[${format}] ${msg}`);
  }
}

function info(msg) {
  log('info', 'INFO', msg);
}

function warn(msg) {
  log('warn', 'WARN', msg);
}

function error(msg) {
  log('error', 'ERROR', msg);
}

module.exports = {
  info,
  warn,
  error,
  getInitCount: () => initCount
};
