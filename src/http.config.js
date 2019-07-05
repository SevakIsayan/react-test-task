import axios from 'axios';

// Environment variables
import { API } from './env.config';

axios.defaults.baseURL = API;

export default axios;