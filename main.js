let API = "http://localhost:8001/students";

//  ! инпуты для добавления // start
let inpAdd_name = document.querySelector(".section__add_name");
let inpAdd_surname = document.querySelector(".section__add_surname");
let inpAdd_number = document.querySelector(".section__add_number");
let inpAdd_KPI_week = document.querySelector(".section__add_KPI-week");
let inpAdd_KPI_month = document.querySelector(".section__add_KPI-month");
let btnAdd = document.querySelector(".student__add_save");
let table = document.querySelector("table");
let limit = 3;
let inpabc = document.querySelector(".abc");
// ! добавление в API
btnAdd.addEventListener("click", () => {
  // ! проверка на заполненность полей
  if (
    !inpAdd_name.value.trim() ||
    !inpAdd_surname.value.trim() ||
    !inpAdd_number.value.trim() ||
    !inpAdd_KPI_week.value.trim() ||
    !inpAdd_KPI_month.value.trim()
  ) {
    alert("заполните поле");
    return;
  }
  let obj = {
    name: inpAdd_name.value,
    surname: inpAdd_surname.value,
    number: inpAdd_number.value,
    week: inpAdd_KPI_week.value,
    month: inpAdd_KPI_month.value,
  };
  // console.log(obj);
  createProduct(obj);
  inpAdd_name.value = "";
  inpAdd_surname.value = "";
  inpAdd_number.value = "";
  inpAdd_KPI_week.value = "";
  inpAdd_KPI_month.value = "";
});

let inpSearch = document.querySelector(".search-txt");

// console.log(inpSearch.value);
let seachValue = inpSearch.value;
console.log(inpSearch);

async function getAPI() {
  let studentInfo = await fetch(`${API}?q=${seachValue}`).then((res) =>
    res.json()
  );
  studentInfo.forEach((info) => {
    let trAdd = document.createElement("tr");
    trAdd.innerHTML += `
        <td>${info.name}</td>
        <td>${info.surname}</td>
        <td>${info.number}</td>
        <td>${info.week}</td>
        <td>${info.month}</td>`;
    table.append(trAdd);
    // console.log(info);
  });
  // ! =============== SEARCH START ===============
  // console.log(inpSearch.value);
  inpSearch.addEventListener("input", (e) => {
    seachValue = e.target.value;
  });
  getAPI();
  // ? =============== SEARCH END =====================

  let countPage = 1;
  async function pageTotal() {
    let data = await fetch(`${API}?q=${seachValue}`).then((res) => res.json());
    // console.log(data.length);
    countPage = Math.ceil(data.length / limit);
  }
  pageTotal();
}
// console.log(pageTotal());
getAPI();

function createProduct(obj) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then((res) => res.json());
  getAPI();
}
