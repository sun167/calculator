    //calcule operators
function add(a,b) {return a+b;}
function substract(a,b) {return a-b;}
function multiply(a,b) {return a*b;}
function divide(a,b) {return a/b;}
function operate(operator,a,b){
  let result = 0;
  if (a == "" || b == "") return;
  a *= 1;//turn string to number
  b *= 1;
  if (operator == "+") result = add(a,b);
  if (operator == "-") result = substract(a,b);
  if (operator == ":") result = divide(a,b);
  if (operator == "x") result = multiply(a,b);
  return Math.round(result * 100) / 100;//round the result up to 2 decimals
}

function clear() {
 opTag = "";
 opTagMulDiv ="";
 currentNum ="";
 firstNum ="";
 secondNum ="";
 
}

let opTag = ""; // to store current operator
let opTagMulDiv ="";// to store an operator exception
let currentNum ="";//to store the displayed number
let firstNum ="";//
let secondNum ="";//used for exception cases

const display = document.querySelector(".display");

//numbers button
const basicButtons = document.querySelectorAll(".basic");
  for (let i = 0; i < basicButtons.length; i++){
    let nameTag = basicButtons[i].innerHTML;
    basicButtons[i].addEventListener("click", event => {
      if (currentNum.indexOf(".")>= 0 && nameTag == ".") nameTag = "";
      
      currentNum += nameTag;
      
      if (/^0/.test(display.innerHTML)) {currentNum = nameTag}
      
      display.innerHTML = currentNum;

      if (opTagMulDiv != "") {// 2 + 3 * 5 -> finished route
        let exception1 = operate(opTagMulDiv,secondNum, currentNum); //3*5
        display.innerHTML = operate(opTag,firstNum,exception1)// 2+ (3*5) -> display this
        console.log(opTagMulDiv,currentNum, secondNum);
        clear();
        firstNum = display.innerHTML; // store 17
      } 
      
    })
  

}

//operators button
const plusMinusButtons = document.querySelectorAll(".plus-minus");
for (let i =0 ; i< plusMinusButtons.length; i++){
  plusMinusButtons[i].addEventListener("click", event => {
    let nameTag = plusMinusButtons[i].innerHTML;
    if (opTag == "+" || opTag == "-") {//2+3+ -> finished route
      display.innerHTML = operate(opTag,firstNum,currentNum); //2+3=5 -> display 5
      clear();
      
    }
    currentNum ="";
    firstNum = display.innerHTML;
    opTag = nameTag;
    console.log(firstNum, secondNum, currentNum)
  })
}

const mulDivButtons = document.querySelectorAll(".mul-div");
for (let i =0 ; i< mulDivButtons.length; i++){
  mulDivButtons[i].addEventListener("click", event => {
    
    let nameTag = mulDivButtons[i].innerHTML;
    if (opTag == "+" || opTag == "-") {//2+3x -> firstNum = 2, opTag = +
      opTagMulDiv = nameTag; //opTagMulDiv = *
      secondNum = display.innerHTML; // secondNum = 3
    }
    if (opTag == "x" || opTag ==":") { // 2 * 5-> finished route
      display.innerHTML = operate(opTag,firstNum,currentNum);// 2*5 = 10 -> display 10
      clear();
      firstNum = display.innerHTML;//store 10
      opTag = nameTag;//store current operator 10 * 
    }
       
    else {//2*
      firstNum = display.innerHTML;
      opTag =nameTag;
    }
    currentNum ="";
    console.log(firstNum, secondNum, currentNum)
  })
 

}
//clear button
const clearButton = document.querySelector(".redo");
clearButton.addEventListener("click", event => {
    clear();
    display.innerHTML = "";
});
//back button
const backButton = document.querySelector(".back");
backButton.addEventListener("click", event => {
  currentNum = currentNum.substring(0,currentNum.length -1);
  display.innerHTML = currentNum;
})
//result button
const result = document.querySelector(".result");
result.addEventListener("click", event => {
    if (!firstNum || !opTag) return;
    currentNum = display.innerHTML;
    display.innerHTML = operate(opTag, firstNum, currentNum);
    clear();
    firstNum = display.innerHTML;
    console.log(firstNum, secondNum, currentNum)
})

  
