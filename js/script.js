/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

let newNum = false; // Nytt nummer på displayen
let operatorOn = false;

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner


    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);
    } else if(btn.substring(0, 2) === 'co') { // Inte en siffertangent, övriga tangenter.
        addComma();
    } else if(btn.substring(0, 2) === 'cl') {
        clearLCD();
    } else if(btn.substring(0, 1) === 'e') {
        calculate();
    } else {
        setOperator(btn.substring(0, 1));
        if(e.target.tagName === 'BUTTON') {
            e.target.style.backgroundColor = 'lightgrey';
        }
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    if(newNum) {
        clearLCD();
        newNum = false;
    }
    lcd.value += digit;
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    lcd.value += '.';
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator){
    if(operator === 'a') {
        arithmetic = '+';
    } else if(operator === 's') {
        arithmetic = '-';
    } else if(operator === 'm') {
        arithmetic = '*';
    } else if(operator === 'd') {
        arithmetic = '/';
    }

    if(operatorOn) {
        calculate();
    }
    operatorOn = true;
    memory = parseFloat(lcd.value);
    newNum = true;
}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    if(arithmetic === '+') {
        lcd.value = memory + parseFloat(lcd.value);
    } else if(arithmetic === '-') {
        lcd.value = memory - parseFloat(lcd.value);
    } else if(arithmetic === '*') {
        lcd.value = memory * parseFloat(lcd.value);
    } else if(arithmetic === '/') {
        lcd.value = memory / parseFloat(lcd.value);
    }
    document.getElementById('div').style = 'initial';
    document.getElementById('mul').style = 'initial';
    document.getElementById('sub').style = 'initial';
    document.getElementById('add').style = 'initial';
    operatorOn = false;
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear(){
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;
