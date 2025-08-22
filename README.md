# Portfolio Next.js - Rifqi Haikal Chairiansyah

Portfolio profesional yang dibangun dengan Next.js 14, TypeScript, dan Tailwind CSS. Menampilkan desain modern, responsif, dengan fitur dark mode dan multi-bahasa.

## 🚀 Fitur Utama

- ⚡ **Next.js 14** dengan App Router
- 🎨 **Tailwind CSS** untuk styling yang cepat dan konsisten  
- 📱 **Fully Responsive** - Optimal di semua perangkat
- 🌙 **Dark Mode** - Toggle tema terang/gelap
- 🌐 **Multi-bahasa** - Support Bahasa Indonesia & Inggris
- ✨ **Animasi** - AOS, Framer Motion, dan animasi custom
- 🎯 **TypeScript** - Type safety dan better DX
- 📊 **SEO Optimized** - Meta tags dan structured data

## 📁 Struktur Proyek

```
portfolio-nextjs/
├── public/
│   └── assets/         # Gambar dan file PDF
├── src/
│   ├── app/
│   │   ├── layout.tsx  # Root layout
│   │   ├── page.tsx    # Homepage
│   │   └── globals.css # Global styles
│   ├── components/
│   │   ├── sections/   # Komponen section (Hero, About, dll)
│   │   ├── shared/     # Komponen reusable
│   │   └── ui/         # UI components
│   ├── context/
│   │   └── LanguageContext.tsx
│   ├── data/
│   │   └── portfolio.ts # Data portfolio
│   └── types/
│       └── index.ts     # TypeScript definitions
```

## 🛠️ Instalasi

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Setup Langkah demi Langkah

1. **Clone atau buat proyek baru:**
```bash
npx create-next-app@latest portfolio-nextjs --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

2. **Install dependencies:**
```bash
cd portfolio-nextjs
npm install framer-motion aos react-type-animation next-themes lucide-react
npm install --save-dev @types/aos
```

3. **Copy semua file yang telah disediakan ke lokasi yang sesuai**

4. **Copy assets dari proyek lama:**
```bash
# Copy semua gambar dan PDF ke public/assets/
cp -r path/to/old/assets/* public/assets/
```

5. **Jalankan development server:**
```bash
npm run dev
```

6. **Buka browser:**
```
http://localhost:3000
```

## 📝 File yang Perlu Dibuat

Berdasarkan artifact yang telah saya berikan, berikut urutan pembuatan file:

1. **tailwind.config.ts** - Konfigurasi Tailwind
2. **src/types/index.ts** - Type definitions
3. **src/data/portfolio.ts** - Data configuration
4. **src/context/LanguageContext.tsx** - Language context
5. **src/components/shared/Providers.tsx** - Providers wrapper
6. **src/components/shared/LoadingScreen.tsx** - Loading component
7. **src/app/layout.tsx** - Root layout
8. **src/app/page.tsx** - Main page
9. **src/components/sections/Navbar.tsx** - Navigation
10. **src/components/sections/Hero.tsx** - Hero section
11. **Komponen section lainnya** (About, Skills, Experience, Projects, Certificates, Contact, Footer)

## 🎨 Kustomisasi

### Mengubah Warna Theme
Edit file `tailwind.config.ts`:
```javascript
colors: {
  'primary-green': '#10B981',  // Ubah warna utama
  'secondary-green': '#059669', // Ubah warna sekunder
  // ... warna lainnya
}
```

### Menambah/Edit Data Portfolio
Edit file `src/data/portfolio.ts`:
- Projects
- Skills
- Experience
- Certificates
- Contact info

### Mengubah Font
Edit `src/app/layout.tsx` untuk import font Google Fonts yang berbeda.

## 📄 Komponen yang Belum Lengkap

Karena keterbatasan ruang, beberapa komponen section perlu dibuat terpisah:
- **Experience.tsx** - Section pengalaman dengan modal
- **Projects.tsx** - Section proyek dengan tabs
- **Certificates.tsx** - Section sertifikat dengan expandable categories
- **Contact.tsx** - Form kontak

Template dasar untuk komponen-komponen ini:

```typescript
// src/components/sections/[ComponentName].tsx
"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
// Import data dari @/data/portfolio

export default function ComponentName() {
  const { t } = useLanguage();
  
  return (
    <section id="section-id" className="py-20">
      {/* Implementasi komponen */}
    </section>
  );
}
```

## 🚀 Deployment

### Deploy ke Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build untuk Production
```bash
npm run build
npm run start
```

## 📞 Support

Jika ada pertanyaan atau masalah:
- Email: r.haikal1610@gmail.com
- GitHub: https://github.com/Rifqi-HaikalCh

## 📜 License

MIT License - feel free to use this project for your own portfolio!

---

**Note:** Jangan lupa untuk:
1. Mengoptimasi gambar dengan format WebP
2. Menambahkan sitemap.xml untuk SEO
3. Setup Google Analytics
4. Test di berbagai browser dan device