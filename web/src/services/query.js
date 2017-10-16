import request from '../utils/request';
import qs from 'qs';
const postparams = {
  credentials: 'include',
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};
// const getparams = {
//   credentials: 'include'
// }

// 保存kafka loader
export async function saveConfig(params) {
  return request(`/loader/kafkaloader`, {
    ...postparams,
    body: qs.stringify(params)
  });
}
// 分页显示kafka loader
export async function getKafkaconfigList(params) {
  return request(`/loader/allLoaders`, {
    ...postparams,
    body: qs.stringify(params)
  });
}
// id 查找GetLoaderById
export async function getKafkaconfigbyId(params) {
  return request(`/loader/GetLoaderById?${qs.stringify(params)}`);
}
// 开启kafka
export async function startKfk() {
  return request(`/exec/startKfk`);
}
// 关闭kafka
export async function stopKfk() {
  return request(`/exec/stopKfk`);
}
