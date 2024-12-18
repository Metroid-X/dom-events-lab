/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button');
const calculator = document.querySelector('#calculator');
const display = document.querySelector('.main-display');
const cachedDisplay = document.querySelector('.mini-display');
const ops={
    '+': add=(num1,num2)=>{
        return parseInt(num1)+parseInt(num2);
    },
    '-': sub=(num1,num2)=>{
        return parseInt(num1)-(parseInt(num2));
    },
    '*': mul=(num1,num2)=>{
        return parseInt(num1)*parseInt(num2);
    },
    '/': div=(num1,num2)=>{
        return parseInt(num1)/parseInt(num2);
    },
    '=': eql=(num1,num2)=>{
        let result;
        switch(cachedOp[0]){
            case '+':
                result = ops['+'](num1,num2);
                break;
            case '-':
                result = ops['-'](num1,num2);
                break;
            case '*':
                result = ops['*'](num1,num2);
                break;
            case '/':
                result = ops['/'](num1,num2);
                break;
            default:
                result = num2;
        }
        return result;
    },
}
/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/
let cachedOp=[];
let currentNum='0';
let cachedNum='0';
let nextCachedNum='0';
let currentNumArr=[currentNum];
let cachedNumArr=[cachedNum];
/*-------------------------------- Functions --------------------------------*/
const drawCurrent = () => {
    let tmpNum = ''
    if(currentNumArr.length>1 && currentNumArr[0]==0){
        
        currentNumArr.shift();

    };
    currentNumArr.forEach((char)=>{
        tmpNum+=`${char}`;
    });
    
    currentNum=tmpNum;
    display.innerHTML=currentNum;
    
    tmpNum=''

    if(cachedNumArr.length>1 && cachedNumArr[0]==0){
        
        cachedNumArr.shift();

    };
    cachedNumArr.forEach((char)=>{
        tmpNum+=`${char}`;
    });
    
    cachedNum=tmpNum;

    tmpNum=''

    if(cachedOp[0]===undefined){
        cachedDisplay.innerHTML='nxt :  '+currentNum;
    }else if(cachedOp[1]===undefined){
        // if(currentNum==0){
            // nextCachedNum=ops[cachedOp[1]](cachedNum,currentNum);
            // if(nextCachedNum==NaN||Infinity){
                // display.innerHTML='ERROR'
                // cachedDisplay.innerHTML='ERROR'
            // }else{
                // cachedDisplay.innerHTML=nextCachedNum+' '+cachedOp[0]+' '+currentNum;
            // }
        // }else{
            
        // }
    }else if(cachedOp[1]!==undefined){
        
        nextCachedNum=ops[cachedOp[1]](cachedNum,currentNum);
        if(nextCachedNum.typeof===undefined){
            display.innerHTML='ERROR'
            cachedDisplay.innerHTML='ERROR'
        }else{
            display.innerHTML=nextCachedNum;
            cachedNum=nextCachedNum;
            cachedDisplay.innerHTML='nxt :  '+cachedNum+' '+cachedOp[0]+' '+currentNum+' '+cachedOp[1]+' '+nextCachedNum;
            cachedNumArr=cachedNum.toString().split('') 
        
        }  
        
    }
    
    if(cachedOp[0]!==undefined){
        nextCachedNum=ops[cachedOp[0]](cachedNum,currentNum);
        cachedDisplay.innerHTML='nxt :  '+cachedNum+' '+cachedOp[0]+' '+currentNum+' = '+nextCachedNum;
    }
    
};

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
    // This log is for testing purposes to verify we're getting the correct value
    
    if (event.target.classList.contains('number')) {
        currentNumArr.push(parseInt(event.target.innerText));
    }else if(event.target.id!=='calculator' && event.target.classList.contains('operator')){
        if(currentNum==0||cachedOp[0]===undefined||event.target.innerHTML!==cachedOp[0]){
            cachedOp[0]=event.target.innerText;
        }
        if(currentNum!=0){
            cachedNumArr=currentNumArr;
            currentNumArr=[0];
        }
        if(event.target.innerHTML==='C'){
            
            cachedOp=[]
            currentNum='0';
            cachedNum='0';
            nextCachedNum='0';
            currentNumArr=[currentNum]
            cachedNumArr=[cachedNum]
        }
        
    }else if(event.target.classList.contains('equals')){
        cachedOp[1]=event.target.innerText;
    }
    


    
    drawCurrent();
    
    cachedOp[1]=undefined;

    console.log(currentNumArr);
    console.log(cachedOp);
    console.log(cachedNumArr);
    console.log(cachedNum,cachedOp[0],currentNum,cachedOp[1],nextCachedNum);
    });
});

calculator.addEventListener('click', (event) => {
    // This log is for testing purposes to verify we're getting the correct value
    // You have to click a button to see this log
    // console.log(event.target.innerText);

    // Example
    // if(event.target.classList.contains('button')){
    //     if (event.target.classList.contains('number')) {
    //         currentNumArr.push(parseInt(event.target.innerText));
    //     }else if(event.target.id!=='calculator' && event.target.classList.contains('operator')){
    //         if(currentNum==0||cachedOp[0]===undefined){
    //             cachedOp[0]=event.target.innerText;
    //         }else{
    //             cachedOp[1]=event.target.innerText;

    //         }
    //         if(currentNum!=0){
    //             cachedNumArr=currentNumArr;
    //             currentNumArr=[0];
    //         }
            
            
    //     }else if(event.target.classList.contains('equals')){
            
    //         cachedOp[1]=event.target.innerText;
    //     }
    // }


    
    // drawCurrent(event.target.classList.contains('button')&&(event.target.classList.contains('number')||(!event.target.classList.contains('operator')||!event.target.classList.contains('equals'))));
    
    // console.log(currentNumArr);
    // console.log(cachedOp);
    // console.log(cachedNumArr);
    // console.log(cachedNum,cachedOp[0],currentNum,cachedOp[1],nextCachedNum);
});
drawCurrent();