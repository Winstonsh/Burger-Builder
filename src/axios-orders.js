import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-builder-76d31.firebaseio.com/"
});

export default instance;