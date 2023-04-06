const UNARY_OPERATORS = ['sin', 'cos', 'tan', 'log', 'ln', 'factorial', 'square', 'sqrt', '!', '%'];

let label = document.getElementById('display');
let previous = document.getElementById('previous');

let memory = '';
let operator = '';

function display(num)
{
    if(label.innerHTML == 'Err' || previous.innerHTML == 'Err')
        Clear();

    if(num == 'π')
    {
        if(label.innerHTML == '')
        {
            num = Math.PI.toFixed(10) + '';
            label.innerHTML = num;
        }
        return
    }
    else if(num == 'e')
    {
        if(label.innerHTML == '')
        {
            num = Math.E.toFixed(10) + '';
            label.innerHTML = num;
        }
        return
    }

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
    operator = '';
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
    if(label.innerHTML == '' && previous.innerHTML == '' && memory == '')
        return;
    
    if(previous.innerHTML == 'Err')
        return;
    
    operator = op;

    if(isUnary)
        Calculate();
    else
    {
        if(label.innerHTML == '' && !Number.isNaN(previous.innerHTML))
        {
            memory = previous.innerHTML;
            previous.innerHTML += op;
        }
        else
        {
            memory = label.innerHTML;
            previous.innerHTML = label.innerHTML + op;
            label.innerHTML = '';
        }
    }
}

function Calculate()
{
    var val1, val2, res;

    if(operator == '')
        return;

    if(memory == '' && previous.innerHTML == '' && label.innerHTML == '')
        return;
    
    if(previous.innerHTML == 'Err' || label.innerHTML == 'Err')
        return;

    if(UNARY_OPERATORS.indexOf(operator) != -1)
    {
        if(label.innerHTML != '')
            val1 = label.innerHTML;
        else
            val1 = previous.innerHTML;
    }
    else
    {
        if(label.innerHTML == '')
        {
            val1 = previous.innerHTML;
            val2 = memory;
        }
        else
        {
            val1 = memory;
            val2 = label.innerHTML;
        }
    }
    
    if(Number.isNaN(val1) && Number.isNaN(val2))
        return;
    
    val1 = Number(val1);
    val2 = Number(val2);

    switch(operator)
    {
        case 'sin':
            res = Math.sin(val1);
            break;
        case 'cos':
            res = Math.cos(val1);
            break;
        case 'tan':
            if(Number.isInteger(val1 / (Math.PI / 2)))
                res = 'Err';
            else
                res = Math.tan(val1);
            break;
        case 'square':
            res = val1 * val1;
            break;
        case 'sqrt':
            if(val1 < 0)
                res = 'Err';
            else
                res = Math.sqrt(val1);
            break;
        case 'log':
            if(val1 <= 0)
                res = 'Err';
            else
                res = Math.log10(val1);
            break;
        case 'ln':
            if(val1 <= 0)
                res = 'Err';
            else
                res = Math.log(val1);
            break;
        case '!':
            if(!Number.isInteger(val1))
                res = 'Err';
            else
            {
                res = 1;
                for(var i = 2; i <= val1; ++i)
                    res *= i;
            }
            break;
        case '+':
            res = val1 + val2;
            break;
        case '-':
            res = val1 - val2;
            break;
        case '*':
            res = val1 * val2;
            break;
        case '/':
            if(val2 == 0)
                res = 'Err';
            else
                res = val1 / val2;
            break;
        case '%':
            res = val1 * 0.01;
            break;
        case '^':
            if(val1 == 0 && val1 <= 0)
                res = 'Err';
            else
                res = Math.pow(val1, val2);
            break;
        default:
            res = 'Err';
            break;
    }

    if(res == 'Err')
    {
        Clear();
        previous.innerHTML = res;

        return;
    }
    
    memory = val2;
    previous.innerHTML = res;
    label.innerHTML = '';
}   

// Button Events

document.getElementById('clear').addEventListener('click', Clear);
document.getElementById('backspace').addEventListener('click', del);
document.getElementById('more').addEventListener('click', toggleMoreOperators);
Array.from(document.getElementsByClassName('btn-equal')).forEach(btn => btn.addEventListener('click', Calculate));

Array.from(document.getElementsByClassName('btn-number')).forEach(btn => btn.addEventListener('click', function(){display(btn.innerHTML)}));
Array.from(document.getElementsByClassName('btn-operator')).forEach(btn => btn.addEventListener('click', function(){setOperator(btn.id, UNARY_OPERATORS.indexOf(btn.id) != -1)}));