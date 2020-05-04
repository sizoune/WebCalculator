class Calculator{
    constructor(prevOperandText,currOperandText){
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        this.clearAC();
    }
    
    clearAC(){
        //default state
        this.justStart = true;
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }
    
    delete(){
        this.currOperand = this.currOperand.toString().slice(0,-1);
    }
    
    addNumberTextToDisplay(number){
        if (this.justStart){
            if(number === '.'){
                this.currOperand = '0'+number;
            } else {
                this.currOperand = number;
            }
            this.justStart = false;
        } else{
            //check character so only 1 '.' can be added to display
            if(number === '.' && this.currOperand.includes('.')) return
            this.currOperand += number;
        }
    }
    
    chooseOperand(operation){
        //check if user click operand for first time, then do nothing
        if(this.currOperand === '') return;
        
        //check if prevOperand alrdy have value, than do calculation with current value
        if(this.prevOperand !== ''){
            this.compute();
        }
        
        this.operation = operation;
        this.prevOperand = this.currOperand + this.operation;
        this.currOperand = ''
        this.justStart = true;
    }
    
    compute(){
        var result;
        const prevValue = parseFloat(this.prevOperand);
        const currValue = parseFloat(this.currOperand);
        
        //check if user click equal for first time
        if(isNaN(prevValue) || isNaN(currValue)) return;
        
        switch (this.operation){
            case '+':
                result = prevValue + currValue;
                break;
            case '-':
                result = prevValue - currValue;
                break;
            case '/':
                result = prevValue / currValue;
                break;
            case '*':
                result = prevValue * currValue;
                break;
            default:
                return;
        }
        
        this.currOperand = result;
        this.operation = undefined;
        this.prevOperand = '';
    }
    
    doFormatNumber(number){
        const stringTemp = number.toString();
        const intDigit = parseFloat(stringTemp.split('.')[0]);
        const decDigit = stringTemp.split('.')[1];
        var result;

        if (isNaN(intDigit)){
            result = '';
        } else {
            result = intDigit.toLocaleString('en',{maximumFractionDigits: 0});
        }

        if(decDigit != null) {
            return `${result}.${decDigit}`;
        } else {
            return result;
        }
    }
    
    updateDisplay(){
        this.currOperandText.innerHTML = this.doFormatNumber(this.currOperand);
        this.prevOperandText.innerHTML = this.doFormatNumber(this.prevOperand);
    }
}


const btnNumbers = document.querySelectorAll('[data-number]');
const btnOperations = document.querySelectorAll('[data-operand]');
const btnEquals = document.querySelector('[data-equals]');
const btnDelete = document.querySelector('[data-delete]');
const btnAC = document.querySelector('[data-clear]');
const prevOperandText = document.querySelector('[data-prev-operand]');
const currOperandText = document.querySelector('[data-curr-operand]');

const calcObject = new Calculator(prevOperandText,currOperandText);
console.log(btnAC);

btnNumbers.forEach(button => {
    button.addEventListener('click',()=>{
        console.log(button.value);
        calcObject.addNumberTextToDisplay(button.value)
        calcObject.updateDisplay()
    })
})

btnOperations.forEach(button => {
    button.addEventListener('click',()=>{
        console.log(button.value);
        calcObject.chooseOperand(button.value)
        calcObject.updateDisplay()
    })
})

btnEquals.addEventListener('click',()=>{
    calcObject.compute();
    calcObject.updateDisplay();
})

btnAC.addEventListener('click',()=>{
    calcObject.clearAC();
    calcObject.updateDisplay();
})

btnDelete.addEventListener('click',()=>{
    calcObject.delete();
    calcObject.updateDisplay();
})
