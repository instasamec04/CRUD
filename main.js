const API = "http://localhost:8000/comments";

let inpName = document.getElementById("inp-Name");
let inpEmail = document.getElementById("inp-Email");
let inpNumbers = document.getElementById("inp-Numbers");
let inpImgUrl = document.getElementById("inp-ImgUrl");

let btnAdd = document.getElementById("btn");
// console.log(btnAdd);

btnAdd.addEventListener("click", async () => {
  let newTodo = {
    Name: inpName.value,
    Email: inpEmail.value,
    Numbers: inpNumbers.value,
    ImgUrl: inpImgUrl.value,
  };

  // console.log(newTodo);

  if (inpName.value.trim() == "") {
    alert("Заполните имя!");
    return;
  } else if (inpEmail.value.trim() == "") {
    alert("Заполните фамилию");
    return;
  } else if (inpNumbers.value.trim() == "") {
    alert("Заполните номер");
    return;
  } else if (inpImgUrl.value.trim() == "") {
    alert("Заполните ссылку на картинку!");
    return;
  }

  await fetch(API, {
    method: "post",
    body: JSON.stringify(newTodo),
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
  inpName.value = "";
  inpEmail.value = "";
  inpNumbers.value = "";
  inpImgUrl.value = "";
  localStorage.getItem(
    newTodo.Name,
    newTodo.Email,
    newTodo.Numbers,
    newTodo.ImgUrl
  );

  getTodos();
});

let list = document.getElementById("list");

getTodos();
// console.log(list)

async function getTodos() {
  let responce = await fetch(API).then((res) => res.json());
  list.innerHTML = "";
  responce.forEach((item) => {
    let newElem = document.createElement("div");
    newElem.id = item.id;
    newElem.innerHTML = `
          <span>${item.Name}</span>
          <span>${item.Email}</span>
          <span>${item.Numbers}</span>
          <img src="${item.ImgUrl}"></img>
          <button class="btn-delete">delete</button>
          <button class="btn-edit">edit</button>
          `;
    list.append(newElem);
  });
}

document.addEventListener("click", async (e) => {
  // console.log(e.target);
  if (e.target.className === "btn-delete") {
    let id = e.target.parentNode.id;
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    getTodos();
  }
  //   ! Update
  if (e.target.className === "btn-edit") {
    modalEdit.style.display = "flex";
    let id = e.target.parentNode.id;
    let responce = await fetch(`${API}/${id}`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    getTodos();
    // console.log(responce);
    inpEditName.value = responce.Name;
    inpEditEmail.value = responce.Email;
    inpEditNumber.value = responce.Number;
    inpEditImgUrl.value = responce.ImgUrl;
    inpEditname.className = responce.id;
    inpEditEmail.className = responce.id;
    inpEditNumber.className = responce.id;
    inpEditImgUrl.className = responce.id;
  }
});

let modalEdit = document.querySelector("#modal-edit");

let modalEditClose = document.querySelector("#modal-edit-close");

let inpEditName = document.querySelector("#inp-edit-Name");

let inpEditEmail = document.querySelector("#inp-edit-Email");

let inpEditNumber = document.querySelector("#inp-edit-Number");

let inpEditImgUrl = document.querySelector("#inp-edit-ImgUrl");

let inpEditId = document.querySelector("#inp-edit-id");

let btnsaveEdit = document.querySelector("#modal-edit-close");

// console.log(modalEdit,modalEditClose,inpEditId,inpEditTodo);

modalEditClose.addEventListener("click", () => {
  modalEdit.style.display = "none";
});

btnsaveEdit.addEventListener("click", async () => {
  let editedTodo = {
    Name: inpEditName.value,
    Email: inpEditEmail.value,
    Number: inpEditNumber.value,
    ImgUrl: inpEditImgUrl.value,
  };
  let id = inpEditName.className;
  let id1 = inpEditEmail.className;
  let id2 = inpEditNumber.className;
  let id3 = inpEditImgUrl.className;
  console.log(id);
  console.log(editedTodo);
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  await fetch(`${API}/${id1}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  await fetch(`${API}/${id2}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  await fetch(`${API}/${id3}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  modalEdit.style.display = "none";
  getTodos();
});
