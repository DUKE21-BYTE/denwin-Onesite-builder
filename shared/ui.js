// Shared helpers
export function safeText(s) {
  return (s || "").toString().replace(/[<>]/g, "");
}

export function slugify(s) {
  return (s || "business")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatServices(raw) {
  const items = (raw || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 6);
  return items.length ? items : ["Service 1", "Service 2", "Service 3"];
}

export function digitsOnly(s) {
  return (s || "").toString().replace(/\D/g, "");
}

export function buildWhatsAppLink(number, message) {
  const digits = digitsOnly(number);
  const text = encodeURIComponent(message || "");
  return `https://wa.me/${digits}?text=${text}`;
}

export function buildCallLink(phone) {
  const digits = digitsOnly(phone);
  return `tel:${digits}`;
}

export function saveProject(state) {
  localStorage.setItem("dqsb_project_v1", JSON.stringify(state));
}

export function loadProject() {
  try {
    const raw = localStorage.getItem("dqsb_project_v1");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function download(filename, content, mime = "text/html;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}
