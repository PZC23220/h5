import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://api.groupy.cn:8080/',
    timeout: 20000
});
instance.interceptors.response.use(function(response){
    if(response.status === 200){
        return response.data;
    }
}, function(error){
    console.error('http请求失败', error);
    // return Promise.reject(error);
});
// instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default instance;
