function VigenèreCipher(key, abc) {
  this.encode = function (str) {
    return str
      .split("")
      .map((char, index) => {
        if (abc.indexOf(char) === -1) return char;
        if (key.length < str.length)
          key = key.repeat(Math.trunc(str.length / key.length) + 1);
        const indexOfStringLetter = abc.indexOf(char);
        const indexOfPasswordLetter = abc.indexOf(key[index]);
        const indexSum = indexOfPasswordLetter + indexOfStringLetter;
        return indexSum >= abc.length
          ? abc[indexSum - abc.length]
          : abc[indexSum];
      })
      .join("");
  };
  this.decode = function (str) {
    return str
      .split("")
      .map((char, index) => {
        if (abc.indexOf(char) === -1) return char;
        if (key.length < str.length)
          key = key.repeat(Math.trunc(str.length / key.length) + 1);
        const indexOfStringLetter = abc.indexOf(char);
        const indexOfPasswordLetter = abc.indexOf(key[index]);
        const indexDiff = indexOfStringLetter - indexOfPasswordLetter;
        return indexDiff < 0 ? abc[abc.length + indexDiff] : abc[indexDiff];
      })
      .join("");
  };
}
