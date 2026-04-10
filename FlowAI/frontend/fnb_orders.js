// fnb_orders.js
// Module 3: Click-and-Collect Integration

document.addEventListener("DOMContentLoaded", () => {
    const btnOrder = document.getElementById("btn-order-ahead");
    let isOrdering = false;

    if (btnOrder) {
        btnOrder.addEventListener("click", () => {
            if (isOrdering) return;
            isOrdering = true;
            btnOrder.textContent = "⏱️ Order Placed...";
            btnOrder.style.background = "var(--status-yellow)";
            btnOrder.style.color = "black";
            btnOrder.style.border = "none";

            // Simulate Preparation Timer
            setTimeout(() => {
                showNotification("🍔 Order Ready for Pickup at Stall!");
                btnOrder.textContent = "✅ Ready for Pickup!";
                btnOrder.style.background = "var(--status-green)";
                btnOrder.style.color = "white";
                
                // Hardware vibration if supported on device testing
                if (navigator.vibrate) {
                    navigator.vibrate([200, 100, 200]);
                }
            }, 4000); // 4 seconds simulated order completion
        });
    }

    function showNotification(msg) {
        const div = document.createElement("div");
        div.className = "floating-notif";
        div.textContent = msg;
        document.body.appendChild(div);

        // Slide in animation
        setTimeout(() => div.classList.add("show-notif"), 100);

        // Remove after 5s
        setTimeout(() => {
            div.classList.remove("show-notif");
            setTimeout(() => document.body.removeChild(div), 300);
        }, 5000);
    }
});
