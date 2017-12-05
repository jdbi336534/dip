import './fetch-min.js';
import {
  Message
} from 'element-ui';
var baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = '/node'; // 这个为空就好了
} else {
  baseUrl = ''; // 这个设置成后台的域名
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * 请求 URL, 返回 promise.
 *
 * @param  {string} url       请求地址
 * @param  {object} [options] fetch配置参数
 * @return {object}           包含data和err的对象
 */
export default function request(url, options) {
  return fetch(baseUrl + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      if (data.code !== 200) {
        throw new Error(data.msg);
      }
      return {
        success: true,
        ...data
      }
    })
    .catch((err) => {
      let msg = err.message || 'Network Error'
      Message.error(msg);
      return {
        success: false,
        message: msg
      }
    });
}
