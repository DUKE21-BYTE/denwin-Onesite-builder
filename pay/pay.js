import { loadProject, download, slugify } from "/shared/ui.js";

// Basic PIN for MVP (In a real app, verify via API)
// You can change this PIN to whatever you want "manually"
const VALID_PINS = ["1234", "2024", "9500"]; 

const pinInput = document.getElementById("pinInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMsg = document.getElementById("errorMsg");

function getExportHtml(s) {
  // Re-use logic from app.js - ideally this should be a shared function
  // For MVP, we reconstruct it here or we could move getExportHtml to shared/ui.js
  // Let's do a simple reconstruction here to keep it isolated for now without refactoring everything.
  
   return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${s.biz || "Business"}</title>
<style>
  body{font-family:system-ui,Segoe UI,Roboto,Arial;margin:0;background:#f8fafc;color:#0f172a}
  .hero{padding:48px 20px;background:linear-gradient(135deg, ${s.primaryColor}, #111827);color:#fff}
  .wrap{max-width:920px;margin:0 auto}
  .btn{display:inline-block;padding:10px 14px;border-radius:14px;text-decoration:none;font-weight:700}
  .btnA{background:#fff;color:#0f172a}
  .btnB{border:1px solid rgba(255,255,255,.35);color:#fff;margin-left:8px}
  .sec{padding:28px 20px}
  .card{border:1px solid #e2e8f0;border-radius:18px;padding:14px;background:#fff}
  .grid{display:grid;gap:12px}
  @media(min-width:720px){.grid2{grid-template-columns:1fr 1fr}}
  footer{border-top:1px solid #e2e8f0;padding:16px 20px;font-size:12px;color:#64748b}
</style>
</head>
<body>
  <div class="hero">
    <div class="wrap">
      <div style="font-size:12px;opacity:.85">💬 WhatsApp Ready • 📍 ${s.location || "Your Location"}</div>
      <h1 style="margin:10px 0 0;font-size:34px">${s.biz || "Your Business"}</h1>
      <p style="margin:8px 0 0;opacity:.85">${s.tagline || ""}</p>
      <div style="margin-top:18px">
        <a class="btn btnA" href="${s.waLink}" target="_blank">${s.ctaText}</a>
        <a class="btn btnB" href="${s.callLink}">Call Now</a>
      </div>
      <div style="margin-top:14px;font-size:14px;opacity:.85">☎ ${s.phone || "Phone"} • 💬 ${s.whatsapp || "WhatsApp"}</div>
    </div>
  </div>

  <div class="sec">
    <div class="wrap">
      <h2 style="margin:0 0 10px">Services</h2>
      <div class="grid grid2">
        ${s.services.map(x => `<div class="card"><strong>${x}</strong><div style="font-size:13px;color:#475569;margin-top:6px">Quick response • Fair pricing • Trusted service</div></div>`).join("")}
      </div>
    </div>
  </div>

  <div class="sec">
    <div class="wrap">
      <h2 style="margin:0 0 10px">About</h2>
      <div class="card">${s.about || ""}</div>
      <div class="grid grid2" style="margin-top:12px">
        <a class="card" href="${s.waLink}" target="_blank" style="text-decoration:none;color:inherit">
          <strong>Chat on WhatsApp</strong><div style="font-size:13px;color:#475569;margin-top:6px">Fast replies. Share your request.</div>
        </a>
        <a class="card" href="${s.callLink}" style="text-decoration:none;color:inherit">
          <strong>Call Direct</strong><div style="font-size:13px;color:#475569;margin-top:6px">Book a service in seconds.</div>
        </a>
      </div>
    </div>
  </div>

  <footer>Built with Denwin QuickSite Builder • © ${new Date().getFullYear()}</footer>
</body>
</html>`;
}

unlockBtn.addEventListener("click", () => {
  const enteredPin = pinInput.value.trim();
  
  if (VALID_PINS.includes(enteredPin)) {
    // 1. Success UI
    errorMsg.classList.add("hidden");
    unlockBtn.textContent = "Downloading...";
    unlockBtn.classList.remove("bg-blue-600", "hover:bg-blue-500");
    unlockBtn.classList.add("bg-green-600", "hover:bg-green-500");
    
    // 2. Generate and Download
    const project = loadProject();
    if (!project) {
        alert("No project found! Go back to the builder.");
        return;
    }

    const html = getExportHtml(project);
    const fname = `${slugify(project.biz || "business")}.html`;
    
    download(fname, html);
    
    setTimeout(() => {
        unlockBtn.textContent = "Downloaded!";
        window.location.href = "/publish"; // Send them to publish guide
    }, 1500);

  } else {
    // Error UI
    errorMsg.classList.remove("hidden");
    pinInput.classList.add("border-red-500");
    setTimeout(() => pinInput.classList.remove("border-red-500"), 2000);
  }
});
