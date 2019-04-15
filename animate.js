const GAME_LENGTH = 60;

////
var isPlaying = false;
var temp = document.querySelector('.time');
var button = document.querySelector('button');
var words = document.querySelector('.words');
var timerDiv = document.querySelector('.time');
var scoreDiv = document.querySelector('.score');
var wrapper = document.querySelector('.wrapper');
var points = 0;
var spans;
var typed;
var seconds = GAME_LENGTH;

timerDiv.innerHTML = seconds;

function countdown() {
  points = 0;
  var timer = setInterval(function() {
    button.disabled = true;
    seconds--;
    temp.innerHTML = seconds;
    if (seconds === 0) {
      handleGameOverModal('Game over! Your score is ' + points);
      scoreDiv.innerHTML = '0';
      words.innerHTML = '';
      button.disabled = false;
      clearInterval(timer);
      seconds = GAME_LENGTH;
      timerDiv.innerHTML = GAME_LENGTH;
      button.disabled = false;
    }
  }, 1000);
}

function random() {
  words.innerHTML = '';
  var random = Math.floor(Math.random() * list.length);
  var wordArray = list[random].split('');
  for (var i = 0; i < wordArray.length; i++) {
    //building the words with spans around the letters
    var span = document.createElement('span');
    span.classList.add('span');
    span.innerHTML = wordArray[i];
    words.appendChild(span);
  }
  spans = document.querySelectorAll('.span');
}

const list = [
  'APPLE',
  'EYES',
  'WILL',
  'MONEY',
  'LOVE',
  'HAPPY',
  'CREATIVITY',
  'ACCOUNT',
  'ACCURATE',
  'DEFINATELY',
  'GOVERMENT',
  'GOVERNMENT',
  'ACCOMODATE',
  'ACCOMONDATE',
  'OCCURRED',
  'OCCURED',
  'DABYJJEW',
  'EWAVTHE',
  'RECIEVE',
  'PUBLICALLY',
  'WJEFUWEH',
  'WJEFIWEH',
  'IWEJFW',
  'ACCEPTABLE',
  'SUFFIX',
  'ACCIDENTALLY',
  'ACCOMMODATE',
  'ACQUIRE',
  'ACQUIT',
  'ALLOT',
  'AMATEUR',
  'APPARENT',
  'ARGUMENT',
  'ATHEIST',
  'BELIEVE',
  'BELLWETHER',
  'CALENDAR',
  'CATEGORY',
  'CEMETERY',
  'CHANGEABLE',
  'COLLECTIBLE',
  'COLUMN',
  'COMMITTED',
  'CONSCIENCE',
  'CONSCIENTIOUS',
  'CONSCIOUS',
  'CONSENSUS',
  'DAIQUIRI',
  'DEFINITELY',
  'DISCIPLINE',
  'DRUNKENNESS',
  'DUMBBELL',
  'EMBARRASSMENT',
  'EQUIPMENT',
  'EXHILARATE',
  'EXCEED',
  'EXISTENCE',
  'MISSPELL',
  'NEIGHBOR',
  'NOTICEABLE',
  'OCCASIONALLY',
  'OCCURRENCE',
  'PASTIME',
  'PERSEVERANCE',
  'PERSONNEL',
  'PLAYWRIGHT',
  'POSSESSION',
  'PRECEDE',
  'PRINCIPAL',
  'PRIVILEGE',
  'PRONUNCIATION',
  'PUBLICLY',
  'QUESTIONNAIRE',
  'RECEIPT',
  'RECOMMEND',
  'REFERRED',
  'DIPHTHONG',
  'REFERENCE',
  'RELEVANT',
  'RHYME',
  'RHYTHM',
  'SCHEDULE',
  'SEPARATE',
  'SERGEANT',
  'SUPERSEDE',
  'THEIR',
  'THERE',
  'THRESHOLD',
  'TWELFTH',
  'TYRANNY',
  'UNTIL',
  'VACUUM',
  'WEATHER',
  'WEIRD'
];

button.addEventListener('click', function(e) {
  countdown();
  random();
  button.disabled = true;
  isPlaying = true;
});

function deleting(e) {
  if (!isPlaying) {
    return;
  }
  if (e.key === 'Backspace') {
    points--;
    scoreDiv.innerHTML = points;
  }
}

function typing(e) {
  if (!isPlaying) {
    return;
  }
  typed = String.fromCharCode(e.which);
  for (var i = 0; i < spans.length; i++) {
    if (spans[i].innerHTML === typed) {
      // if typed letter is the one from the word
      if (spans[i].classList.contains('bg')) {
        // if it already has class with the bacground color then check the next one
        continue;
      } else if (
        (spans[i].classList.contains('bg') === false &&
          spans[i - 1] === undefined) ||
        spans[i - 1].classList.contains('bg') !== false
      ) {
        // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
        spans[i].classList.add('bg');
        break;
      }
    }
  }
  var checker = 0;
  for (var j = 0; j < spans.length; j++) {
    //checking if all the letters are typed
    if (spans[j].className === 'span bg') {
      checker++;
    }
    if (checker === spans.length) {
      // if so, animate the words with animate.css class
      words.classList.add('animated');
      words.classList.add('fadeOut');
      points++; // increment the points
      if (Math.random() > 0.5) {
        wrapper.classList.toggle('rotate-180');
      }
      scoreDiv.innerHTML = points; //add points to the points div
      document.removeEventListener('keydown', typing, false);
      setTimeout(function() {
        words.className = 'words'; // restart the classes
        random(); // give another word
        document.addEventListener('keydown', typing, false);
      }, 400);
    }
  }
}

document.addEventListener('keydown', typing);
document.addEventListener('keydown', deleting);

const handleGameOverModal = content => {
  const modal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: 'Close',
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
      console.log('modal open');
    },
    onClose: function() {
      console.log('modal closed');
    }
  });

  modal.setContent(`<div>${content}</div>`);
  modal.open();
};
