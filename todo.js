const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "todos";
let toDos = [];

function deleteToDo(event) {
  // target은 button을 계속 출력한다.
  const btn = event.target;

  // parentNode는 부모 요소를 찾아서 출력한다.
  const li = btn.parentNode;

  //자식 요소를 삭제
  toDoList.removeChild(li);

  // filter 함수는 ture인 아이템들만 가지고 새로운 array를 만든다.
  const cleanToDos = toDos.filter(function (toDo) {
    // li의 id가 string이기 때문에 string을 number로 바꿀 수 있는 parseInt를 사용해 li의 id를 number로 바꾼다.
    return toDo.id !== parseInt(li.id);
  });
  // toDos에 filter를 통해 나온 cleanToDos를 할당
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
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
    const parsedToDos = JSON.parse(loadedToDos);
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
