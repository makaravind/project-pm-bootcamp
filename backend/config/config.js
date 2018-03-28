const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'backend'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/teamup-development',
    LINKEDIN_CLIENT_ID: "81e75vubzj4civ",
    LINKEDIN_CLIENT_SECRET: "RvUTfNGvw6TLPhys",
    sessionSecret: 'BJNRvSLbio',
  },

  test: {
    root: rootPath,
    app: {
      name: 'backend'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/teamup-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'backend'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/teamup-production'
  }
};

module.exports = config[env];
