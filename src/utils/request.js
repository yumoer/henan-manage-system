import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: 'http://47.94.106.106:8000/',
    // timeout: 500
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log('数据请求失败',error)
      console.log(Promise.reject())
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        // this.$message.error('数据请求失败');
        console.log(error,'数据请求失败');
        return Promise.reject();
    }
);

export default service;
