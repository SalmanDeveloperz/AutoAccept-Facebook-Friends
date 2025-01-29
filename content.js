(function () {
    function addAcceptAllButton() {
        if (document.getElementById("acceptAllBtn")) return; // Check if the button already exists

        let header = document.querySelector('h1'); // Find the Friends page header where we will add the button

        if (!header) return; // Exit if header is not found

        // Creating the new "Accept All" button
        let btn = document.createElement("button");
        btn.innerText = "✔ Accept All";
        btn.id = "acceptAllBtn";

        // Style the button to match Facebook's UI
        btn.style.cssText = `
            background-color: #1877F2;
            color: white;
            border: none;
            padding: 6px 12px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 20px;
            font-weight: bold;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease;
            margin-left: 10px;
        `;

        // Button hover effect
        btn.onmouseover = () => (btn.style.backgroundColor = "#165dce");
        btn.onmouseout = () => (btn.style.backgroundColor = "#1877F2");

        // When clicked, accept all friend requests
        btn.onclick = () => {
            let buttons = document.querySelectorAll('div[aria-label="Confirm"]');
            if (buttons.length === 0) {
                alert("No pending friend requests!");
                return;
            }

            buttons.forEach((button, index) => {
                setTimeout(() => {
                    button.click();
                }, index * 500); // Click every 500ms to avoid detection
            });

            alert(`Accepted ${buttons.length} friend requests!`);
        };

        // Insert the button next to the Friends page header
        header.parentNode.appendChild(btn);
    }

    // Run only when the page loads
    addAcceptAllButton();

    // Run when new content loads (for infinite scrolling)
    let observer = new MutationObserver(addAcceptAllButton);
    observer.observe(document.body, { childList: true, subtree: true });
})();
