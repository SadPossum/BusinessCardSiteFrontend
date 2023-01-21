module.exports = {
  apps: [
    {
      name: 'BusinessCardSiteFrontendDemo',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}