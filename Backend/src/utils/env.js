require('dotenv').config();

exports.gEnv = (key, defaultValue = null) => {
  return process.env[key] || defaultValue;
};

exports.normalizePort = (value) => {
  const port = parseInt(value);

  if (Number.isNaN(port)) return port;
  return port > 0 ? port : 'false';
};
