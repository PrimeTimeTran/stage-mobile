let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'http://www.PrimeTimeTran.com/api/v1') {
  backendHost = 'http://www.PrimeTimeTran.com/api/v1';
} else if(hostname === 'http://stg.PrimeTimeTran.com/api/v1') {
  backendHost = 'http://stg.PrimeTimeTran.com/api/v1';
} else if(/^qa/.test(hostname)) {
  backendHost = `http://${hostname}/api/v1`;
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:3001';
}

export const API_ROOT = `${backendHost}/api/${apiVersion}/`;
