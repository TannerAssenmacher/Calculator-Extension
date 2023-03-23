let label = document.getElementById('display');
let previous = document.getElementById('previous');

let memory = '';
let operator = '';

function display(num)
{
    if (num === '.' && label.innerHTML.includes('.')) return
    if (num === '+/-' && label.innerHTML.includes('-'))
    {
        label.innerHTML = label.innerHTML.replace(/-/g, '');
    }
    else if (num === '+/-')
    {
        label.innerHTML = '-' + label.innerHTML;
    }
    else
    {
        label.innerHTML = label.innerHTML + num;
        console.log('innerHtml: ' + label.innerHTML);
    }
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

function toggleMoreOperators()
{
    let numTable = document.getElementById('nums');
    let opTable = document.getElementById('extraOps');
    if(numTable.style.display == 'none')
    {
        opTable.style.display = 'none';
        numTable.style.display = 'table';
    }
    else
    {
        numTable.style.display = 'none';
        opTable.style.display = 'table';
    }
}

function setOperator(op)
{
    if (op == 'more')
    {
        toggleMoreOperators();
        return
    }
    if(label.innerHTML === '') return

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