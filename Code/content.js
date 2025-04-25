(function () {
    function addAcceptAllButton() {
        if (document.getElementById("acceptAllBtn")) return;

        let header = document.querySelector('h1');
        if (!header) return;

        let btn = document.createElement("button");
        btn.innerText = "✔ Accept All";
        btn.id = "acceptAllBtn";

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

        btn.onmouseover = () => (btn.style.backgroundColor = "#165dce");
        btn.onmouseout = () => (btn.style.backgroundColor = "#1877F2");

        btn.onclick = async () => {
            let totalAccepted = 0;
            let prevHeight = 0;
            let scrollTries = 0;

            // Keep scrolling until no more content loads
            while (scrollTries < 10) {
                window.scrollTo(0, document.body.scrollHeight);
                await new Promise(res => setTimeout(res, 1500));

                let currHeight = document.body.scrollHeight;
                if (currHeight === prevHeight) {
                    scrollTries++;
                } else {
                    scrollTries = 0;
                    prevHeight = currHeight;
                }
            }

            // Click all visible Confirm buttons
            let buttons = document.querySelectorAll('div[aria-label="Confirm"]');

            if (buttons.length === 0) {
                alert("No pending friend requests!");
                return;
            }

            for (let i = 0; i < buttons.length; i++) {
                buttons[i].click();
                totalAccepted++;
                await new Promise(res => setTimeout(res, 500));
            }

            alert(`🎉 Accepted ${totalAccepted} friend requests!`);
        };

        header.parentNode.appendChild(btn);
    }

    addAcceptAllButton();

    let observer = new MutationObserver(addAcceptAllButton);
    observer.observe(document.body, { childList: true, subtree: true });
})();
