//================================================================//
//********** Стартовые данные для базы ***************************//
//================================================================//
window.onload = function () {
  const base = [
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
    }
  ];
  localStorage.setItem('globalOptions', JSON.stringify(base));

  initOptionsList();
  initBoard(0);
};


//================================================================//
//********** Ui-Ui ***********************************************//
//================================================================//
function initOptionsList() {
  const levelList = document.getElementById('List_difficulty');
  const BASE = JSON.parse(localStorage.getItem('globalOptions'));
  let htmlList = ``;

  BASE.forEach((item, i, arr) => {
    htmlList += `<option value="${i}" >${item.name}</option>`;
  });
  levelList.innerHTML = htmlList;
}

function initBoard(selectedLevel = 0) {
  const BASE = JSON.parse(localStorage.getItem('globalOptions'));
  const board = document.getElementById('Board');

  let htmlList = ``;
  for (let i = 0; i < (BASE[selectedLevel].field * 3); i++) {
    htmlList += `<div class="board__item"></div>`;
  }
  board.innerHTML = htmlList;
}

function onChangBoard() {
  const selectElement = event.target;
  this.initBoard(selectElement.value);
}


/**
 * Start game
 */
function onStartGame(event) {
  console.log('start', event);
  event.preventDefault();
  // const setting = this.gameSettings.value;
  // this.destroyStream$.next();

  // const randomSquaresArr = this.randomSquares();
  // const settingDelay = setting.level.delay;

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

function randomSquares() {
  const min = 0;
  const maxNumberSquares = this.chipboardSquares.length;

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

