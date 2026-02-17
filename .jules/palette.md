## 2025-02-14 - [Ensuring Global Styles and Accessible Form Controls]
**Learning:** In Next.js/Tailwind projects, missing global CSS imports in the root layout can silently break the entire UI's styling. Additionally, basic form inputs like mint amount frequently lack semantic labels, which is a critical accessibility barrier.
**Action:** Always verify that `globals.css` is imported in `layout.tsx` and ensure every form input has a corresponding `<label>` with `htmlFor`.
