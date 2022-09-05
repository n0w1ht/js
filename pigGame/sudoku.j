function sudoku(puzzle) {
  // return the solved puzzle as a 2d array of 9 x 9
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // repeat while there are still 0s
  while (puzzle.flat(Infinity).includes(0)) {
    puzzle.forEach((row, rowIndex) => {
      row.forEach((num, column) => {
        if (num === 0) {
          // adding all the numbers in current row in a collection
          const collection = [...puzzle[rowIndex]];
          // adding all the numbers in current column to collection
          puzzle.forEach((secRow) => {
            collection.push(secRow[column]);
          });

          // figuring out the subgrid
          const boxColumnIndexer = Math.floor(column / 3) * 3;
          const boxRowIndexer = Math.floor(rowIndex / 3) * 3;
          const boxRow = [boxRowIndexer, boxRowIndexer + 1, boxRowIndexer + 2];
          const boxColumn = [
            boxColumnIndexer,
            boxColumnIndexer + 1,
            boxColumnIndexer + 2,
          ];
          // adding the numbers in the relevant subgrid
          boxRow.forEach((x) => {
            boxColumn.forEach((y) => {
              collection.push(puzzle[x][y]);
            });
          });

          // now that we gathered all relevant nums, lets tidy up the result by turning
          // our array into a set
          const finalCollection = new Set(collection);

          // we need minimum 9 distinct numbers (including 0) in order to figure out the answer.
          // if we have them lets figure out what number is missing from [1..9]
          if (finalCollection.size === 9) {
            [puzzle[rowIndex][column]] = [
              ...nums.filter((i) => !finalCollection.has(i)),
            ];
          }
        }
      });
    });
  }
  return puzzle;
}

sudoku([
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
]);
