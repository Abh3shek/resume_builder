# 📄 Resume Builder – A Progressive Web App (PWA)

A modern **Resume Builder** built entirely with **HTML, CSS, and JavaScript**, focused on **performance**, **offline support**, and **persistent storage** using modern browser APIs.

This app works even without internet after the first visit, auto-saves your resume progress, and lets you export a PDF of your resume. Designed with future extensibility in mind.

---

## 📌 Features Implemented (Phase 1 & 2)

### ✅ 1. Landing + Onboarding Flow

- Start screen with a clear call-to-action (`Start`)
- Multi-step form navigation (`Next` / `Prev` / `Finish`)
- Dynamic progress bar

### ✅ 2. Resume Data Handling

- Real-time input capture from all form fields
- Auto-saving every input using **IndexedDB**
- **🔥 Debouncing** added to limit frequent IndexedDB writes — **ensures optimal performance**

### ✅ 3. Resume Persistence

- On app load, checks if resume exists in IndexedDB:
  - ✅ Yes → Loads and auto-fills form
  - ❌ No → Starts with a blank form
- User can pick up where they left off — **even after refreshing or closing the browser**

### ✅ 4. Export to PDF

- Uses `html2pdf.js` to convert the preview section to a **downloadable PDF**
- Triggered with `Export` button (Phase 2C)
- PDF is clean, raw, and includes all user data

### ✅ 5. Offline-First Support with Service Workers

- App works even without internet after first visit
- Assets and shell cached using **Cache Storage API**
- Powered by **Service Worker**, which:
  - Caches static files during install
  - Serves from cache if network is unavailable
  - Caches future network requests as fallback
  - **Ensures the app is usable offline**

### ✅ 6. Local Storage (for lightweight preferences)

- Although the resume data is in IndexedDB, lightweight user preferences (like last used theme) can be stored using `localStorage` (prepared for future use)

---

## 🧠 Application Architecture (Flow)

![Resume App Flowchart](/assets/images/flowchart.png)

## 🧠 Technologies Used

| **Technology**             | **Description**                                                     |
| -------------------------- | ------------------------------------------------------------------- |
| **HTML + CSS**             | UI layout and structure                                             |
| **JavaScript (Vanilla)**   | Handles all logic, data flow, and event handling                    |
| **Service Workers**        | Implements background caching and offline support                   |
| **Cache Storage API**      | Stores the app shell and other static assets for offline access     |
| **IndexedDB**              | Saves form data persistently, enabling resuming incomplete resumes  |
| **Debouncing (Custom)**    | Efficiently saves data to IndexedDB without overloading the storage |
| **localStorage**           | Stores lightweight settings (future scope for further enhancements) |
| **html2pdf.js**            | Converts resume data to a PDF for easy exporting and printing       |
| **File System Access API** | (Planned) Enables saving resume files locally in supported browsers |

## 🧪 Current Limitations

- **Minimal styling**: The UI is currently raw and functional, without much design or visual enhancements.
- **Single resume instance**: Only one resume can be saved at a time (no support for multiple projects yet).
- **No authentication or cloud sync**: Users cannot sign in or sync their resumes across devices or browsers.
- **No sharable or hosted resumes**: Resumes cannot be easily shared via a URL or hosted online.
- **Limited editor features**: There is no rich text formatting or component-based editor at this time.

## 📢 Status

The project is in active development.

Everything is built from scratch using native web technologies — no frameworks, no libraries (except for **html2pdf.js**).

## 🔗 Links

- **🌍 [Link to Deployed Site](https://resume-builder-abh3shek.surge.sh)**: Try the app live in your browser.

## 📦 Made By

- **[GitHub Repository](https://github.com/abh3shek)**

## 🙌 Final Note

This is a foundational resume builder built with clean architecture and future extensibility in mind.  
Expect many features to roll out soon.
