let label = document.getElementById('display');

let memory = '';
let operator = '';

// Add a listener for the browser action button
// chrome.browserAction.onClicked.addListener(function(tab) 
// {
//     // Create a new tab with a specific URL
//     chrome.tabs.create({ url: 'https://www.example.com' });
// });

function display(num)
{   
    label.innerHTML = label.innerHTML + num;
}

function Clear()
{
    label.innerHTML = '';
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
    operator = op;

    mem = label.innerHTML;

    Clear();
}

function Calculate()
{

    var res;
    let val = Number(label.innerHTML);

    mem = Number(mem);

    if(Number.isNaN(mem) || Number.isNaN(val))
    {
        mem = 'Error';
        return;
    }
    
    switch(operator)
    {
        case '+':
            res = mem + val;
            break;
        case '-':
            res = mem - val;
            break;
        case '*':
            res = mem * val;
            break;
        case '/':
            if(val == 0)
            {
                res = 'Error';
                return;
            }
            res = mem / val;
            break;
        case '%':
            if(val == 0 || !Number.isInteger(mem / val))
            {
                res = "Error";
                return;
            }
            res = mem % val;
            break;
        default:
            res = "Error";
            break;
    }

    label.innerHTML = res;
}

const themeToggleBtn = document.querySelector('.theme-toggler');
const calculator = document.querySelector('.calculator');
const toggleIcon = document.querySelector('.toggler-icon');
let isDark = true;
themeToggleBtn.onclick = () => {
    calculator.classList.toggle('dark');
    themeToggleBtn.classList.toggle('active');
    isDark = !isDark;
}
