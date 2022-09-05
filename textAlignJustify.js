"use strict";

function justify(text, width) {
  const splitText = text.split(" ");
  let CharsInLine = "";
  let finalText = "";

  for (
    let i = 0;
    CharsInLine.length <= width && i <= splitText.length - 1;
    i++
  ) {
    if (CharsInLine.length + splitText[i].length + 1 <= width) {
      CharsInLine += ` ${splitText[i]} `;
      CharsInLine = CharsInLine.trim();

      if (i === splitText.length - 1) {
        finalText += `${CharsInLine}`;
      }
    } else {
      let numOfSpaces = 1;
      const spaces = " ";
      let regexp = new RegExp(`(?<=\\S)${spaces.repeat(numOfSpaces)}(?=\\S)`);
      while (CharsInLine.length < width) {
        if (!CharsInLine.match(regexp)) numOfSpaces++;
        regexp = new RegExp(`(?<=\\S)${spaces.repeat(numOfSpaces)}(?=\\S)`);
        CharsInLine = CharsInLine.replace(
          regexp,
          `${spaces.repeat(numOfSpaces)} `
        );
      }
      finalText += `${CharsInLine}\n`;
      CharsInLine = splitText[i] ?? "";

      if (i === splitText.length - 1) {
        finalText += `${CharsInLine}`;
      }
    }
  }
  return finalText;
}

const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.";

justify(LIPSUM, 30);
