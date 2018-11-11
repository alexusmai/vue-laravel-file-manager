import axios from 'axios';
import { apiURL, headers } from './helper';

// set new axios instance
const HTTP = axios.create({
  baseURL: apiURL(),
  headers: headers(),
});

export default HTTP;
