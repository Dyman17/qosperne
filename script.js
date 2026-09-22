// Qos Perne — landing logic
// TODO(владелец): заменить WHATSAPP_URL на реальный инвайт

const WHATSAPP_URL = "https://chat.whatsapp.com/PLACEHOLDER_QOSPERNE";

const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger?.addEventListener("click", () => mobileMenu.classList.toggle("open"));
mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Nav shadow
addEventListener("scroll", () => {
  nav.style.boxShadow = scrollY > 30 ? "0 10px 40px rgba(0,0,0,.4)" : "none";
}, { passive: true });

// Repertoire demo search (подключим к /api/search позже — см. ROADMAP.md)
const repInput = document.getElementById("repInput");
const repBtn = document.getElementById("repBtn");
const repHint = document.getElementById("repHint");

async function repSearch() {
  const q = (repInput.value || "").trim();
  if (!q) { repHint.textContent = "Алдымен күй атын жаз 🌙"; return; }
  repHint.textContent = `«${q}» ізделуде… (демо — БД қосылғанда нақты нәтиже шығады)`;
  // Будущее: const res = await fetch(`/api/search?piece=${encodeURIComponent(q)}`);
  document.querySelectorAll(".rep-tags span").forEach(s => {
    if (s.textContent.toLowerCase().includes(q.toLowerCase())) {
      s.style.background = "rgba(201,162,39,.35)";
      setTimeout(() => s.style.background = "", 1200);
    }
  });
}
repBtn?.addEventListener("click", repSearch);
repInput?.addEventListener("keydown", e => { if (e.key === "Enter") repSearch(); });
document.querySelectorAll(".rep-tags span").forEach(s =>
  s.addEventListener("click", () => { repInput.value = s.textContent; repSearch(); })
);

// Если владелец вставит реальный WhatsApp линк — ничего менять в коде не надо,
// достаточно заменить href в index.html. Эта константа — для будущих форм.
console.log("Qos Perne ready. WhatsApp:", WHATSAPP_URL);
