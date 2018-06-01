let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'www.stage.io') {
  backendHost = `https://${hostname}/${apiVersion}/`;
} else {
  backendHost = 'http://localhost:3001' || process.env.REACT_APP_BACKEND_HOST
}

export const API_ROOT = `${backendHost}/${apiVersion}/`;
