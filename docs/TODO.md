# Fix Intro Loader - Implementation Plan

## Steps
- [x] Gather information and create plan
- [ ] Create shared `docs/js/loader.js` with robust loader logic
- [ ] Update `docs/index.html` to link loader.js and remove inline loader logic
- [ ] Update `docs/about.html` to link loader.js and remove inline loader logic
- [ ] Add `.hidden { display: none !important; }` to `docs/css/homepage.css`
- [ ] Update `docs/js/homepage.js` to remove inline `initLoader` function
- [ ] Verify no other pages have isolated loader logic
- [ ] Test the loader on index.html and about.html

## Details
- loader.js will handle `.intro-loader` with `DOMContentLoaded`, a 2.5s timeout, and `transitionend` to add `.hidden` after fade completes.
- All pages using the loader will include `<script src="../js/loader.js"></script>` before other scripts.
- CSS `.hidden` prevents the loader from blocking interactions after fade-out.
- Remove duplicated inline loader JS from index.html and about.html.
