import { API } from "../config/constant.js";
class Service {
  callAPI(uri, method, data) {
    return axios({
      url: `${API}/${uri}`,
      method,
      data,
    });
  }
}
const service = new Service();
export const { callAPI } = service;
