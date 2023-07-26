import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-v1-78728.cloudfunctions.net/api'
    // baseURL: 'http://127.0.0.1:5001/clone-v1-78728/us-central1/api'
})

export default instance;