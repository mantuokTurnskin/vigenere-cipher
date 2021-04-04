class VigenereCipheringMachine {
  constructor(language = 'eng', reverse = false) {
    this.reverse = reverse;
    this.language = language;
  }

  encrypt(str, cipher) {
    if (language === 'eng') {
      cipher = cipher.toUpperCase().split('').filter(elem => (elem.charCodeAt() >= 65 && elem.charCodeAt() <= 90)).join('');
    }
    else {
      cipher = cipher.toUpperCase().split('').filter(elem => (elem.charCodeAt() >= 1040 && elem.charCodeAt() <= 1071)).join('');
    }
    if (cipher === '') return str.toUpperCase();
    str = str.toUpperCase().split('').map(elem => elem.charCodeAt());
    cipher = cipher.repeat(Math.ceil(str.length / cipher.length)).slice(0, str.length).split('').map(elem => elem.charCodeAt());
    let result = [];
    let count = 0;
    if (language === 'eng') {
      str.forEach((elem, index) => {
        if (elem < 65 || elem > 90) {
          result.push(elem);
          count++;
        } else result.push((elem + cipher[index - count] - 130) % 26 + 65);
      });
    }
    else {
      str.forEach((elem, index) => {
        if (elem < 1040 || elem > 1071) {
          result.push(elem);
          count++;
        } else result.push((elem + cipher[index - count] - 2080) % 31 + 1040);
      });
    }
    return (!this.reverse) ? result.map(elem => String.fromCharCode(elem)).join('') : result.map(elem => String.fromCharCode(elem)).reverse().join('');
  }

  decrypt(str, cipher) {
    if (language === 'eng') {
      cipher = cipher.toUpperCase().split('').filter(elem => (elem.charCodeAt() >= 65 && elem.charCodeAt() <= 90)).join('');
    }
    else {
      cipher = cipher.toUpperCase().split('').filter(elem => (elem.charCodeAt() >= 1040 && elem.charCodeAt() <= 1071)).join('');
    }
    if (cipher === '') return str.toUpperCase();
    str = str.toUpperCase().split('').map(elem => elem.charCodeAt());
    str = (!this.reverse) ? str : str.reverse();
    cipher = cipher.toUpperCase().repeat(Math.ceil(str.length / cipher.length)).slice(0, str.length).split('').map(elem => elem.charCodeAt());
    let result = [];
    let count = 0;
    if (language === 'eng') {
      str.forEach((elem, index) => {
        if (elem < 65 || elem > 90) {
          result.push(elem);
          count++;
        } else result.push(65 + (elem + 26 - cipher[index - count]) % 26);
      });
    }
    else {
      str.forEach((elem, index) => {
        if (elem < 1040 || elem > 1071) {
          result.push(elem);
          count++;
        } else result.push(1040 + (elem + 31 - cipher[index - count]) % 31);
      });
    }
    return result.map(elem => String.fromCharCode(elem)).join('');
  }
}
// события изменения темы
const styleFile = document.querySelector('#head-theme')
const lightTheme = document.querySelector('#light-theme');
const darkTheme = document.querySelector('#dark-theme');
lightTheme.addEventListener('click', () => {
  darkTheme.classList.remove('theme-btn_active');
  lightTheme.classList.add('theme-btn_active');
  styleFile.href = 'light-theme.css';
})
darkTheme.addEventListener('click', () => {
  lightTheme.classList.remove('theme-btn_active');
  darkTheme.classList.add('theme-btn_active');
  styleFile.href = 'dark-theme.css';
})

// события slider
let reverse = false;
const sliderReverse = document.querySelector('#slider-reverse');
const statusReverse = sliderReverse.querySelector('.slider__check');
statusReverse.classList.forEach(elem => {
  if (elem === 'slider__check_on') reverse = true;
});
sliderReverse.addEventListener('click', () => {
  reverse = reverse ? false : true;
  if (reverse === true) {
    statusReverse.classList.remove('slider__check_off');
    statusReverse.classList.add('slider__check_on')
  }
  else {
    statusReverse.classList.remove('slider__check_on');
    statusReverse.classList.add('slider__check_off')
  }
});

let language = 'eng';
const sliderLang = document.querySelector('#slider-lang');
const statusLang = sliderLang.querySelector('.slider__check');
statusLang.classList.forEach(elem => {
  if (elem === 'slider__check_on') language = 'ru';
});
sliderLang.addEventListener('click', () => {
  language = (language === 'eng') ? 'ru' : 'eng';
  if (language === 'ru') {
    statusLang.classList.remove('slider__check_off');
    statusLang.classList.add('slider__check_on')
  }
  else {
    statusLang.classList.remove('slider__check_on');
    statusLang.classList.add('slider__check_off')
  }
});

// событие клика по encrypt
class ParamCollection {
  constructor() {
    this.cipher = document.querySelector('#cipher');
    this.source = document.querySelector('#source');
    this.result = document.querySelector('#result');
  }
}
const encrypt = document.querySelector('#encrypt');
encrypt.addEventListener('click', () => {
  const pc = new ParamCollection();
  const encryptOperation = new VigenereCipheringMachine(language, reverse);
  pc.result.value = encryptOperation.encrypt(pc.source.value, pc.cipher.value);
})

const decrypt = document.querySelector('#decrypt');
decrypt.addEventListener('click', () => {
  const pc = new ParamCollection();
  const decryptOperation = new VigenereCipheringMachine(language, reverse);
  pc.source.value = decryptOperation.decrypt(pc.result.value, pc.cipher.value);
})

// события копирования и вставки
const source = document.querySelector('#source');
const sourceCopy = document.querySelector('#source-copy');
const sourcePaste = document.querySelector('#source-paste');
const result = document.querySelector('#result');
const resultCopy = document.querySelector('#result-copy');
const resultPaste = document.querySelector('#result-paste');

sourceCopy.addEventListener('click', () => {
  source.focus();
  source.select();
  document.execCommand('copy');
});

resultCopy.addEventListener('click', () => {
  result.focus();
  result.select();
  document.execCommand('copy');
});
