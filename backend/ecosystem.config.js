require('dotenv').config({ path: '../../.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_BRANCH, DEPLOY_HOST, DEPLOY_PATH, REPO_URL,
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
    cwd: './backend',
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3005,
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
      path: `${DEPLOY_PATH}-backend`,
      'pre-deploy-local': `scp ./*.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && . ~/.nvm/nvm.sh && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
