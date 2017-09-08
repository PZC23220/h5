import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://192.168.1.107:8031/japi/',
    baseURL: 'http://'+ location.host +'/japi/',
    timeout: 8000
});
instance.interceptors.response.use(function(response){
    if(response.status === 200){
        return response.data;
    }else {
    	return response.data;
    }
}, function(error){
    console.error('http请求失败', error);
    // return error;
    return Promise.reject(error.response)
    // return Promise.reject(error);
});
// instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default instance;
