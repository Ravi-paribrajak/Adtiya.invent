# Code & Diagram Hub

A premium, high-performance web platform built to share C++ code snippets, wiring diagrams, and project tutorials. Designed with a mobile-first, SaaS-level user experience to seamlessly convert social media traffic into engaged platform users.

## 🚀 Tech Stack

This project is built on the bleeding edge of modern web development:

* **Framework:** Next.js 16 (App Router)
* **Core Library:** React 19
* **Styling:** Tailwind CSS v4 (CSS-first architecture)
* **Database & Auth:** Supabase (PostgreSQL)
* **Storage:** Supabase Storage Buckets
* **Animations:** Framer Motion
* **Icons:** Lucide React

## ✨ Key Features

* **Premium UI/UX:** Glassmorphic navigation, smooth hover physics, and Framer Motion page reveals.
* **System-Aware Dark Mode:** Flawless light/dark theme toggling using `next-themes` that respects user OS preferences.
* **Optimized Image Delivery:** Next.js `<Image>` components with custom NAT64 bypass routing for lightning-fast, lazy-loaded custom thumbnails and circuit diagrams.
* **Developer-First Code Blocks:** Native VS Code styling (`react-syntax-highlighter`) with C++ syntax highlighting, line numbers, and a 1-click "Copy Code" interactive button.
* **Perceived Performance:** Implementation of `loading.tsx` skeleton loaders to eliminate layout shift and blank screens during database fetching.
* **Custom Admin Control Center:** Secure, multi-file upload dashboard for publishing new projects (Thumbnail + Diagram) with React Hot Toast state feedback and custom client-side validation.

## 🛠️ Getting Started Locally

To run this project on your local machine, follow these steps:

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd code-and-diagram-hub
npm install