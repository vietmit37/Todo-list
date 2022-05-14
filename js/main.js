import { fetchData, addData, deleteDataID, updateDataID } from "./service.js";
import TODO from "./toDoList.js";
let tasks = [];
const getEle = (id) => document.getElementById(id);
const getList = () => {
  fetchData()
    .then((res) => {
      renderList(res.data);
      tasks = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
getList();
const renderList = (data) => {
  let { pending, complete } = data.reduce(
    (acc, item) => {
      let { id, name, value } = item;
      let isComplete = value === "completed" ? "checked" : "";

      const li = `<tr>
        <li class=${isComplete}>
          <label for="${id}" >
            <input type="checkbox" onclick="updateValue(this,${id})" id="${id}" ${isComplete}/>
            <span class=${isComplete}>${name}</span>
          </label>
          <div>
              <span><i class="fas fa-trash" onclick="deleteData(${id})"></i></span>
            <span><i class="fas fa-check-circle"></i></span>
           </div>
        </li>
        </tr>`;

      acc[isComplete ? "complete" : "pending"] += li;
      return acc;
    },
    { complete: "", pending: "" }
  );
  getEle("completed").innerHTML = complete;
  getEle("todo").innerHTML = pending;
};
getEle("addItem").addEventListener("click", () => {
  let name = getEle("newTask").value.trim();
  let data = new TODO("", name, "pending");
  if (name) {
    addData(data)
      .then(() => {
        getList();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getEle("newTask").value = "";
});

const deleteData = (id) => {
  deleteDataID(id)
    .then(() => {
      getList();
    })
    .catch((err) => {
      console.log(err);
    });
};
const updateValue = (select, id) => {
  let name =
    select.parentElement.firstElementChild.nextElementSibling.innerText;
  let value = select.checked ? "completed" : "pending";
  let data = new TODO(id, name, value);

  updateDataID(id, data)
    .then(() => {
      getList();
    })
    .catch((err) => {
      console.log(err);
    });
};

getEle("two").addEventListener("click", () => {
  // Sap xep a-z
  tasks.sort((a, b) => (a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0));
  renderList(tasks);
});
getEle("three").addEventListener("click", () => {
  // Sap xep z-a
  tasks.sort((a, b) => (a.name !== b.name ? (a.name < b.name ? 1 : -1) : 0));
  renderList(tasks);
});
window.deleteData = deleteData;
window.updateValue = updateValue;
