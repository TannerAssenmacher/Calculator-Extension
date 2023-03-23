let label = document.getElementById('display');
let previous = document.getElementById('previous');

let memory = '';
let operator = '';

function display(num)
{
    if (num === '.' && label.innerHTML.includes('.')) return
    label.innerHTML = label.innerHTML + num;
    console.log('innerHtml: ' + label.innerHTML);
}

function Clear()
{
    label.innerHTML = '';
    previous.innerHTML = '';
    memory = '';
}

function del()
{
    let curr = label.innerHTML;

    if(curr.length == 0)
        return;
    else if(curr.length == 1)
        label.innerHTML = '';

    label.innerHTML = curr.slice(0, curr.length - 1);
}

function setOperator(op)
{
    if(label.innerHTML === '') return
    operator = op;

    let txt = label.innerHTML;

    Clear();

    memory = txt;
    previous.innerHTML = memory + " " + op;
}

function Calculate()
{

    var res;
    let val = Number(label.innerHTML);

    memory = Number(memory);

    if(Number.isNaN(memory) || Number.isNaN(val))
    {
        memory = 'Error';
        return;
    }
    
    switch(operator)
    {
        case '+':
            res = memory + val;
            break;
        case '-':
            res = memory - val;
            break;
        case '*':
            res = memory * val;
            break;
        case '/':
            if(val == 0)
            {
                res = 'Error';
                return;
            }
            res = memory / val;
            break;
        case '%':
            if(val == 0 || !Number.isInteger(memory / val))
            {
                res = "Error";
                return;
            }
            res = memory % val;
            break;
        default:
            res = "Error";
            break;
    }

    previous.innerHTML = res;
    label.innerHTML = res;
}

let numberBtns = document.getElementsByClassName('btn-number');
console.log('len = ' + numberBtns.length)
Array.from(numberBtns).forEach(btn => btn.addEventListener('click', function(){display(btn.innerHTML)}));

let operatorBtns = document.getElementsByClassName('btn-operator');
Array.from(operatorBtns).forEach(btn => btn.addEventListener('click', function(){setOperator(btn.innerHTML)}));

document.getElementById('clear').addEventListener('click', Clear);
document.getElementById('backspace').addEventListener('click', del);
document.getElementById('equal').addEventListener('click', Calculate);