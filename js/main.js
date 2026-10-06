"use strict";
/* CECI & SIP — main script */
const WA_NUMBER = "917019049479";
const WA_DEFAULT = "Hi! I'd like to place an order at Ceci & Sip.";
const waLink = (m) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(m)}`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* WhatsApp links */
$$("[data-wa]").forEach((a) => (a.href = waLink(WA_DEFAULT)));

/* Mobile menu */
const burger = $("#burger"), navLinks = $("#navLinks");
function toggleMenu(open) {
  navLinks.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
burger.addEventListener("click", () => toggleMenu(!navLinks.classList.contains("open")));
$$("a", navLinks).forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
document.addEventListener("click", (e) => { if (!e.target.closest(".nav")) toggleMenu(false); });

/* Search */
const cards = $$(".product-card"), groups = $$(".menu-group"), emptyMsg = $("#searchEmpty");
$("#searchInput").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  let shown = 0;
  cards.forEach((c) => {
    const match = !q || c.textContent.toLowerCase().includes(q);
    c.hidden = !match;
    if (match) shown++;
  });
  groups.forEach((g) => (g.hidden = !$(".product-card:not([hidden])", g)));
  emptyMsg.hidden = shown > 0;
});
/* Flip cards */
cards.forEach((card) => {
  const front = $(".flip-front", card);
  const back = $(".flip-back", card);
  const trigger = $(".flip-trigger", card);

  const set = (on) => {
    card.classList.toggle("is-flipped", on);

    if (front) front.inert = on;
    if (back) back.inert = !on;

    if (trigger) {
      trigger.setAttribute("aria-expanded", String(on));
    }
  };

  set(false);

  card.addEventListener("click", (e) => {
    if (e.target.closest(".add-button")) return;
    set(!card.classList.contains("is-flipped"));
  });
});

/* Cart */
const KEY = "ceciandsip-cart";
let cart = [];
try {
  const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
  if (Array.isArray(saved)) cart = saved.filter((i) => i && typeof i.name === "string" && i.price >= 0 && i.quantity > 0);
} catch (_) {}

const drawer = $("#cartDrawer"), overlay = $("#cartOverlay"), closeBtn = $("#closeCart");
const itemsEl = $("#cartItems"), countEl = $("#cartCount"), totalEl = $("#cartTotal");
let lastFocus = null;

function openCart() {
  lastFocus = document.activeElement;
  drawer.inert = false;
  drawer.classList.add("open"); overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  closeBtn.focus();
}
function closeCart() {
  if (!drawer.classList.contains("open")) return;
  drawer.classList.remove("open"); overlay.classList.remove("open");
  drawer.inert = true;
  document.body.style.overflow = "";
  lastFocus?.focus?.();
}
$("#cartButton").addEventListener("click", openCart);
closeBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

const total = () => cart.reduce((s, i) => s + i.price * i.quantity, 0);

function renderCart() {
  countEl.textContent = cart.reduce((s, i) => s + i.quantity, 0);
  totalEl.textContent = `₹${total()}`;
  try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (_) {}
  if (!cart.length) {
    itemsEl.innerHTML = `<div class="empty-cart"><span>+</span><p>Your cart is empty.</p><small>Add something delicious from the menu.</small></div>`;
    return;
  }
  itemsEl.innerHTML = cart.map((i, n) => `
    <div class="cart-item">
      <div><div class="cart-item-name">${esc(i.name)}</div>
      <div class="cart-item-price">${i.price ? "₹" + i.price : "Included with bowl"}</div></div>
      <div class="quantity">
        <button type="button" data-act="minus" data-i="${n}" aria-label="Remove one ${esc(i.name)}">−</button>
        <strong aria-live="polite">${i.quantity}</strong>
        <button type="button" data-act="plus" data-i="${n}" aria-label="Add one ${esc(i.name)}">+</button>
      </div>
    </div>`).join("");
}

itemsEl.addEventListener("click", (e) => {
  const b = e.target.closest("[data-act]");
  if (!b) return;
  const i = Number(b.dataset.i);
  cart[i].quantity += b.dataset.act === "plus" ? 1 : -1;
  if (cart[i].quantity <= 0) cart.splice(i, 1);
  renderCart();
});

$$(".add-button").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const { name, price } = btn.closest(".product-card").dataset;
    const found = cart.find((i) => i.name === name);
    found ? found.quantity++ : cart.push({ name, price: Number(price) || 0, quantity: 1 });
    renderCart();
    openCart();
  })
);

/* WhatsApp checkout */
function orderMessage() {
  if (!cart.length) return WA_DEFAULT;
  const lines = cart.map((i) => `• ${i.name} × ${i.quantity}` + (i.price ? ` — ₹${i.price * i.quantity}` : ""));
  return `Hi Ceci & Sip! I'd like to place an order:\n\n${lines.join("\n")}\n\nTotal: ₹${total()}`;
}
const order = () => window.open(waLink(orderMessage()), "_blank", "noopener");
["#cartWhatsApp", "#orderNow", "#footerOrder"].forEach((s) => $(s)?.addEventListener("click", order));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeCart(); toggleMenu(false); }
});

/* Videos: lazy-load the 4-video strip, play only while visible */
const hero = $(".hero video");
if (reduceMotion && hero) hero.pause();
const strip = $$(".video-col video");
if (strip.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) {
        if (!v.getAttribute("src") && v.dataset.src) v.src = v.dataset.src;
        if (!reduceMotion) v.play().catch(() => {});
      } else v.pause();
    });
  }, { threshold: 0.25 });
  strip.forEach((v) => io.observe(v));
}

renderCart();
