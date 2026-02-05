# Denwin QuickSite Builder

**Denwin QuickSite Builder** is a "One-Page Website Generator" designed for small local businesses in Kenya (movers, plumbers, electricians). It allows users to create a high-quality, WhatsApp-ready website in seconds without writing a single line of code.

![Denwin QuickSite Preview](assets/hero-mockup.png)

## 🚀 Key Features

- **Instant Generation**: Enter basic details (Name, Services, Phone) and get a website instantly.
- **Mobile-First Design**: Fully responsive, professional clean UI/UX built with TailwindCSS.
- **WhatsApp Ready**: "Chat" and "Call" buttons pre-configured for high conversion.
- **No Database Needed**: The builder runs entirely in the browser. State is saved securely in `localStorage`.
- **Secure**:
  - **Pins**: Basic hashed pin protection for local sessions.
  - **Data Privacy**: No user data is sent to our servers; it stays on the user's device.
- **Downloadable**: Users can download a single `index.html` file that is ready to host anywhere (Netlify, Vercel, or manually shared).

## 🛠 Tech Stack

- **HTML5 & JavaScript (ES6 Modules)**: No complex frameworks. Just pure, fast, sustainable web standards.
- **TailwindCSS (CDN)**: Utilized for consistent, rapid styling.
- **Vercel / Local Storage**: Optimized for static hosting and client-side persistence.

## 📂 Project Structure

```
/
├── app/            # The core builder application logic (UI & State)
├── assets/         # Images and static assets
├── help/           # Help center / Documentation page
├── legal/          # Terms of Service & Disclaimer
├── pay/            # Payment gateway simulation page
├── publish/        # Instructions on how to host the downloaded site
├── shared/         # Reusable utilities (UI helpers, Security module)
└── templates/      # Templates gallery
```

## 🔒 Security

This project implements client-side security best practices:

- **CSP & Headers**: Configured via `vercel.json` for clickjacking and XSS protection.
- **Pin Safety**: PINs are hashed (SHA-256) and rate-limited to prevent brute-forcing.
- **Data Obfuscation**: Local storage checks prevent casual snooping.

## 🏃‍♂️ How to Run

1.  Clone the repository:
    ```bash
    git clone https://github.com/DUKE21-BYTE/denwin-Onesite-builder.git
    ```
2.  Open `index.html` in your browser.
    - _Note: For modules to work correctly, you may need to use a local server._

    ```bash
    # Python 3
    python -m http.server 3000

    # Node.js
    npx serve .
    ```

3.  Navigate to `http://localhost:3000`

## 📄 License

This project is proprietary. Generated websites are licensed to the user for personal/business use upon payment.

---

_Built with ❤️ in Kenya for local hustle._
