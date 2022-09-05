class RomanNumeralsClass {
  
  toRoman(num) {
  const numerals = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      };
    let result = "";

     for (const numeral in numerals) {
       result = result.concat(
         numeral.repeat(Math.floor(num / Number(numerals[numeral])))
        );
        num -=
          Math.floor(num / Number(numerals[numeral])) * Number(numerals[numeral]);
     }
     return result;
   }
  
  fromRoman (str) {
    const numerals = {
          M: 1000,
          CM: 900,
          D: 500,
          CD: 400,
          C: 100,
          XC: 90,
          L: 50,
          XL: 40,
          X: 10,
          IX: 9,
          V: 5,
          IV: 4,
          I: 1,
        };
    const IVCheck = str.includes('IV');
    const sum = str.split('').reduce((acc,item,index) => acc += numerals[item],0);
    return IVCheck ? sum -2 : sum;
  }
}

const RomanNumerals = new RomanNumeralsClass;
console.log(RomanNumerals.toRoman(395));
console.log(RomanNumerals.fromRoman('MXXIV'));
