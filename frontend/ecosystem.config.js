require('dotenv').config({ path: '../../.env.deploy' });

const { DEPLOY_USER, DEPLOY_BRANCH, DEPLOY_HOST, DEPLOY_PATH, REPO_URL } = process.env;

module.exports = {
  apps: [{
    name: 'frontend-service',
    script: 'serve',
    cwd: './frontend',
    args: ['-s', 'build', '-l', '3000'],
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    autorestart: true,
    max_restarts: 10,
    restart_delay: 1000,
  }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_BRANCH,
      repo: REPO_URL,
      path: `${DEPLOY_PATH}-frontend`,
      'post-deploy': 'cd frontend && . ~/.nvm/nvm.sh && nvm use 16 && npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
      'pre-setup': 'which git || sudo apt-get install git -y && (which serve || npm install -g serve)',
    },
  },
};
