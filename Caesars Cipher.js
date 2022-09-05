function rot13(str) {
  return str
    .split("")
    .map((char) => {
      if (![".", "?", "!", ",", " "].includes(char)) {
        if (char.charCodeAt() < 78) {
          return String.fromCharCode(91 - (78 - char.charCodeAt()));
        } else {
          return String.fromCharCode(char.charCodeAt() - 13);
        }
      } else {
        return char;
      }
    })
    .join("");
}

rot13("SERR PBQR PNZC");
