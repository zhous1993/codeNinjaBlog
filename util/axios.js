/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-04 17:04:33
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-04-07 11:02:07
 * @FilePath: \study\nextjs-blog\util\axios.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: '100000',
});
request.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    if (config.method === 'get' && config.params) {
      let url = config.url;
      url += '?';
      const keys = Object.keys(config.params);
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`;
        }
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
      config.url = url;
    }
    console.log('====发出请求====');
    return config;
  },
  (err) => {
    console.log(err);
    Promise.reject(err);
  },
);
/**
 * 接口返回处理
 */
request.interceptors.response.use(
  (response) => {
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response;
    } else if (response.data.code === 200) {
      return response.data;
    } else if ([800, 801, 803, 802].includes(response.data.code)) {
      return response.data;
    } else if (response.data.code === 401) {
    } else {
      console.log(response);

      throw response.data;
    }
  },
  (error) => {
    console.log('请求出错了：' + error); // for debug
    // ElMessage.error(error.message)
    const { response } = error;
    console.log(response?.status);
    switch (response?.status) {
      case 401:
        break;
      case 400:
        break;
      default:
    }
    return Promise.reject(error);
  },
);
export default request;
