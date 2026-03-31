module.exports = {
  apps: [
    {
      name: 'weather-ts',
      script: 'serve',
      args: '-s dist -l 3000',
      env: {
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: 3000,
      },
    },
  ],
};
