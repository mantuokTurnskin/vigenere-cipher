class VigenereCipheringMachine {
    constructor(unrev = true){
      this.unrev = unrev;
    }
  
    encrypt(str, cipher) {
      str = str.toUpperCase().split('').map(elem => elem.charCodeAt());
      cipher = cipher.toUpperCase().repeat(Math.ceil(str.length / cipher.length)).slice(0, str.length).split('').map(elem => elem.charCodeAt());
      let result = [];
      let count = 0;
      str.forEach((elem, index) => {
        if (elem < 65 || elem > 90) {
          result.push(elem);
          count++;
        }
        else result.push((elem + cipher[index - count] - 130) % 26 + 65);
      });
      return (this.unrev)? result.map(elem => String.fromCharCode(elem)).join('') : result.map(elem => String.fromCharCode(elem)).reverse().join('');
    }
  
    decrypt(str, cipher) {
      str = str.toUpperCase().split('').map(elem => elem.charCodeAt());
      cipher = cipher.toUpperCase().repeat(Math.ceil(str.length / cipher.length)).slice(0, str.length).split('').map(elem => elem.charCodeAt());
      let result = [];
      let count = 0;
      str.forEach((elem, index) => {
        if (elem < 65 || elem > 90) {
          result.push(elem);
          count++;
        }
        else result.push(65 + (elem + 26 - cipher[index - count]) % 26);
      });
      return (this.unrev)? result.map(elem => String.fromCharCode(elem)).join(''): result.map(elem => String.fromCharCode(elem)).reverse().join('');
    }
  }

