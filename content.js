// Add a listener for the browser action button
chrome.browserAction.onClicked.addListener(function(tab) 
{
    // Create a new tab with a specific URL
    chrome.tabs.create({ url: "https://www.example.com" });
});

function eval(num1, num2, op)
{
    if(num1 == "Error" || num2 == "Error")
        return "Error";
    
    switch(op)
    {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        case "%":
            return modulo(num1, num2);
        default:
            return "Error";
    }
}

function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function multiply(num1, num2)
{
    return num1 * num2;
}

function divide(num1, num2)
{
    if(num2 == 0)
        return "Erorr";

    return num1 / num2;
}

function modulo(num1, num2)
{
    if(num2 == 0)
        return "Error";

    return num1 % num2;
}
  