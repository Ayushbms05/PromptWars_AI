// crowd_predict.js
// Module 1: Predictive Crowd-Flow Heatmap

document.addEventListener("DOMContentLoaded", () => {
    const heatmapContainer = document.getElementById("heatmap-forecast");
    if (!heatmapContainer) return;

    // Simulated half-time variable causing spikes
    let isHalftime = false;
    
    // Toggle halftime simulation constantly for live effect
    setInterval(() => {
        isHalftime = !isHalftime;
        renderHeatmap();
    }, 20000);

    function renderHeatmap() {
        const areas = [
            { id: "North Gate", waitBase: 3 },
            { id: "South Gate", waitBase: 12 },
            { id: "East Gate", waitBase: 8 },
            { id: "West Gate", waitBase: 4 }
        ];

        let html = `
            <header class="card-header">
                <span class="card-icon">🔥</span>
                <h2 class="card-title">Congestion Forecast</h2>
            </header>
            <div class="card-body" style="flex-direction: column; align-items: stretch; margin-bottom: 0;">
                <p style="margin-bottom: 1rem; font-weight: 600;">
                    ${isHalftime ? '<span class="status-red">⚠️ Halftime Spikes Detected</span>' : '<span class="status-green">✅ Normal Game Flow</span>'}
                </p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap: 10px; margin-bottom: 1.5rem;">
        `;
        
        areas.forEach(area => {
            let actualWait = isHalftime ? area.waitBase * 2.5 : area.waitBase;
            // Map CSS Heatmap gradients
            let cssClass = actualWait < 6 ? 'heatmap-green' : (actualWait > 15 ? 'heatmap-red' : 'heatmap-yellow');
            
            html += `<div class="${cssClass}" style="padding: 12px; border-radius:8px; text-align:center; display: flex; flex-direction:column; gap:0.25rem;">
                        <span style="font-size:0.85rem; text-transform:uppercase;">${area.id}</span>
                        <strong style="font-size:1.4rem;">${Math.round(actualWait)}m</strong>
                     </div>`;
        });
        
        // Append Departure Predictor Tool
        html += `
                </div>
                <div class="departure-tool" style="border-top: 1px solid var(--glass-border); padding-top: 1.5rem;">
                    <h3 style="font-size: 1.15rem; margin-bottom: 0.75rem; color: var(--text-main);">Plan Your Departure</h3>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <select id="departure-time" style="flex: 1; padding: 0.5rem; border-radius: 8px; font-size: 1rem; background: var(--bg-main); color: var(--text-main); border: 1px solid var(--glass-border);">
                            <option value="10">In 10 Minutes</option>
                            <option value="30">In 30 Minutes</option>
                            <option value="60">In 1 Hour</option>
                            <option value="end">At End of Event</option>
                        </select>
                        <button id="btn-predict-exit" class="primary-btn" style="padding: 0.5rem 1rem; font-size: 1rem; flex-shrink: 0;">Find Best Exit</button>
                    </div>
                    <div id="prediction-result" class="hidden" style="margin-top: 1.5rem; background: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--accent); padding: 1rem; border-radius: 8px;"></div>
                </div>
            </div>
        `;
        
        heatmapContainer.innerHTML = html;

        // Attach logic to new button
        document.getElementById("btn-predict-exit").addEventListener('click', calculateBestExit);
    }

    function calculateBestExit() {
        const timeVal = document.getElementById("departure-time").value;
        const resBox = document.getElementById("prediction-result");
        resBox.classList.remove("hidden");
        
        let targetGate = "West Gate";
        let logicMsg = "historically less crowded";
        
        // Logical simulation based on offset values
        if (timeVal === "10") {
            // Immediate future relies on current state
            targetGate = isHalftime ? "West Gate" : "North Gate";
            logicMsg = isHalftime ? "avoiding the immediate main concourse spike." : "based on current live clearings.";
        } else if (timeVal === "30") {
            targetGate = "East Gate";
            logicMsg = "as projected foot traffic dissipates towards the South end soon.";
        } else if (timeVal === "60") {
            targetGate = "South Gate";
            logicMsg = "expecting major shifts from the VIP tiers exiting late.";
        } else {
            targetGate = "North Gate";
            logicMsg = "since it connects directly to the widest transit hubs to handle massive end-of-game surges.";
        }

        resBox.innerHTML = `<strong>Best Projected Exit: <span style="color:var(--accent); font-size:1.1rem;">${targetGate}</span></strong><br>
                            <span style="font-size: 0.95rem; color: var(--text-muted); display:inline-block; margin-top:0.4rem;">Recommended ${logicMsg}</span>`;
    }
    
    // Initial HTML render
    renderHeatmap();
});
