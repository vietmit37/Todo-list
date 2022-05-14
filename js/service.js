const API = "https://625bc0d550128c5702070781.mockapi.io/api/todo";
export default class Service {
  fetchData() {
    return axios({
      url: API,
      method: "GET",
    });
  }
  addData(data) {
    return axios({
      url: API,
      method: "POST",
      data: data,
    });
  }
  deleteDataID(id) {
    return axios({
      url: `${API}/${id}`,
      method: "DELETE",
    });
  }
  updateDataID(id, data) {
    return axios({
      url: `${API}/${id}`,
      method: "PUT",
      data: data,
    });
  }
}
const service = new Service();
export const { fetchData, addData, deleteDataID,updateDataID } = service;
