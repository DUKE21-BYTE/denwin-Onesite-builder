import { loadProject, buildWhatsAppLink, copyToClipboard } from "/shared/ui.js";

const panel = document.getElementById("panel");
const optFree = document.getElementById("optFree");
const optOwn = document.getElementById("optOwn");
const optDone = document.getElementById("optDone");

const project = loadProject();

function businessSummary() {
  if (!project) return "No project yet. Go to the Builder first.";
  return `${project.biz || "Your Business"} • ${project.location || ""} • WhatsApp: ${project.whatsapp || ""}`;
}

function renderFree() {
  panel.innerHTML = `
    <div class="font-semibold text-lg">Free hosting (drag & drop)</div>
    <p class="mt-2 text-sm text-slate-600">
      This is the easiest way for beginners. You will download your HTML file from the Builder, then upload it online.
    </p>

    <div class="mt-4 grid gap-3">
      <div class="rounded-2xl bg-white border p-4">
        <div class="font-semibold">Step 1 — Download your website</div>
        <div class="text-sm text-slate-600 mt-1">Go to Builder → click <b>Download HTML</b>.</div>
      </div>

      <div class="rounded-2xl bg-white border p-4">
        <div class="font-semibold">Step 2 — Upload it for free</div>
        <div class="text-sm text-slate-600 mt-1">
          Option A: Use Netlify Drop (drag & drop) <br/>
          Option B: Use any hosting upload tool
        </div>
        <div class="mt-2 text-xs text-slate-500">
          (In v1.1 we can add a one-click publish button inside the app.)
        </div>
      </div>

      <div class="rounded-2xl bg-white border p-4">
        <div class="font-semibold">Step 3 — Share your link</div>
        <div class="text-sm text-slate-600 mt-1">After upload, you’ll receive a link. Share it on WhatsApp/Instagram.</div>
      </div>

      <div class="rounded-2xl bg-white border p-4">
        <div class="font-semibold">Domains (optional)</div>
        <div class="text-sm text-slate-600 mt-1">
          A <b>domain</b> is your website name (e.g. <b>yourbusiness.co.ke</b>). You can buy later.
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
          <button id="copyDomainTip" class="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">Copy domain explanation</button>
        </div>
      </div>
    </div>

    <div class="mt-4 text-xs text-slate-500">Current project: ${businessSummary()}</div>
  `;

  document.getElementById("copyDomainTip").addEventListener("click", async () => {
    await copyToClipboard("Domain = your website name (example: yourbusiness.co.ke). Hosting = where your website lives online.");
    document.getElementById("copyDomainTip").textContent = "Copied!";
    setTimeout(() => (document.getElementById("copyDomainTip").textContent = "Copy domain explanation"), 900);
  });
}

function renderOwn() {
  panel.innerHTML = `
    <div class="font-semibold text-lg">Upload to your own hosting</div>
    <p class="mt-2 text-sm text-slate-600">
      If you already have hosting/cPanel, download your file then upload it to <b>public_html</b>.
    </p>

    <div class="mt-4 grid gap-3">
      <div class="rounded-2xl bg-white border p-4">
        <div class="font-semibold">Step 1 — Download HTML</div>
        <div class="text-sm text-slate-600 mt-1">Builder → <b>Download HTML</b>.</div>
      </div>

      <div class="rounded-2xl bg-white border p-4">
        <div class="font-semibold">Step 2 — Upload to hosting</div>
        <div class="text-sm text-slate-600 mt-1">
          cPanel → File Manager → open <b>public_html</b> → upload the HTML file.
        </div>
      </div>

      <div class="rounded-2xl bg-white border p-4">
        <div class="font-semibold">Step 3 — Set as home page</div>
        <div class="text-sm text-slate-600 mt-1">
          Rename your file to <b>index.html</b> if needed.
        </div>
      </div>
    </div>

    <div class="mt-4 text-xs text-slate-500">Current project: ${businessSummary()}</div>
  `;
}

function renderDone() {
  const biz = project?.biz || "My business";
  const wa = project?.whatsapp || "";
  const phone = project?.phone || "";
  const loc = project?.location || "";
  const msg = `Hi Denwin, please publish my website. Business: ${biz}. Location: ${loc}. Phone: ${phone}. WhatsApp: ${wa}.`;

  // Put YOUR business WhatsApp number here (your own):
  const DENWIN_NUMBER = "254758596269";

  const link = buildWhatsAppLink(DENWIN_NUMBER, msg);

  panel.innerHTML = `
    <div class="font-semibold text-lg">Done-For-You publishing</div>
    <p class="mt-2 text-sm text-slate-600">
      If the client doesn’t want to handle hosting/domains, they can pay you and you publish it for them.
    </p>

    <div class="mt-4 rounded-2xl bg-white border p-4">
      <div class="font-semibold">Message that will be sent</div>
      <div class="mt-2 text-sm text-slate-700 whitespace-pre-wrap">${msg}</div>

      <div class="mt-3 flex flex-wrap gap-2">
        <a href="${link}" target="_blank"
           class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
          Open WhatsApp & Send
        </a>
        <button id="copyMsg" class="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50">Copy Message</button>
      </div>

      <div class="mt-2 text-xs text-slate-500">
        Change DENWIN_NUMBER inside <code>publish.js</code> to your real WhatsApp number.
      </div>
    </div>

    <div class="mt-4 text-xs text-slate-500">Current project: ${businessSummary()}</div>
  `;

  document.getElementById("copyMsg").addEventListener("click", async () => {
    await copyToClipboard(msg);
    document.getElementById("copyMsg").textContent = "Copied!";
    setTimeout(() => (document.getElementById("copyMsg").textContent = "Copy Message"), 900);
  });
}

function wire() {
  optFree.addEventListener("click", renderFree);
  optOwn.addEventListener("click", renderOwn);
  optDone.addEventListener("click", renderDone);
  renderFree(); // default
}

wire();
