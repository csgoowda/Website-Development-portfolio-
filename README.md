# WEBBROS — Digital Solutions

Static website for **WEBBROS — Digital Solutions**, a digital solutions brand offering web development, custom software solutions, digital transformation and video editing.

Built with HTML5, CSS3 and vanilla JavaScript. No framework, build step or backend. Compatible with GitHub Pages and any static host.

## Project structure

```text
.
├── index.html                  # Page markup and content
├── style.css                   # Design system and responsive styles
├── script.js                   # Navigation, scroll effects, reveal animations, WhatsApp form
├── favicon.ico
├── assets/
│   ├── webbros-logo.png        # Original logo (master file, unchanged)
│   ├── webbros-logo-nav.png    # Lightweight copy of the same logo used in the page
│   ├── favicon-32.png / favicon-48.png / favicon-512.png
│   └── apple-touch-icon.png
└── README.md
```

## Brand colours

All colours are defined once, as CSS variables at the top of `style.css`:

| Token | Value | Use |
|---|---|---|
| `--brand-navy` | `#01133D` | Primary backgrounds, navigation |
| `--brand-deep` | `#000B2B` | Hero, process and footer backgrounds |
| `--brand-cyan` | `#00E9FB` | Buttons, highlights, icons, interactive states |
| `--brand-white` | `#FFFFFF` | Text on navy, clean content sections |
| `--brand-blue` | `#168FD0` | Supporting accents, focus rings, depth |

The logo contains white lettering, so it is only placed on navy backgrounds.

## Sections

Home · About · Services · Our Work (Selected Projects) · Our Process · Contact · Footer

## Enquiry form

The form builds a pre-filled WhatsApp message in the visitor's browser and opens WhatsApp. Nothing is sent to a server. The destination is the primary number, set as `whatsappNumber` in `script.js`.

## Contact details used

- Phone / WhatsApp: +91 80954 06516 (primary WhatsApp number)
- Phone: +91 88618 98538
- Email: team.webbros@gmail.com
- Website reference (shown as text only): webbros-portfolio.pages.dev

## Pending: production domain

`og:url`, the canonical link and any `og:image` are intentionally **not set**. Once the official domain is confirmed, add to `<head>` in `index.html`:

```html
<link rel="canonical" href="https://YOUR-DOMAIN/">
<meta property="og:url" content="https://YOUR-DOMAIN/">
<meta property="og:image" content="https://YOUR-DOMAIN/assets/og-image.png">
```

## External resources

- Google Fonts (Manrope and DM Sans), with system-font fallbacks.
- WhatsApp (`wa.me`) for enquiries.
- The two live project websites shown in the preview phones. Some sites block embedding; each card has a "View Live Website" button.

## Run locally

Open `index.html` in a browser, or use VS Code Live Server (recommended when testing external previews).

## Updating content

- Text and links: `index.html`
- Colours, spacing and layout: `style.css`
- Behaviour and the WhatsApp number: `script.js`
