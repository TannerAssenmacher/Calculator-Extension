let label = document.getElementById('display');

// Add a listener for the browser action button
chrome.browserAction.onClicked.addListener(function(tab) 
{
    // Create a new tab with a specific URL
    chrome.tabs.create({ url: 'https://www.example.com' });
});

function display(num)
{   
    label.innerHTML = label.text + num;
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

function Calculate(num1, num2, op)
{
    if(num1 == 'Error' || num2 == 'Error')
        return 'Error';
    
    switch(op)
    {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if(num2 == 0)
                return 'Error';
            return num1 / num2;
        case '%':
            if(num2 == 0 || !Number.isInteger(num1 / num2))
                return 'Error';
            return num1 % num2;
        default:
            return 'Error';
    }
}