/* script.js */

document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       0. Service Worker & Accessibility logic
       ========================================= */
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(reg => {
            console.log('SW Registered');
        }).catch(e => console.error('SW Error', e));
    }

    const btnContrast = document.getElementById('btn-contrast-toggle');
    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
    }

    /* =========================================
       1. Navigation Tabs Logic
       ========================================= */
    const navButtons = document.querySelectorAll('.nav-btn[data-target]');
    const views = document.querySelectorAll('.app-view');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons and views
            navButtons.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.add('hidden-view'));

            // Add active to clicked button and target view
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            if (targetId && document.getElementById(targetId)) {
                document.getElementById(targetId).classList.remove('hidden-view');
            }
        });
    });

    /* =========================================
       2. Global Dashboard Logic (Simulated Data)
       ========================================= */
    const crowdValueEl = document.getElementById("crowd-density-value");
    const waitTimeEl = document.getElementById("waiting-time-value");
    const navCrowdEl = document.getElementById("nav-crowd-message");
    const navWaitEl = document.getElementById("nav-wait-message");

    let currentGlobals = {
        density: "Medium",
        waitTime: 15
    };

    const crowds = ["Low", "Medium", "High"];

    function updateDashboard() {
        const newWaitTime = Math.floor(Math.random() * 26) + 5;
        const newDensity = crowds[Math.floor(Math.random() * crowds.length)];

        currentGlobals.density = newDensity;
        currentGlobals.waitTime = newWaitTime;

        // Apply Wait time colors
        waitTimeEl.textContent = newWaitTime;
        waitTimeEl.className = "data-value";
        if (newWaitTime > 20) waitTimeEl.classList.add("status-high");
        else if (newWaitTime >= 10) waitTimeEl.classList.add("status-medium");
        else waitTimeEl.classList.add("status-low");

        // Apply Crowd density colors
        crowdValueEl.textContent = newDensity;
        crowdValueEl.className = "data-value";
        if (newDensity === "High") crowdValueEl.classList.add("status-high");
        else if (newDensity === "Medium") crowdValueEl.classList.add("status-medium");
        else crowdValueEl.classList.add("status-low");

        // Update Intelligent Navigation Suggestions
        if (newDensity === "High") {
            navCrowdEl.textContent = "👥 Global congestion detected at Gates B & C.";
            navCrowdEl.style.color = "var(--status-red)";
        } else if (newDensity === "Medium") {
            navCrowdEl.textContent = "👥 Expect moderate global traffic in concourses.";
            navCrowdEl.style.color = "var(--status-yellow)";
        } else {
            navCrowdEl.textContent = "👥 Stadium walkways are largely clear.";
            navCrowdEl.style.color = "var(--status-green)";
        }

        if (newWaitTime > 20) {
            navWaitEl.textContent = "⏱️ Highest wait times reported at Sector 4 Food Stalls.";
            navWaitEl.style.color = "var(--status-red)";
        } else if (newWaitTime >= 10) {
            navWaitEl.textContent = "⏱️ Food wait times are moderate globally.";
            navWaitEl.style.color = "var(--status-yellow)";
        } else {
            navWaitEl.textContent = "⏱️ Quick service available at all food stations right now.";
            navWaitEl.style.color = "var(--status-green)";
        }
    }

    // Initialize with first randomly generated set of data
    updateDashboard();
    setInterval(updateDashboard, 5000);

    /* =========================================
       3. AI Chat Assistant Logic
       ========================================= */
    const aiInput = document.getElementById("ai-input");
    const askBtn = document.getElementById("ask-btn");
    const responseBox = document.getElementById("ai-response-box");
    const responseText = document.getElementById("ai-response-text");

    function handleChat() {
        const query = aiInput.value.toLowerCase().trim();
        if (!query) return;

        responseBox.classList.remove("hidden");
        let reply = "";
        
        if (query.includes("crowd")) {
            reply = `The global stadium crowd density is currently ${currentGlobals.density.toUpperCase()}.`;
        } else if (query.includes("wait") || query.includes("food")) {
            reply = `Global average waiting time at food stalls is ~${currentGlobals.waitTime} minutes.`;
        } else {
            reply = "I'm your FlowAI Assistant! Check the 'Navigate' or 'Amenities' tabs above for personalized features!";
        }
        
        responseText.textContent = reply;
        aiInput.value = "";
    }

    askBtn.addEventListener("click", handleChat);
    aiInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleChat();
    });

    /* =========================================
       4. Seat Location & Navigation Logic
       ========================================= */
    const btnFindSeat = document.getElementById("btn-find-seat");
    const seatResult = document.getElementById("seat-result");
    const resGate = document.getElementById("result-gate");
    const resCond = document.getElementById("result-condition");
    const resPath = document.getElementById("result-path");

    btnFindSeat.addEventListener("click", () => {
        const seatInputVal = document.getElementById("seat-input").value;
        const seat = parseInt(seatInputVal);
        if (!seat || seat < 1) return alert("Please enter a valid seat number (e.g., 420).");

        seatResult.classList.remove("hidden");
        
        let targetGate = "";
        let pathRoute = "";
        
        // Logical Simulated Mapping
        if (seat <= 500) {
            targetGate = "Gate A - North Wing";
            pathRoute = "Take the left ramp from Ground Floor, proceed to Sector 1.";
        } else if (seat <= 1000) {
            targetGate = "Gate B - East Wing";
            pathRoute = "Use Escalator 2 to Level 1, walk straight to Sector 2.";
        } else if (seat <= 1500) {
            targetGate = "Gate C - South Wing";
            pathRoute = "Enter from outer loop, turn right at the main concourse to Sector 3.";
        } else {
            targetGate = "Gate D - West Wing";
            pathRoute = "Use Elevator 4, go to Level 2. Your seat is near the central aisle.";
        }

        resGate.textContent = targetGate;
        resPath.textContent = pathRoute;

        // Apply dynamic mock real-time logic
        if (currentGlobals.density === "High") {
            resCond.textContent = `Heavy traffic near ${targetGate}. We recommend using the next adjacent Gate, then taking the indoor concourse.`;
            resCond.className = "status-red";
        } else if (currentGlobals.density === "Medium") {
            resCond.textContent = `Moderate crowd expected at ${targetGate}. Proceed normally.`;
            resCond.className = "status-yellow";
        } else {
            resCond.textContent = `Path is clear. Walk-ins are quick right now.`;
            resCond.className = "status-green";
        }
    });

    /* =========================================
       5. Amenities (Food / Washroom) Logic
       ========================================= */
    const btnFindFood = document.getElementById("btn-find-food");
    const btnFindWashroom = document.getElementById("btn-find-washroom");
    const amenityResult = document.getElementById("amenity-result");
    
    function generateAmenity(type) {
        const seatInputVal = document.getElementById("amenity-seat-input").value;
        const seat = parseInt(seatInputVal);
        if (!seat || seat < 1) return alert("Please enter your current seat number first.");

        amenityResult.classList.remove("hidden");
        
        const titleEl = document.getElementById("amenity-title");
        const iconEl = document.getElementById("amenity-icon");
        const locEl = document.getElementById("amenity-location");
        const statEl = document.getElementById("amenity-status");
        const dirEl = document.getElementById("amenity-directions");

        let stallArea = "";
        let directionStr = "";
        
        // Find nearest based on seat grouping
        if (seat <= 1000) {
            stallArea = "North Concourse";
            directionStr = "Walk down your aisle to the left, exit tunnel 4, turn right.";
        } else {
            stallArea = "South Concourse";
            directionStr = "Walk up to the main terrace exit, take a left toward the VIP lounge area.";
        }

        const btnOrder = document.getElementById("btn-order-ahead");
        if (type === 'food') {
            titleEl.textContent = "Nearest Clear Food Stall";
            iconEl.textContent = "🍔";
            locEl.textContent = `Stall #42 - ${stallArea}`;
            
            // Randomly simulate an un-crowded stall found near them
            const wait = Math.floor(Math.random() * 8) + 1; 
            statEl.textContent = `${wait} min wait currently`;
            statEl.className = wait > 5 ? "status-yellow" : "status-green";
            dirEl.textContent = `${directionStr} Look for the Blue neon sign.`;
            if (btnOrder) btnOrder.style.display = "block";
            
        } else {
            titleEl.textContent = "Nearest Clear Washroom";
            iconEl.textContent = "🚻";
            locEl.textContent = `Washroom Block B - ${stallArea}`;
            
            statEl.textContent = "No Queue Detected";
            statEl.className = "status-green";
            dirEl.textContent = `${directionStr} It's located right next to the concession stands.`;
            if (btnOrder) btnOrder.style.display = "none";
        }
    }

    btnFindFood.addEventListener("click", () => generateAmenity('food'));
    btnFindWashroom.addEventListener("click", () => generateAmenity('washroom'));

    /* =========================================
       6. Emergency SOS Logic
       ========================================= */
    const btnEmergency = document.getElementById("btn-submit-emergency");
    const emergencyResult = document.getElementById("emergency-result");
    const emergencyInstruct = document.getElementById("emergency-instructions");

    btnEmergency.addEventListener("click", () => {
        const type = document.getElementById("emergency-type").value;
        const loc = document.getElementById("emergency-seat").value.trim();

        if (!loc) {
            alert("Please provide a seat number or location to dispatch authorities.");
            return;
        }

        emergencyResult.classList.remove("hidden");

        let advice = "";
        if (type === "medical") {
            advice = `Medical team dispatched to [${loc}]. Please ensure the patient has breathing space. Do not move them unless they are in immediate secondary danger.`;
        } else if (type === "security") {
            advice = `Security detail is en route to [${loc}]. Please step away from any confrontation and keep yourself safe.`;
        } else if (type === "fire") {
            advice = `Do not wait. Evacuate immediately from [${loc}] towards the nearest lit exit sign. Do not use elevators.`;
        } else {
            advice = `Staff alerted. Please wait at [${loc}] for assistance. If you are in danger, move to the nearest public concourse.`;
        }

        emergencyInstruct.textContent = advice;
    });
});
