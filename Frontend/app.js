const API_BASE = "https://your-backend.onrender.com"; // Replace with your Render backend URL

async function getWelcome() {
  try {
    const res = await fetch(API_BASE + "/");
    const data = await res.text();
    alert(data);
  } catch (err) {
    alert("Error connecting to backend: " + err);
  }
}

async function attemptCraft() {
  document.getElementById("loading-overlay").style.display = "flex";
  try {
    const res = await fetch(API_BASE + "/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player: "KSR", action: "crafting" })
    });

    const data = await res.json();
    document.getElementById("craft-result").innerText = data.result;
  } catch (err) {
    alert("Error: " + err);
  }
  document.getElementById("loading-overlay").style.display = "none";
}
