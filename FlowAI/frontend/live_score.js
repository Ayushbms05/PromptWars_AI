// live_score.js

document.addEventListener("DOMContentLoaded", () => {
    const elRuns = document.getElementById("score-runs");
    const elWickets = document.getElementById("score-wickets");
    const elOvers = document.getElementById("score-overs");
    const elCrr = document.getElementById("score-crr");
    const elRecent = document.getElementById("recent-overs");

    if (!elRuns) return;

    let runs = 142;
    let wickets = 3;
    let balls = 2; 
    let totalOvers = 14;
    let maxOvers = 20;

    let recentBalls = ['1', '4']; // Track last 6 visually

    function renderScore() {
        elRuns.textContent = runs;
        elWickets.textContent = wickets;
        elOvers.textContent = `${totalOvers}.${balls}`;
        
        let totalBallsDelivered = (totalOvers * 6) + balls;
        let crr = totalBallsDelivered === 0 ? 0 : (runs / totalBallsDelivered) * 6;
        elCrr.textContent = crr.toFixed(2);

        // Render recent balls visually 
        elRecent.innerHTML = "";
        recentBalls.forEach(ball => {
            let bg = "rgba(255,255,255,0.05)";
            let color = "var(--text-main)";
            let border = "1px solid var(--glass-border)";

            if (ball === '4' || ball === '6') {
                bg = "rgba(34, 197, 94, 0.2)"; // Green
                border = "1px solid var(--status-green)";
                color = "var(--status-green)";
            } else if (ball === 'W') {
                bg = "rgba(239, 68, 68, 0.2)"; // Red
                border = "1px solid var(--status-red)";
                color = "var(--status-red)";
            } else if (ball === '|') {
                bg = "transparent";
                border = "none";
                color = "var(--text-muted)";
            }
            
            elRecent.innerHTML += `<div style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background: ${bg}; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem; border: ${border}; color: ${color};">${ball}</div>`;
        });
    }

    function simulateBall() {
        if (runs >= 198 || wickets >= 10 || (totalOvers >= maxOvers && balls === 0)) return; // Match over
        if (balls >= 6) {
            balls = 0;
            totalOvers++;
            recentBalls.push('|'); // Over Break visually
        }

        balls++;
        
        // Randomize ball event based on pseudo probability
        const rand = Math.random();
        let currentEvent = '0';
        
        if (rand < 0.05) {
            currentEvent = 'W';
            wickets++;
        } else if (rand < 0.15) {
            currentEvent = '4';
            runs += 4;
        } else if (rand < 0.22) {
            currentEvent = '6';
            runs += 6;
        } else if (rand < 0.6) {
            currentEvent = '1';
            runs += 1;
        } else if (rand < 0.75) {
            currentEvent = '2';
            runs += 2;
        } else {
            currentEvent = '0'; // Dot ball
        }

        // Maintain array length
        if (recentBalls.length >= 8) recentBalls.shift();
        recentBalls.push(currentEvent);

        renderScore();
    }

    // Setup UI
    renderScore();

    // Trigger simulation every 15 seconds so it feels natural and not aggressively fast
    setInterval(simulateBall, 15000);
});
