import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 8000,
  ip: process.env.HOST || "0.0.0.0",
  mongo: {
    uri: process.env.MONGO_URL || "mongodb://localhost:27017/icssf_test",
    // poll
    poolSize: process.env.MONGO_POOL_SIZE || 10,
  },

  jwt: {
    secret: process.env.JWT_SECRET || "jkl!±@£!@ghj1237",
    expiration: process.env.JWT_EXPIRATION || 7200000,
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || 604800000,
  },

  frontendURL: process.env.FRONTURL || "http://localhost:3000",
  email: {
    user: process.env.EMAIL_USER || "test@gmail.com",
    pass: process.env.EMAIL_PASS || "123456",
    verifyUrl:
      process.env.VERIFY_URL || "http://localhost:8000/api/confirm-email",
  },

  bcrypt: {
    saltRounds: process.env.SALT_ROUNDS || 10,
  },

  cloudinary: {
    cloudName: process.env.CLOUD_NAME || "davjxqk1z",
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
    file: process.env.LOG_FILE || "logs/app.log",

    // logs/combined.log
    combined: {
      filename: process.env.LOG_COMBINED || "logs/combined.log",
      maxsize: 10485760,
      maxFiles: 3,
    },

    // logs/error.log
    error: {
      filename: process.env.LOG_ERROR || "logs/error.log",
      maxsize: 10485760,
      maxFiles: 5,
    },

    // logs/exceptions.log
    exceptions: {
      filename: process.env.LOG_EXCEPTIONS || "logs/exceptions.log",
      maxsize: 10485760,
      maxFiles: 5,
    },

    // logs/requests.log
    requests: {
      filename: process.env.LOG_REQUESTS || "logs/requests.log",
      maxsize: 10485760,
      maxFiles: 5,
    },
  },
};
