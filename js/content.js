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
    operator = op;

    let txt = label.innerHTML;

    Clear();

    memory = txt;
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

    label.innerHTML = res;
}