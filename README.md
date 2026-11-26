A bilingual personal portfolio for Rifqi Haikal Chairiansyah, built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4, and being redesigned as a 3D paper craft desk (see DesignRules.md).

Portofolio pribadi Rifqi Haikal Chairiansyah. Situs ini menampilkan pengalaman kerja, proyek, dan sertifikat dalam bahasa Indonesia dan Inggris, dengan tampilan gelap dan terang.

Demo: https://portofolio-rifqi-snowy.vercel.app

## Fitur

- Dua bahasa, Indonesia dan Inggris
- Mode gelap dan terang
- Chatbot EQbot berskrip, tanpa model AI
- Modal detail untuk pengalaman, proyek, dan sertifikat
- Form kontak

## Stack

Yang terpasang saat ini di `package.json`:

- Next.js 16, React 19, TypeScript 5.9
- Tailwind CSS 4 (token di `src/styles/tokens.css`)
- next-themes, motion, lucide-react, zod, resend
- ESLint 9 (flat config)

React Three Fiber untuk figurin 3D ditambahkan di Phase 3. Alasan setiap pilihan ada di [DesignRules.md](DesignRules.md) bagian 11.

## Struktur folder

```
src/
  app/            layout, halaman utama, ikon, dan API form kontak
  components/     bagian halaman (desktop dan mobile) serta komponen bersama
  context/        bahasa
  data/           portfolio.ts, satu sumber konten
  hooks/
  lib/
  styles/
  types/
public/assets/    gambar dan berkas sertifikat
```

## Menjalankan

Perlu Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
npm run check:design
```

`npm run dev` membuka server pengembangan. `npm run build` menyusun situs untuk produksi. `npm run start` menjalankan hasil build.

## Mengubah konten

Semua salinan situs ada di `src/data/portfolio.ts`. Pasangan bahasa wajib terisi (`title`/`titleId`, `description`/`descriptionId`, `labelEn`/`labelId`, dan padanan sejenis). Jangan mengarang tautan atau path gambar; path gambar harus sudah ada di `public/assets`.

Aturan desain, UX, dan teknis ada di [DesignRules.md](DesignRules.md).

## Deployment

Situs di-deploy ke Vercel. Untuk form kontak, set environment variable `RESEND_API_KEY` di proyek Vercel. Jangan menyimpan nilai kunci itu di repositori.
