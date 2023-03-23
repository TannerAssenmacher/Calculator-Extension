const UNARY_OPERATORS = ['sin', 'cos', 'tan', 'log', 'ln', 'factorial', 'square', 'sqrt'];

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

function setOperator(op, isUnary)
{
    if (op == 'more')
    {
        toggleMoreOperators();

        return;
    }
    
    if(label.innerHTML == '')
        return;
    
    operator = op;
    if(isUnary)
    {
        Calculate();
        
        return;
    }

    memory = label.innerHTML;
    previous.innerHTML = memory + ' ' + op;
    label.innerHTML = '';
}

function Calculate()
{   
    if(Number.isNaN(memory) || Number.isNaN(label.innerHTML))
    {
        Clear();
        label.innerHTML = 'Error';
        return;
    }

    var res, val = Number(label.innerHTML);
    memory = Number(memory.innerHTML);
    

    switch(operator)
    {
        case 'sin':
            res = Math.sin(val);
            break;
        case 'cos':
            res = Math.cos(val);
            break;
        case 'tan':
            res = Math.tan(val);
            break;
        case 'square':
            res = val * val;
            break;
        case 'sqrt':
            if(val < 0)
            {
                Clear();
                label.innerHTML = 'Error';
            }
            res = Math.sqrt(val);
            break;
        case 'log':
            res = Math.log10(val);
            break;
        case 'log':
            res = Math.log(val);
            break;
        case 'factorial':
            if(!Number.isInteger(val))
            {
                Clear();
                label.innerHTML = 'Error';
                return;
            }
            res = val;
            if(res == 0)
                res = 1;
            for(let i = val; i > 0; --i)
                res *= i;
            break;
        case '+':
        case '-':
        case '*':
            res = eval(previous.innerHTML + ' ' + val);
            console.log(previous.innerHTML + ' ' + val + ' = ' + res);
            break;
        case '%':
            if(!(Number.isInteger(val) && Number.isInteger(memory)))
            {
                Clear();
                label.innerHTML = 'Error';
                return;
            }
        case '/':
            if(val == 0)
            {
                Clear();
                label.innerHTML = 'Error';
                return;
            }
            res = eval(previous.innerHTML + ' ' + val);
            break;
        default:
            Clear();
            label.innerHTML = 'Error';
            return;
    }

    memory = label.innerHTML;
    label.innerHTML = previous.innerHTML = res;
}

let numberBtns = document.getElementsByClassName('btn-number');
Array.from(numberBtns).forEach(btn => btn.addEventListener('click', function(){display(btn.innerHTML)}));

let operatorBtns = document.getElementsByClassName('btn-operator');
Array.from(operatorBtns).forEach(btn => btn.addEventListener('click', function(){setOperator(btn.id, UNARY_OPERATORS.indexOf(btn.id) != -1)}));

document.getElementById('clear').addEventListener('click', Clear);
document.getElementById('backspace').addEventListener('click', del);
document.getElementById('equal').addEventListener('click', Calculate);