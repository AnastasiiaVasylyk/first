console.log("Чтобы начать напиши комманду - calculator('');");
console.log("а внутри скобок и кавычек, запиши, что нужно посчитать.");
console.log('');
console.log("Например: calculator('8 - 3');");
console.log("Или: calculator('V + IV');");
console.log("ПИШИ ПОД ЭТОЙ СТРОКОЙ");
//calculator-main function
function calculator(str) {
// внутри функции калькулятор, я создала несколько малкньких функций 
// и поочередно их запустила в самом низу

// ------------to array--------function  из строки получили массив
function convertToArr(string) {
    let array = string.split(' ');
    return array 
}

//------------convertor------------function из римских в арабские 
let numbersObj = {
    'I': 1,
    'V': 5,
    'X': 10,
    'II': 2,
    'IV': 4,
    'VI': 6,
    'IX': 9,
    'III': 3,
    'VII': 7,
    'VIII': 8,
};

function convertToArabNum(stringTest) { 
    for(let key in numbersObj) {
      if (key.includes(stringTest)) {
        let num = numbersObj[key];
        return num;
      }
    }
    return +stringTest
}

//------------calculator------------function посчитали
function calc(a, b, c) {
    switch (b) {
      case '+' : 
      res = a + c;
      break;
      case '-' : 
      res = a - c;
      break;
      case '*' : 
      res = a * c;
      break;
      case '/' : 
      res = parseInt(a / c);
      break;
      default : 
      res = 'incorrect';
      break;
    }
    return res
}

//конвертируем в римские------------convertor to roman function 
// обьект для поиска совпадений 
let numbers = {
    'I': 1,
    'IV': 4,
    'V': 5,
    'IX': 9,
    'X': 10,
    'XL': 40,
    'L': 50,
    'XC': 90,
    'C': 100,
  };

//------------convertor to roman------------function  конвертируем единицы
let keyArr = [];

function conwertToRomanUnit(a) {
  if (a < 1) {
    return ''
  }
  for(let key in numbers) {
  
    if (numbers[key] == a) {
      keyArr.unshift(key);
      let roman = keyArr.join('');
      keyArr = [];
      return roman;
    }

  }
  
  a = a - 1;
  keyArr.unshift('I');
  return conwertToRomanUnit(a);
}
//------------
function separateToTen(tenNumb) {
    tenNumb = String(tenNumb);
    return tenNumb[0] * 10
  }
  
  function separateToUnit(tenNumb) {
    tenNumb = String(tenNumb);
    return +tenNumb[1]
  }

//------------convertor to roman------------function  конвертируем десятки
let keyArrTen = [];

function conwertToRomanTen(a) {
  for(let key in numbers) {
  
    if (numbers[key] == a) {
      keyArrTen.unshift(key);
      let romanTen = keyArrTen.join('');
      keyArrTen = [];
      return romanTen;
    }

  }
  
  a = a - 10;
  keyArrTen.unshift('X');
  return conwertToRomanTen(a);
}

//------------convertor to roman------------function  собрали все вместе
function conwertToRoman(stringArabicNum) {
  if (stringArabicNum === 'incorrect') {
    throw 'выражение записано некорректно'
  }
  let arabicNum = Number(stringArabicNum);

  if(arabicNum == 100) {
    return 'C'
  } else if (arabicNum < 100 && (arabicNum >= 10)) {
    return conwertToRomanTen(separateToTen(stringArabicNum)) + conwertToRomanUnit(separateToUnit(stringArabicNum))
  } else if (arabicNum < 10 && (arabicNum > 0)) {
    return conwertToRomanUnit(arabicNum)
  }  
  return ''
}

//поочередно запускаем функции-----------------------------------------------    
  if (isFinite(str)) { 
    throw 'введен не строчный тип данных'
  }
  let array = convertToArr(str);

  if (array.length > 3) {
    throw 'формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)'
  } else if (array.length < 3) {
    throw 'строка не является математической операцией'
  } else if (isNaN(+array[0]) && +array[2] >= 0 || +array[0] >= 0 && isNaN(+array[2])) {
    throw 'выражение записано некорректно'
  } else if (+array[0] > 10 || +array[0] <= 0 || +array[2] > 10 || +array[2] <= 0) {
    throw 'Операнды должны лежать в диапазоне от 1 до 10 включительно, без ноля'//--------------------------------------
  }
  let a = convertToArabNum(array[0]);
  let b = array[1];
  let c = convertToArabNum(array[2]);

  if (Number.isInteger(+a) && Number.isInteger(+c)) {
    let result = calc(a, b, c);
    if (isNaN(+array[0])) {
      return conwertToRoman(result) 
    } else if (result === 'incorrect') {
        throw 'выражение записано некорректно'
    }
    return String(result)
  }
  throw 'Калькулятор умеет работать только с целыми числами'
}