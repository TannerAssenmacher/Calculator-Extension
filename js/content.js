const UNARY_OPERATORS = ['sin', 'cos', 'tan', 'log', 'ln', 'factorial', 'square', 'sqrt', '!', '%'];

let label = document.getElementById('display');
let previous = document.getElementById('previous');

let memory = '';
let operator = '';

function display(num)
{
    if(previous.innerHTML == 'Err')
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

    label.innerHTML = label.innerHTML + num;
}

function changeSign()
{
    if(label.innerHTML == '')
        return;

    if(label.innerHTML.includes('-'))
        label.innerHTML = label.innerHTML.replace(/-/g, '');
    else
        label.innerHTML = '-' + label.innerHTML;
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
    
    if(previous.innerHTML == 'Err')
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
            if(!Number.isInteger(val1) || val1 < 0)
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

// Window Listeners
window.addEventListener("DOMContentLoaded", (event) => 
{
    if (document)
    {
        document.getElementById("window").addEventListener("click", function() 
        {
            chrome.runtime.sendMessage({action: "openWindow"});
        });
    }
});


var constWidth = 330;
var constHeight = 570;

// Function to check window size and reset it if changed
function checkWindowSize() 
{
    var currentWidth = window.innerWidth;
    var currentHeight = window.innerHeight;

    // If the window size has changed, reset it to the original size
    if (currentWidth !== constWidth || currentHeight !== constHeight) 
        window.resizeTo(constWidth, constHeight);
}

// Add event listener for window load
window.addEventListener('load', function() 
{
    // Get the popup window element
    var popupWindow = window;

    // Disable dragging of the popup window
    popupWindow.addEventListener('mousedown', function(event) 
    {
        event.preventDefault();
    });

    // Periodically check window size and reset it if changed
    setInterval(checkWindowSize, 50); // Check every 500 milliseconds (0.5 seconds)
});

// Button Listeners

document.getElementById('+/-').addEventListener('click', changeSign);
Array.from(document.getElementsByClassName('btn-clear')).forEach(btn => btn.addEventListener('click', Clear));
Array.from(document.getElementsByClassName('btn-del')).forEach(btn => btn.addEventListener('click', del));
Array.from(document.getElementsByClassName('btn-more')).forEach(btn => btn.addEventListener('click', toggleMoreOperators));
Array.from(document.getElementsByClassName('btn-equal')).forEach(btn => btn.addEventListener('click', Calculate));

Array.from(document.getElementsByClassName('btn-number')).forEach(btn => btn.addEventListener('click', function(){display(btn.innerHTML)}));
Array.from(document.getElementsByClassName('btn-operator')).forEach(btn => btn.addEventListener('click', function(){setOperator(btn.id, UNARY_OPERATORS.indexOf(btn.id) != -1)}));