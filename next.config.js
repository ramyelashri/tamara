module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  serverRuntimeConfig: {
    secret: 'some random string'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : 'https://tamara-one.vercel.app/api' // production api
  }
}