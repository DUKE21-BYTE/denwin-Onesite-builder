import {
  safeText, formatServices, buildWhatsAppLink, buildCallLink,
  saveProject, loadProject, download, copyToClipboard, slugify
} from "/shared/ui.js";

const els = {
  bizName: document.getElementById("bizName"),
  category: document.getElementById("category"),
  tagline: document.getElementById("tagline"),
  phone: document.getElementById("phone"),
  whatsapp: document.getElementById("whatsapp"),
  town: document.getElementById("town"),
  area: document.getElementById("area"),
  services: document.getElementById("services"),
  about: document.getElementById("about"),
  primaryColor: document.getElementById("primaryColor"),
  ctaText: document.getElementById("ctaText"),
  preview: document.getElementById("preview"),
  previewFrame: document.getElementById("previewFrame"),
  modeBadge: document.getElementById("modeBadge"),
  desktopBtn: document.getElementById("desktopBtn"),
  mobileBtn: document.getElementById("mobileBtn"),
  downloadBtn: document.getElementById("downloadBtn"),
  copyWaBtn: document.getElementById("copyWaBtn"),
};

let mode = "desktop";

function getState() {
  const biz = safeText(els.bizName.value);
  const town = safeText(els.town.value);
  const area = safeText(els.area.value);
  const location = [area, town].filter(Boolean).join(", ");
  const services = formatServices(els.services.value);
  const message = `Hi ${biz}, I found you online. I need help with: ${services[0]}. I'm in ${location}.`;

  return {
    biz,
    category: safeText(els.category.value),
    tagline: safeText(els.tagline.value),
    phone: els.phone.value,
    whatsapp: els.whatsapp.value,
    town,
    area,
    location,
    services,
    about: safeText(els.about.value).slice(0, 300),
    primaryColor: els.primaryColor.value || "#0f172a",
    ctaText: safeText(els.ctaText.value) || "Book on WhatsApp",
    waMessage: message,
    waLink: buildWhatsAppLink(els.whatsapp.value, message),
    callLink: buildCallLink(els.phone.value),
  };
}

function renderPreview() {
  const s = getState();
  saveProject(s);

  const servicesHtml = s.services.map(item => `
    <div class="rounded-2xl border p-4">
      <div class="font-semibold">${item}</div>
      <div class="text-sm text-slate-600">Quick response • Fair pricing • Trusted service</div>
    </div>
  `).join("");

  els.preview.innerHTML = `
    <div style="--p:${s.primaryColor};" class="min-h-[520px]">
      <section class="px-6 py-10" style="background: linear-gradient(135deg, var(--p), #111827);">
        <div class="max-w-xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
            <span class="h-2 w-2 rounded-full bg-emerald-400"></span> WhatsApp Ready
          </div>
          <h1 class="mt-4 text-3xl font-bold text-white">${s.biz || "Your Business"}</h1>
          <p class="mt-2 text-white/80">${s.tagline || "A clean one-page website that customers can contact instantly."}</p>

          <div class="mt-6 flex flex-wrap gap-2">
            <a href="${s.waLink}" target="_blank"
              class="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:opacity-90">
              ${s.ctaText}
            </a>
            <a href="${s.callLink}"
              class="rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              Call Now
            </a>
          </div>

          <div class="mt-5 text-sm text-white/70">
            📍 ${s.location || "Your Location"} • ☎ ${safeText(s.phone) || "Phone"} • 💬 ${safeText(s.whatsapp) || "WhatsApp"}
          </div>
        </div>
      </section>

      <section class="px-6 py-8">
        <h2 class="text-xl font-semibold">Services</h2>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          ${servicesHtml}
        </div>
      </section>

      <section class="px-6 pb-10">
        <h2 class="text-xl font-semibold">About</h2>
        <p class="mt-3 text-slate-700">${s.about || "Add a short description about your business..."}</p>

        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <a href="${s.waLink}" target="_blank"
            class="rounded-2xl border p-4 hover:bg-slate-50">
            <div class="font-semibold">Chat on WhatsApp</div>
            <div class="text-sm text-slate-600">Fast replies. Share your request.</div>
          </a>
          <a href="${s.callLink}"
            class="rounded-2xl border p-4 hover:bg-slate-50">
            <div class="font-semibold">Call Direct</div>
            <div class="text-sm text-slate-600">Book a service in seconds.</div>
          </a>
        </div>
      </section>

      <footer class="border-t px-6 py-5 text-xs text-slate-500">
        Built with Denwin QuickSite Builder • © ${new Date().getFullYear()}
      </footer>
    </div>
  `;
}

function setMode(next) {
  mode = next;
  els.modeBadge.textContent = mode === "mobile" ? "Mobile" : "Desktop";
  if (mode === "mobile") {
    els.previewFrame.className = "mx-auto w-[390px] max-w-full";
    els.preview.classList.add("shadow-lg");
  } else {
    els.previewFrame.className = "w-full";
    els.preview.classList.remove("shadow-lg");
  }
}

function getExportHtml() {
  const s = getState();

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

function loadDefaults() {
  const saved = loadProject();
  if (saved) {
    els.bizName.value = saved.biz || "";
    els.category.value = saved.category || "Other";
    els.tagline.value = saved.tagline || "";
    els.phone.value = saved.phone || "";
    els.whatsapp.value = saved.whatsapp || "";
    els.town.value = saved.town || "";
    els.area.value = saved.area || "";
    els.services.value = (saved.services || []).join(", ");
    els.about.value = saved.about || "";
    els.primaryColor.value = saved.primaryColor || "#0f172a";
    els.ctaText.value = saved.ctaText || "Book on WhatsApp";
  } else {
    // Nice starter
    els.bizName.value = "Denwin Movers";
    els.category.value = "Mover";
    els.tagline.value = "Fast, careful & affordable.";
    els.phone.value = "0712345678";
    els.whatsapp.value = "254712345678";
    els.town.value = "Nairobi";
    els.area.value = "Ruaka";
    els.services.value = "House Moving, Office Relocation, Packing & Wrapping, Storage";
    els.about.value = "We help families and businesses move safely, on time, and at fair prices. Serving Nairobi and nearby areas.";
    els.primaryColor.value = "#0f172a";
    els.ctaText.value = "Book on WhatsApp";
  }
}

function wire() {
  const inputs = ["bizName","category","tagline","phone","whatsapp","town","area","services","about","primaryColor","ctaText"];
  inputs.forEach(id => document.getElementById(id).addEventListener("input", renderPreview));

  els.desktopBtn.addEventListener("click", () => setMode("desktop"));
  els.mobileBtn.addEventListener("click", () => setMode("mobile"));

  els.downloadBtn.addEventListener("click", () => {
    // Save state first
    const s = getState();
    saveProject(s);
    
    // Redirect to payment gate
    window.location.href = "/pay";
  });

  els.copyWaBtn.addEventListener("click", async () => {
    const s = getState();
    await copyToClipboard(s.waLink);
    els.copyWaBtn.textContent = "Copied!";
    setTimeout(() => (els.copyWaBtn.textContent = "Copy WhatsApp Link"), 900);
  });

  setMode("desktop");
  renderPreview();
}

loadDefaults();
wire();
