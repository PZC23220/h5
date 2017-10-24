import axios from 'axios'

var instance = axios.create({
    // baseURL: 'http://192.168.1.107:8031/japi/',
    baseURL: 'http://'+ location.host +'/japi/',
    timeout: 8000
});
instance.interceptors.response.use(function(response){
        return response.data;
}, function(error){
    console.error('http请求失败', error);
    return error;
    // return Promise.reject(error);
});
// instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default instance;












