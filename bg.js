const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
  const image = new Image();
  // imgNumber에 +1을 해주는 이유는 0을 줄 수도 있기 때문이다.
  image.src = `img/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();

// math.random 무작위로 숫자를 보여줌
// math.random * 5 1에서 5 사이의 random number를 원함
// math.ceil 소수점을 다 올림 해줌
// math.floor 소수점을 다 내림 해줌
