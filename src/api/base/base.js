import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../../config/memory.config';

const BASE_URL = process.env.REACT_APP_BASE_URL || '0.0.0.0/0'

const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
const requestHeaders = {
	'Content-Type': 'application/json',
}

if (token) {
	requestHeaders.Authorization = 'Bearer ' + token
}

const API = axios.create({
	baseURL: `${BASE_URL}/online-exam-api`,
	headers: requestHeaders,
})

export default API;