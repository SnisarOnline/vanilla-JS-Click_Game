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
        delay: 2010,
        field: 5,
        name: 'easyMode',
      },
      {
        delay: 1000,
        field: 10,
        name: 'normalMode',
      },
      {
        delay: 900,
        field: 15,
        name: 'hardMode',
      },
      {
        delay: 900,
        field: 20,
        name: 'superHardMode',
      }
    ],
    winners: [
      {name: 'name1', time: 'time1'},
      {name: 'name2', time: 'time2'},
      {name: 'name3', time: 'time3'},
    ]
  };
  localStorage.setItem('globalOptions', JSON.stringify(base));

  initOptionsList();
  initBoard(0);
  initWinnersList$();
};


//================================================================//
//********** Ui-Ui ***********************************************//
//================================================================//
function initOptionsList() {
  const levelList = document.getElementById('List_difficulty');
  const BASE = JSON.parse(localStorage.getItem('globalOptions'));
  let htmlList = ``;

  BASE.mode.forEach((item, i, arr) => {
    htmlList += `<option value="${i}" >${item.name}</option>`;
  });
  levelList.innerHTML = htmlList;
}

function initBoard(selectedLevel = 0) {
  const BASE = JSON.parse(localStorage.getItem('globalOptions'));
  const board = document.getElementById('Board');
  const countSquares = BASE.mode[selectedLevel].field * 3;

  let htmlList = ``;
  for (let i = countSquares; i >= 0; i--) {
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
  this.initBoard(selectElement.value);
}


function initWinnersList$() {
  const winnersList = document.getElementById('winnersList');
  const BASE = JSON.parse(localStorage.getItem('globalOptions'));
  const countWinners = BASE.winners.length;

  let htmlList = ``;
  for (let i = 0; i < countWinners; i++) {
    htmlList += `<div>
            <span>${i}</span>
            <span>${BASE.winners[i].name}</span>
            <span>${BASE.winners[i].time}</span>
          </div>`;
  }

  winnersList.innerHTML = htmlList;
}

// todo: добавление
function addNewPlayer() {}

function saveWinner() {}


//================================================================//
//********** Логика **********************************************//
//================================================================//
/**
 * Start game
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
  const BASE = JSON.parse(localStorage.getItem('globalOptions'));
  const selectedLevel = BASE.mode[lv]; // выберем нужные параметры по индексу из массива
  const setting = Object.assign({userName}, selectedLevel); // обьеденяем данные в один обьект
  console.log('setting', setting);

  const randomSquaresArr = this.randomSquares(setting);
  const settingDelay = setting.delay;

  // todo: закончить катку
  // start random activation
  // from(randomSquaresArr)
  //   .pipe(
  //     concatMap(x => of(x)
  //       .pipe(
  //         delay(settingDelay)
  //       )
  //     ),
  //     takeUntil(this.destroyStream$)
  //   )
  //   .subscribe((id) => {
  //     this.toggleActiveSquares(id);
  //
  //     setTimeout(() => {
  //       this.toggleActiveSquares(id);
  //
  //       this.userDontClickSquare(id);
  //
  //       this.endGame(randomSquaresArr, id);
  //
  //       this.cdr.detectChanges();
  //     }, settingDelay);
  //   });
}

//================================================================//
//********** Вспомагательные *************************************//
//================================================================//
function showGameMessage(who) {
  alert(`${who.winner} is win`);
}

function randomSquares(setting) {
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

