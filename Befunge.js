function interpret(code) {
  const stack = [];
  const matrix = [];
  code.split('\n').forEach(line => matrix.push(line.split('')));

  let a, b, yy, xx;
  let x = 0; 
  let y = 0; 
  let output = ""; 
  let direction = "right"; 
  let stringMode = false;
  
  function typer(char) {
    if ( /\d/.test(char)) {
      return "number";
    } else if (char !== '"' && stringMode) {
      return "char";
    } else if (/\+/.test(char)) {
      return "add";
    } else if (/-/.test(char)) {
      return "subtract";
    } else if (/\*/.test(char)) {
      return "multiply";
    } else if (/\//.test(char)) {
      return "divide";
    } else if (/%/.test(char)) {
      return "modulo";
    } else if (/!/.test(char)) {
      return "not";
    } else if (/`/.test(char)) {
      return "greater";
    } else if (/>/.test(char)) {
      return "right";
    } else if (/</.test(char)) {
      return "left";
    } else if (/\^/.test(char)) {
      return "up";
    } else if (/v/.test(char)) {
      return "down";
    } else if (/\?/.test(char)) {
      return "random";
    } else if (/_/.test(char)) {
      return "horizontalIf";
    } else if (/\|/.test(char)) {
      return "verticalIf";
    } else if (/"/.test(char)) {
      return "stringmode";
    } else if (/:/.test(char)) {
      return "dup";
    } else if (/\\/.test(char)) {
      return "swap";
    } else if (/\$/.test(char)) {
      return "pop";
    } else if (/\./.test(char)) {
      return "outputInt";
    } else if (/,/.test(char)) {
      return "outputChar";
    } else if (/#/.test(char)) {
      return "bridge";
    } else if (/g/.test(char)) {
      return "get";
    } else if (/p/.test(char)) {
      return "put";
    } else if (/&/.test(char)) {
      return "inputInt";
    } else if (/~/.test(char)) {
      return "inputChar";
    } else if (/@/.test(char)) {
      return "end";
    } else if (/ /.test(char)) {
      return " ";}
    else {
      return 0;
    }
  }


  function move(dir, steps=1) {
    if (dir === "random") {
      direction = ["right", "left", "up", "down"][Math.floor(Math.random() * 4)]
    } else if (dir) {
      direction = dir;
    }

    if (direction === "right") {
      x = (x+steps) % matrix[y].length
    } else if (direction === "left") {
      x = Math.abs(x-steps) % matrix[y].length
    } else if (direction === "down") {
      y = (y+steps) % matrix.length
    } else if (direction === "up") {
      y = Math.abs(y-steps) % matrix.length;
    } 
  }



  while (matrix[y][x] !== "@") {
    switch (typer(matrix[y][x])) {
      case 'number':
        stack.push(Number(matrix[y][x]))
        move();
        break;
     
      case 'char':
        if (stringMode) {
          stack.push(matrix[y][x].charCodeAt());
        }
        move();
        break;
     
      case 'add':
        stack.push(stack.pop() + stack.pop());
        move();
        break;
      
      case 'subtract':
        a = stack.pop();
        b = stack.pop();
        stack.push(b-a);
        move();
        break;

      case 'multiply':
        stack.push(stack.pop() * stack.pop());
        move();
        break;

      case 'divide':
        a = stack.pop();
        b = stack.pop();
        a ? stack.push(b/a) : stack.push(0);
        move();
        break;

      case 'modulo':
        a = stack.pop();
        b = stack.pop();
        if (a === 0) {
          stack.push(0);
        } else {
          stack.push(b/a);
        }
        move();
        break;

      case 'not':
        stack.push(stack.pop() ? 0 : 1);
        move();
        break;

      case 'greater':
          a = Number(stack.pop());
          b = Number(stack.pop());
          stack.push((b>a) ? 1 : 0);
          move();
        break;

      case 'right':
        move('right');
        break;

      case 'left':
        move('left');
        break;

      case 'up':
        move('up');
        break;

      case 'down':
        move('down');
        break;

      case 'random':
        move('random');
        break;

      case 'horizontalIf':
        stack.pop() ? move('left') : move('right');
        break;

      case 'verticalIf':
        stack.pop() ? move('up') : move('down');
        
        break;

      case 'stringmode':
        stringMode = !stringMode;
        move();
        break;

      case 'dup':
        stack.length ? stack.push(stack[stack.length-1]) : stack.push(0);
        move();
        break;

      case 'swap':
        if (stack.length === 1) stack.unshift(0);
        a = stack.pop();
        b = stack.pop();
        stack.push(a);
        stack.push(b);
        move();
        break;

      case 'pop':
        stack.pop();
        move();
        break;

      case 'outputInt':
        output += stack.pop();
        move();
        break;

      case 'outputChar':
        output += String.fromCharCode(stack.pop());
        move();
        break;

       case 'bridge':
        move('',2);
        break;

      case ' ':
        move();
        break;

      case 'get':
        yy = stack.pop();
        xx = stack.pop();
        stack.push(matrix[yy][xx].charCodeAt());
        move();
        break;

      case 'put':
        yy = stack.pop();
        xx = stack.pop();
        matrix[yy][xx] = `${String.fromCharCode(stack.pop())}`;
        move();
        break;
    }
  }
  console.log(output);
  return output;
}


// interpret('01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@');
// interpret('08>:1-:v v *_$.@ \n  ^    _$>\\:^')
// interpret('v@.<\n >1^\n>?<^\n >2^')
// interpret('>25*"!dlroW olleH":v\n                v:,_@\n                >  ^')
// interpret('>987v>.v\nv456<  :\n>321 ^ _@')
// interpret('2>:3g" "-!v\\  g30          <\n |!`"&":+1_:.:03p>03g+:"&"`|\n @               ^  p3\\" ":<\n2 2345678901234567890123456789012345678')
