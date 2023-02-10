module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  PORT_BE: process.env.PORT_BE,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  GOOGLE_RECAPTCA_SECRET_KEY: process.env.GOOGLE_RECAPTCA_SECRET_KEY,
  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  RESET_PASSWORD_TOKEN_VALIDITY_IN_MINUTES: process.env.RESET_PASSWORD_TOKEN_VALIDITY_IN_MINUTES,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  AUTH_SUCCESS_REDIRECT: process.env.AUTH_SUCCESS_REDIRECT,
  AUTH_FAILURE_REDIRECT: process.env.AUTH_FAILURE_REDIRECT,
  FE_ORIGIN: process.env.FE_ORIGIN,
};
