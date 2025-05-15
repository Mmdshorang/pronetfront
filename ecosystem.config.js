module.exports = {
  apps: [
    {
      name: "next-app",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "C:/Users/mmdsk/Desktop/shoping-hesaban",
      env: {
        NODE_ENV: "production",
        PORT: 4202
      }
    }
  ]
};
