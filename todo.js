const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "todos";
const toDos = [];

function deleteToDo(event) {}

function saveToDos() {
  // localStorage에는 js의 data를 저장할 수 없다. only string만 가능하다.
  // JSON.stringify는 js의 object를 string으로 바꿔준다.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // loadedToDos를 출력하면 sting으로 나온다. 이걸 JSON.parse 메소드로 object로 바꿔준다.
    const parsedToDos = JSON.parse(loadedToDos);

    // forEach는 배열에 사용할 수 있는 메소드로 기본적으로 함수를 실행시킨다.
    // array에 담겨 있는 것들을 각각 한번씩 함수를 실행시켜 준다.
    // forEach 안에 함수를 넣을 수도 있고 외부에서 함수를 만들고 함수명을 넣을 수도 있다.
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
