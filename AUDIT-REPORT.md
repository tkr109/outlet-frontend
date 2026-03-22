# UI Audit Report — P. Corner Food Ordering App

**Date:** 2026-03-22
**Branch:** `audit/ui-bugs`
**Stack:** Next.js 14.2, React 18.3, Tailwind CSS 3.4, JavaScript (JSX)

---

## Executive Summary

**Total verified issues: 20**

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 6 |
| Medium | 6 |
| Low | 6 |

### Top 3 Most Important Problems

1. **"P Corner Special" cart bug** — Adding the signature item puts a phantom entry in the cart (€0 subtotal, invisible in checkout/receipt). Live-tested and confirmed.
2. **Cart lost on page refresh** — Cart is React state only, no persistence. Any refresh or hard navigation wipes the entire order. Live-tested and confirmed.
3. **Wrong brand in browser tab & order IDs** — Tab says "Ghar Ka Zaika", order IDs prefix with `GKZ-` instead of `P. Corner` / `PC-`.

---

## Findings

### CRITICAL

#### F1. "P Corner Special" cart bug — broken item ID

- **Severity:** Critical
- **Category:** Data / Cart logic
- **Location:** `app/order/page.jsx:198`
- **How to reproduce:** Go to `/order` → scroll to "Souvlaki & Doner" → click the "+" button on P Corner Special → observe the checkout bar still shows €0.00
- **Evidence:** Live-tested in browser. After clicking add, `cartCount` increments (Checkout button becomes active) but subtotal stays €0.00. The item never appears in cart page or checkout summary.
- **Why it matters:** A customer can "order" the restaurant's signature item and it will be completely missing from their order — wrong total charged, item absent from WhatsApp message and receipt.
- **Root cause:** `updateQty(section.special.name, 1)` uses the string `'P Corner Special'` as the cart key. But `allItems` comes from `menu.flatMap(c => c.items)` — the special lives on `section.special`, not in `items[]`. The `subtotal` reducer never matches it. Additionally, there are two prices (Normal €5, Large €8) but only one add button — no size selection.
- **Fix direction:** Give the special a proper `id` (e.g., `'pcorner-special'`), add it to the `items` array or handle it separately in subtotal calculation, and add size selection UI.

#### F2. Cart state is memory-only — lost on refresh

- **Severity:** Critical
- **Category:** State management
- **Location:** `lib/CartContext.jsx:9`
- **How to reproduce:** Add items to cart → refresh the page (F5) → cart is empty
- **Evidence:** Live-tested — navigating via full reload showed empty cart. Code confirms `useState({})` with no localStorage sync.
- **Why it matters:** Users lose their entire order on any page refresh, browser back, or if they open a link in a new tab. Critical for a food ordering app.
- **Root cause:** Cart state is purely in-memory React context with no persistence layer.
- **Fix direction:** Sync cart to `localStorage` — initialize from localStorage in `useState`, write on every `setCart` update.

---

### HIGH

#### F3. Branding mismatch — "Ghar Ka Zaika" vs "P. Corner"

- **Severity:** High
- **Category:** Branding / Metadata
- **Locations:**
  - `app/layout.jsx:21`: `title: 'Ghar Ka Zaika'`
  - `app/order/page.jsx:40`: Order ID prefix `GKZ-`
- **How to reproduce:** Open the app → check the browser tab title → it says "Ghar Ka Zaika"
- **Evidence:** Verified in Playwright — page title returned `"Ghar Ka Zaika"` on every navigation.
- **Why it matters:** Wrong brand name in browser tab, bookmarks, search history, and order IDs.
- **Fix direction:** Change `title` to `'P. Corner'`, change order prefix to `'PC-'`.

#### F4. Service/Delivery fees appear to be €10/€25 instead of €0.10/€0.25

- **Severity:** High
- **Category:** Business logic
- **Locations:**
  - `app/order/page.jsx:22-23`: `serviceFee = 10`, `deliveryFee = 25`
  - `app/cart/page.jsx:13`: `serviceFee = 10`
- **How to reproduce:** Add any item → go to cart → see Service Fee: €10.00
- **Why it matters:** A €10 service fee on a €1 yoghurt is 1000% markup. Likely incorrect.
- **Fix direction:** Verify with owner. Likely change to `0.10` and `0.25`.

#### F5. TimingCard renders `label` prop twice

- **Severity:** High
- **Category:** UI bug
- **Location:** `app/page.jsx:368-374`
- **How to reproduce:** Scroll to the timing cards on homepage → see "Daily" appears twice on the Takeaway card and "Daily window" appears twice on the Delivery card.
- **Evidence:** Confirmed via accessibility snapshot and visual inspection.
- **Why it matters:** Visually confusing duplicate text.
- **Root cause:** `TimingCard` renders `{label}` on both left side (line 369) and right side (line 374).
- **Fix direction:** Remove the right-side `{label}` rendering (lines 373-375).

#### F6. Carousel items don't match the actual menu

- **Severity:** High
- **Category:** Content / Data integrity
- **Location:** `components/ChefChoiceCarousel.jsx:6-49`
- **How to reproduce:** Load homepage → carousel shows "Smoked Truffle Rib-Eye", "Wagyu Beef Burger", "Wood-Fired Pizza" etc.
- **Evidence:** Screenshot confirms. None of these items exist on the `/order` menu.
- **Why it matters:** Misleading for customers — premium items shown that aren't available.
- **Fix direction:** Replace carousel items with actual menu highlights from `homepage.featuredItemIds`.

#### F7. Form labels not linked to inputs (a11y)

- **Severity:** High
- **Category:** Accessibility
- **Location:** `app/order/page.jsx:83-101`
- **How to reproduce:** Inspect checkout form — `<label>` elements lack `htmlFor`, `<input>` elements lack `id`.
- **Why it matters:** WCAG 2.1 Level A violation. Screen readers can't associate labels with inputs.
- **Fix direction:** Add matching `htmlFor`/`id` pairs.

#### F8. SwipeConfirm has no keyboard alternative

- **Severity:** High
- **Category:** Accessibility
- **Location:** `components/SwipeConfirm.jsx`
- **How to reproduce:** Navigate to checkout with keyboard → impossible to confirm order.
- **Why it matters:** WCAG 2.1 Level A violation (2.1.1 Keyboard). Keyboard-only users cannot complete orders.
- **Fix direction:** Add a keyboard-accessible fallback (button or Enter/Space handler).

---

### MEDIUM

#### F9. Hardcoded Tailwind colors diverge from design tokens

- **Severity:** Medium
- **Category:** Design system consistency
- **Locations:**
  - `components/TopAppBar.jsx:23`: `text-orange-500` (Tailwind `#f97316`) instead of `text-primary` (`#ff9069`)
  - `components/BottomNav.jsx:12-23`: `text-orange-500`, `bg-zinc-900/80`, `text-zinc-500`, `shadow-orange-500/10`
  - `app/order/page.jsx:371,394`: `text-zinc-500` in add buttons
  - `app/page.jsx:123,132`: inline `style={{ backgroundColor: '#201f1f' }}` (is `surface-container-high`)
  - `app/layout.jsx:38`: `bg-[#0e0e0e]` (is `bg-surface`)
  - `components/Drawer.jsx:42`: `bg-[#141414]/95` (close to `surface-container-low` `#131313`)
  - `components/Drawer.jsx:91`: `text-red-400` instead of `text-error`
- **Fix direction:** Replace all hardcoded Tailwind defaults with custom design tokens.

#### F10. Checkout label styling inconsistency

- **Severity:** Medium
- **Category:** Visual inconsistency
- **Location:** `app/order/page.jsx:83-100`
- **Evidence:** "Full Name" label uses `text-primary`, all others use `text-on-surface-variant`.
- **Fix direction:** Use same color for all labels.

#### F11. "Take Screenshot" button opens Print dialog

- **Severity:** Medium
- **Category:** Misleading UI
- **Location:** `app/success/page.jsx:144-149`
- **Evidence:** Button calls `window.print()` but label says "Take Screenshot".
- **Fix direction:** Rename to "Print Receipt" or implement actual screenshot.

#### F12. WhatsApp popup may be blocked

- **Severity:** Medium
- **Category:** Order flow reliability
- **Location:** `app/order/page.jsx:59`
- **Evidence:** `window.open(url, '_blank')` with no fallback. If blocked, order appears successful but WhatsApp message is never sent.
- **Fix direction:** Use `window.location.href` instead, or check if popup was blocked.

#### F13. Suspense wrapper has no fallback UI

- **Severity:** Medium
- **Category:** UX / Loading state
- **Location:** `app/order/page.jsx:240`
- **Evidence:** `<Suspense>` with no `fallback` prop.
- **Fix direction:** Add a loading fallback.

#### F14. Phone numbers inconsistency

- **Severity:** Medium
- **Category:** Data integrity
- **Location:** `lib/data.js:8,17,23,28`
- **Evidence:** Three distinct phone numbers across data — `ownerWhatsApp: '35794562759'`, Call link: `+35799166646`, socials: `99-955764` and `99-166646`.
- **Fix direction:** Verify correct numbers with the owner and consolidate.

---

### LOW

#### F15. `emptyCustomer` has unused fields

- **Location:** `lib/constants.js:15-17`
- **Evidence:** `city`, `pincode`, `notes` defined but never used in any form.

#### F16. Dead code paths in section components

- **Location:** `app/order/page.jsx:249-250, 298-299, 336-337`
- **Evidence:** `smallItems`/`listItems` branches never execute since all items have images.

#### F17. ListSection ignores item images

- **Location:** `app/order/page.jsx:383-401`
- **Evidence:** Sandwiches, Souvlaki, Drinks, Sides have images in data but `ListSection` doesn't render them.

#### F18. Duplicate images in data

- **Location:** `lib/data.js:73-74, 96-97, 148-150`
- **Evidence:** 3 pairs of menu items share identical Unsplash URLs.

#### F19. CSS double-declaration on body

- **Locations:** `app/globals.css:7-8` and `app/layout.jsx:38`
- **Evidence:** Both set background-color and color on body. Redundant.

#### F20. `select-none` on body prevents all text selection

- **Location:** `app/layout.jsx:38`
- **Evidence:** Users cannot select/copy the restaurant address, phone number, or order ID.

---

## Redundancies / Cleanup Opportunities

| Type | Location | Description |
|------|----------|-------------|
| Duplicate styling | `globals.css:7-8` + `layout.jsx:38` | Body bg/color set in both CSS and Tailwind class |
| Dead code | `constants.js:15-17` | `city`, `pincode`, `notes` fields never used |
| Dead code paths | `order/page.jsx:249-292` | `smallItems`/`listItems` branches never execute |
| Inline hex vs token | `page.jsx:123,132` | `style={{ backgroundColor: '#201f1f' }}` should be `bg-surface-container-high` |
| Naming collision | `globals.css:37-39` | Custom `.delay-75` shadows Tailwind's built-in `delay-75` |
| Duplicate images | `data.js:73-74, 96-97, 148-150` | 3 pairs of items share identical Unsplash URLs |

---

## Positive Findings

- Build is clean — zero errors or warnings
- No JavaScript console errors at runtime
- No horizontal overflow at any viewport
- Drawer implementation is solid — Escape key, scroll lock, backdrop click all work
- Good semantic HTML structure — proper heading hierarchy, landmark regions
- Carousel transitions are smooth with accessible dot indicators
- Design token system is well-defined (60+ Material Design 3 tokens)
- Cart +/- controls work correctly for valid items
- Responsive layout holds from 390px to 1440px
- Success page redirect works correctly
- Font loading is optimized via `next/font`

---

## Unknowns

| Item | Reason |
|------|--------|
| Service fee amounts (€10/€25) | Could be intentional. Requires owner confirmation. |
| Phone number correctness | Three distinct numbers. Cannot verify without owner. |
| Google Maps iframe | May have CSP restrictions in some browsers. |
| SwipeConfirm on real mobile | Touch behavior not tested on physical devices. |
| Image load reliability | All from Unsplash CDN with no local fallbacks. |
