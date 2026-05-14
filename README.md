# Gushwork Frontend Assignment Submission

This repository contains a production-ready, responsive product-detail webpage implementation based on the provided Figma export and screenshot instructions.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- No framework or build tool

## Project Structure

- `index.html` - complete page markup and modal markup
- `styles.css` - global styles, section styles, responsive breakpoints
- `script.js` - all client-side interactivity
- `assets/` - images and icons used by the UI
- `14/` - provided Figma export assets and PDFs used as assignment references

## How to Run

No installation is required.

1. Open PowerShell in the project root:
   - `c:\Projects\Gushwork-Assignment`
2. Run:
   - `start index.html`

You can also open `index.html` directly in any modern browser.

## Assignment Scope Completed

### 1. Pixel-accurate responsive layout behavior

Implemented container and fold spacing rules based on provided screenshots while preserving max content width constraints:

- All components capped at `1240px` max width
- `<= 1600px`: `100px` padding on all sides
- `<= 1200px`: `80px` padding on all sides
- `<= 1080px`: top/bottom `80px`, left/right `60px`
- `<= 800px`: top/bottom `80px`, left/right `48px`
- `<= 360px`: top/bottom `48px`, left/right `16px`

### 2. First-fold/product page implementation

- Header/nav with logo, links, and CTA
- Breadcrumb + hero grid
- Product gallery with thumbnails and navigation
- Certification chips and key product content
- Pricing and policy card

### 3. Interactions and state behavior

- Sticky summary header after first fold while scrolling
- Product image switch via thumbnails/prev-next controls
- Hover zoom (desktop pointer-capable devices)
- FAQ accordion behavior
- Process section dynamic tab/step updates
- Carousel-like behaviors for applications/testimonials/logo strips

### 4. Modal behavior required by screenshots

- `Download Full Technical Datasheet` opens brochure/email modal (`quote modal`)
- `Request a Quote` opens callback modal (`expert modal`)
- Modals support close via:
  - close icon
  - backdrop click
  - `Esc` key
- Body scroll lock while modal is open

## Accessibility and UX Notes

- Semantic headings and sectioning are used throughout the page
- Buttons and interactive elements remain keyboard-focusable
- Modal dialogs include `role="dialog"` and `aria-modal="true"`
- Form validation behavior included for email-gated brochure flow

## Assumptions

- This assignment is expected as a static frontend implementation (no API integration was provided)
- Submitted content text/images are based on given project assets
- Since no test framework or package scripts exist, validation is done via code-level checks and browser behavior

## Known Limitations

- No automated unit/integration tests are configured in this repository
- Forms are UI-level only (no backend submission endpoint)

## Final Notes

The implementation follows existing code patterns in this repo and keeps changes focused, maintainable, and assignment-ready.
