module.exports = {
    apps: [
      {
        name: 'seamad-front',
        script: 'npm',
        args: 'start',
        instances: 1,
        cwd: '/var/www/seamad-liveaboards',
        exec_mode: 'cluster',
        max_restarts: 5,
        max_memory_restart: '3G',
        autorestart: true,
        watch: true
      }
    ]
    // env_local: {
    //   APP_ENV: 'local' // APP_ENV=local
    // },
    // env_dev: {
    //   APP_ENV: 'dev' // APP_ENV=dev
    // },
    // env_prod: {
    //   APP_ENV: 'prod' // APP_ENV=prod
    // }
  }