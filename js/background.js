chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "openWindow") {
        chrome.windows.create({
            url: "index.html",
            type: "popup",
            width: 200,
            height: 200
        });
    }
});
