// Add a listener for the browser action button
chrome.browserAction.onClicked.addListener(function(tab) 
{
    // Create a new tab with a specific URL
    chrome.tabs.create({ url: "https://www.example.com" });
});

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
    return num1 / num2;
}
  