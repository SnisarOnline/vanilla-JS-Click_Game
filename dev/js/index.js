'use strict';
//================================================================//
//********** Стартовые данные для базы ***************************//
//================================================================//
window.onload = function () {
  const base = {
    mode: [
      {
        delay: 2000,
        field: 3,
        name: 'Default',
      },
      {
        delay: 1800,
        field: 5,
        name: 'easyMode',
      },
      {
        delay: 1000,
        field: 10,
        name: 'normalMode',
      },
      {
        delay: 800,
        field: 15,
        name: 'hardMode',
      },
      {
        delay: 650,
        field: 20,
        name: 'superHardMode',
      }
    ]
  };
  localStorage.setItem('globalOptions', JSON.stringify(base));

  initOptionsList();
  initBoard(0);
};


//================================================================//
//********** Ui-Ui ***********************************************//
//================================================================//
function initOptionsList() {
  const levelList = document.getElementById('difficultyList');
  const BASE = JSON.parse(localStorage.getItem('globalOptions'));
  let htmlList = ``;

  BASE.mode.forEach((item, i, arr) => {
    htmlList += `<option value="${i}" >${item.name}</option>`;
  });
  levelList.innerHTML = htmlList;
}

function initBoard(selectedLevel = 0) {
  const BASE = JSON.parse(localStorage.getItem('globalOptions'));
  const board = document.getElementById('boardId');
  const countSquares = BASE.mode[selectedLevel].field * 3;

  let htmlList = ``;
  for (let i = countSquares; i > 0; i--) {
    htmlList += `<div class="board__item"></div>`;
  }

  if (countSquares >= 54) {
    board.style.maxWidth = '660px'
  }
  else if (countSquares >= 49) {
    board.style.maxWidth = '540px'
  }
  else if (countSquares >= 30) {
    board.style.maxWidth = '485px'
  }
  else if (countSquares >= 16) {
    board.style.maxWidth = '585px'
  }
  else {
    board.style.maxWidth = '350px';
  }

  board.innerHTML = htmlList;
}

function onChangBoard(event) {
  const selectElement = event.target;
  initBoard(selectElement.value);
}


//================================================================//
//********** Логика самой игры ***********************************//
//================================================================//
/**
 * Start game
 * Данная реализация имеет много замечаний в самой реализации
 * и непотдерживает остановку и паузу.
 */
function onStartGame(event) {
  /* // v2 example
  const form = document.querySelector("form.options");
  console.log('form name :', form[1].name);
  console.log('form value :', form[1].value);
  */
  event.preventDefault();
  const lv = event.target[1].value; // выбранный индекс/позиция настройки
  const userName = event.target[3].value; // введенное имя
  const board = document.getElementById('boardId');
  const BASE = JSON.parse(localStorage.getItem('globalOptions'));
  const selectedLevel = BASE.mode[lv]; // выберем нужные параметры по индексу из массива
  const setting = Object.assign({userName}, selectedLevel); // обьеденяем данные в один обьект для удобства
  const randomSquaresArr = randomSquares(setting); // получим массив с рандомными цифрами в заданном количестве.
  const winSquares = [];
  const losingSquares = [];

  // запуск игры
  for (let i = 0; i < randomSquaresArr.length; i++) {
    setTimeout(() => { // индивидуальная задержка для каждого квадрата
      const numberSquares = randomSquaresArr[i];

      const currentSquares = board.querySelector(`div:nth-child(${numberSquares + 1})`); // находим нужный квадрат
      let isActive = false; // флаг успешного нажатия

      // собитие удачного нажатия
      const listenActivator = (event) => {
        isActive = true;
        currentSquares.classList.add('win');
        winSquares.push(numberSquares); // добавим к выигранным
      };

      currentSquares.classList.add('active'); // сообщаем игроку что он активный.
      currentSquares.addEventListener("click", listenActivator); // подслушаем событие

      // установим таймер за время которого игрок должен успеть нажать нужный квадрат
      setTimeout(() => {
        currentSquares.classList.remove('active'); // время вышло - убираем всю активность
        currentSquares.removeEventListener("click", listenActivator);
        if (!isActive) { // в случае если игрок не успел нажать за отведенное время на активную кнопку
          currentSquares.classList.add('losing'); // пометим ее как - проигранную
          losingSquares.push(numberSquares); // и сохраним в проигранныую
        }
      }, setting.delay);
    }, setting.delay * i);
  }

  // дождемся когда игра закончится и проверем результат
  setTimeout(() => checkResultGame(setting, winSquares, losingSquares), setting.delay * randomSquaresArr.length);
}

function checkResultGame(setting, winSquares, losingSquares) {
  if (winSquares.length > losingSquares.length) {
    alert(`${setting.userName} is win`);
  }
  else {
    alert(`${setting.userName} is losing`);
  }
  document.location.reload();
}

//================================================================//
//********** Вспомагательные *************************************//
//================================================================//

function randomSquares(setting) {
  // todo: оптимизировать
  const min = 0;
  const maxNumberSquares = setting.field * 3;

  const exitIdNumbers = [];
  const result = [];

  for (let i = min; i < maxNumberSquares; i++) {
    exitIdNumbers.push(i);
  }

  for (let i = 0; i < maxNumberSquares; i++) {
    const range = Math.floor(Math.random() * (exitIdNumbers.length - min)) + min;
    const firstElement = exitIdNumbers.splice(range, 1)[0];
    result.push(firstElement);
  }

  return result;
}

