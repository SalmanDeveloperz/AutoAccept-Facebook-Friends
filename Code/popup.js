document.getElementById("acceptAll").addEventListener("click", () => {
    chrome.scripting.executeScript({
        target: { tabId: chrome.tabs.TAB_ID_CURRENT },
        function: acceptAllRequests
    });
});

function acceptAllRequests() {
    let buttons = document.querySelectorAll('div[aria-label="Confirm"]'); // Select all "Confirm" buttons
    buttons.forEach(button => button.click());
    alert(`Accepted ${buttons.length} friend requests!`);
}
