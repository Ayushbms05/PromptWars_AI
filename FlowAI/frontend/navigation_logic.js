// navigation_logic.js
// Module 2: Seat-to-Seat Group Navigation

document.addEventListener("DOMContentLoaded", () => {
    const btnCreateGroup = document.getElementById("btn-create-group");
    const groupStatus = document.getElementById("group-status");
    const btnFindFriend = document.getElementById("btn-find-friend");
    const friendResult = document.getElementById("friend-result");

    // Logical spatial mapping matching script.js architecture
    function getSector(seat) {
        if (seat <= 500) return "North Wing";
        if (seat <= 1000) return "East Wing";
        if (seat <= 1500) return "South Wing";
        return "West Wing";
    }

    if (btnCreateGroup) {
        btnCreateGroup.addEventListener("click", () => {
            const id = Math.floor(1000 + Math.random() * 9000);
            localStorage.setItem("flowai_group_id", id);
            groupStatus.textContent = `Group synced! ID: [${id}]. Share this to connect paths.`;
            groupStatus.className = "status-green";
            groupStatus.style.fontWeight = "600";
        });
    }

    if (btnFindFriend) {
        btnFindFriend.addEventListener("click", () => {
            const mySeat = parseInt(document.getElementById("seat-input").value);
            const friendSeat = parseInt(document.getElementById("friend-seat-input").value);

            if (!mySeat || !friendSeat) {
                alert("Provide both your seat above and your friend's seat.");
                return;
            }

            friendResult.classList.remove("hidden");
            const mySector = getSector(mySeat);
            const theirSector = getSector(friendSeat);

            if (mySector === theirSector) {
                friendResult.innerHTML = `<h4 style="color:var(--status-green); font-size:1.1rem; margin-bottom:0.5rem;">Friend Found!</h4>
                                          <p style="font-size:1.1rem; line-height:1.5;">They are also in the <strong>${theirSector}</strong>. Stand up and walk down your current aisle, they are within 100 feet.</p>`;
            } else {
                friendResult.innerHTML = `<h4 style="color:var(--accent); font-size:1.1rem; margin-bottom:0.5rem;">Friend Found!</h4>
                                          <p style="font-size:1.1rem; line-height:1.5;">You are in <strong>${mySector}</strong>, they are in <strong>${theirSector}</strong>. <br><br>
                                          <strong>Walking Directions:</strong> Walk out to the main inner concourse and follow the yellow path signs toward the ${theirSector}. Expected walk time is ~4 minutes.</p>`;
            }
        });
    }
});
