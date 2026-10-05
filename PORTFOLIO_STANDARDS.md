# Standar portofolio Rifqi

Dokumen ini mengikat setiap perubahan UI, gaya, komponen, dan data. Agent wajib membacanya sebelum mengedit repositori ini. Jika permintaan pengguna bentrok dengan standar ini, kerjakan isi yang diminta dan pertahankan standar visual. Jangan “memperbaiki” tampilan di luar permintaan.

Sumber token: `src/styles/design-system.css`, `src/app/globals.css`, `tailwind.config.ts`, `src/app/layout.tsx`.

## Tujuan

Situs ini adalah portofolio editorial: kertas hangat, tinta, satu aksen oksida, huruf serif untuk judul. Bukan landing page SaaS dan bukan template komponen generatif.

Perubahan data (proyek, pengalaman, sertifikat, kontak, keahlian) harus masuk ke data yang sudah ada. Jangan membuat komponen, warna, animasi, atau kalimat baru hanya karena ada ruang kosong.

## Token yang boleh dipakai

Gunakan kelas Tailwind ini. Nilainya mengikuti mode terang dan gelap lewat CSS variable. Jangan menulis hex baru di komponen.

| Token | Kelas | Terang | Gelap | Pakai untuk |
| --- | --- | --- | --- | --- |
| Kertas | `bg-paper`, `text-paper` | `#F4F0E8` | `#131211` | Latar halaman dan section |
| Permukaan | `bg-raised` | `#FBF8F2` | `#1C1A17` | Kartu, form, figure |
| Tinta | `text-ink`, `bg-ink`, `border-ink` | `#1B1916` | `#F3EEE6` | Judul, teks utama, tombol utama |
| Redup | `text-muted` | `#6A635B` | `#A79E93` | Paragraf pendukung, meta |
| Garis | `border-line`, `bg-line` | `#DDD4C6` | `#322E29` | Pembatas, kisi, bingkai |
| Aksen | `text-accent`, `bg-accent`, `border-accent` | `#8C3A2F` | `#D47868` | Label kecil, hover tombol utama, satu penanda |

`primary-green` sudah dipetakan ke aksen. Jangan mengembalikannya ke hijau neon.

Mode gelap hanya mengubah variable di `.dark`. Jangan menambah palet gelap terpisah seperti `dark:bg-gray-900` atau `dark:bg-[#0B1120]` pada permukaan baru.

## Huruf

Hanya tiga keluarga, sudah dimuat di `src/app/layout.tsx`.

| Peran | Kelas | Font |
| --- | --- | --- |
| Teks dan UI | `font-sans` (default `body`) | Source Sans 3 |
| Judul | `font-serif` | Fraunces |
| Label kecil | `font-jetbrains-mono` | JetBrains Mono |

Aturan judul:

- Section: `font-serif text-4xl md:text-5xl font-medium tracking-tight text-ink`
- Nama di hero: serif, `font-medium`, leading rapat
- Jangan `font-black`, `font-extrabold`, `uppercase`, atau `tracking-widest` pada judul
- Label di atas judul: `font-jetbrains-mono text-[11px] tracking-[0.22em] uppercase text-accent`

Judul section yang sudah punya salinan harus lewat `AnimatedSectionTitle` di `src/components/shared/AnimatedSectionTitle.tsx`. Props yang dipakai: `badge`, `title`, `subtitle`, `center`. Jangan mengembalikan badge gradien, ikon berputar, atau shimmer.

## Tata letak

- Lebar isi: `max-w-6xl mx-auto px-5 lg:px-8`
- Section: `py-20 md:py-28 border-b border-line bg-paper text-ink`
- Kisi informasi: `border-t border-l border-line`, tiap sel `border-b border-r border-line`
- Sudut permukaan: default siku. Jangan `rounded-2xl`, `rounded-3xl`, `rounded-full` pada kartu, tombol, atau input
- Bayangan: tidak dipakai sebagai bahasa visual. Jangan `shadow-xl`, `shadow-2xl`, `shadow-glow`
- Jarak vertikal antar blok dalam section mengikuti yang sudah ada. Jangan menambah section baru

Tombol yang sudah ada:

- Utama: `btn-primary-custom` — isi tinta, hover aksen
- Garis: `btn-outline-custom` — garis tinta, hover terisi tinta
- Ikon sosial: tautan teks dengan ikon, atau `.social-icon` kotak bergaris

Contoh kartu yang benar:

```tsx
<article className="border border-line bg-raised p-6 md:p-8">
  <p className="font-jetbrains-mono text-[11px] tracking-[0.16em] uppercase text-accent mb-3">
    Label
  </p>
  <h3 className="font-serif text-2xl font-medium text-ink">Judul</h3>
  <p className="mt-3 text-muted leading-relaxed">Isi dari data, bukan kalimat baru.</p>
</article>
```

Contoh yang dilarang:

```tsx
<div className="rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">
  <h3 className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent font-black uppercase">
    Judul
  </h3>
</div>
```

## Gerak

Boleh: muncul sekali saat masuk viewport (`opacity` dan geser kecil, sekitar 14px, sekitar 1,6 detik), kursor ketik pada peran, progress notifikasi EQbot. Tiap bagian besar di dalam section memakai `rise-item` dan naik sekali saat bagian itu pertama masuk viewport. Baris pengalaman memakai `ledger-item` dengan gerak yang sama. Footer ikut. Kelas menunggu hanya dipasang setelah observer siap, jadi tanpa skrip isi tetap terlihat. Isi section harus tetap ada di layout sejak render pertama. Jangan mulai dari `opacity: 0` di markup, `filter: blur`, atau `scale` di pembungkus section.

Dilarang pada permukaan baru maupun saat menyentuh file lama:

- latar gradien bergerak, blob blur, partikel, shimmer, aurora
- hover `scale`, `rotate`, `translateY(-8px)` atau lebih, glow
- fisika (jatuh, gravitasi, tilt mengikuti pointer)
- transisi pada semua elemen lewat selector `*`

Hormati `prefers-reduced-motion` yang sudah ada di `design-system.css`. EQbot tidak membuka dirinya sendiri.

Respons di seluruh halaman memakai kelas yang sama. Hover dan fokus hanya mengubah warna atau garis, sekitar 180ms.

| Kelas | Perilaku |
| --- | --- |
| `card-hover` | Kartu yang diklik: garis menjadi aksen, judul `.card-hover-title` ikut aksen, foto dapat selapis aksen tipis |
| `row-open` | Baris pengalaman adalah satu tombol. Hover mengisi `.row-open-action` dengan tinta dan menggeser `.row-open-title` ke aksen. Latar baris tidak ikut berubah |
| `ledger-item` | Tiap baris pengalaman naik sekali ke tempatnya saat pertama masuk viewport. Tanpa `is-settled`, baris tetap terlihat |
| `rise-item` | Bagian di dalam section, dan footer, naik 14px sekali saat pertama masuk viewport, sekitar 1,6 detik. Kelas menunggu dipasang setelah observer siap |
| `field` | Kolom yang sedang diisi memakai garis aksen |
| `presence` | Titik status di samping kalimat tersedia. Warna aksen, denyut pelan. Bukan palet hijau kedua |
| `mark-current` | Garis aksen di kiri item yang sedang dipilih |
| `link-mark` | Tautan kecil: hover menjadi tinta dengan garis bawah aksen |
| `read-row` | Sel informasi yang tidak diklik: hover menghangatkan latar dan menambah garis aksen di kiri. Tanpa kursor tombol |
| `cell-open` | Sel tombol di dalam kisi. Hover menghangatkan latar dan menggeser `.cell-open-title` ke aksen |

Language dan Framework tidak ditumpuk di halaman. Keduanya dibuka dari sel Additional Skills pada submenu Nice to Have, di bawah Application. Dialognya `bg-raised`, tanpa kelas `dark`, dengan dua tab: semua karya di luar inti enterprise, dan tingkat pemakaian. Tingkat menghitung sekali tiap kerja atau projek. Jangan mengembalikan sel itu ke kisi inti, dan jangan mengembalikan kisi language dan framework ke section. Alat pengembangan dan aplikasi tetap di halaman, tanpa label tingkat.

`.eqbot-presence` memakai denyut yang sama, termasuk pada tombol bulat sebelum chat dibuka. Dialog detail mengikuti mode halaman lewat `bg-raised`. Jangan menaruh kelas `dark` pada panel dialog: kelas itu memaksa kertas gelap saat mode terang.

## Latar

Satu bidang kertas untuk seluruh halaman. `bg-paper` di section, `bg-ink` hanya di footer. Jangan memberi tiap section pola, tekstur, kisi, garis tepi, bingkai, atau warna latar sendiri. Pergantian pola antar section melelahkan mata dan bukan bagian dari sistem ini.

`data-studio` hanya nama bagian yang sedang dibaca, untuk menu, indeks, dan EQbot. Atribut itu tidak boleh menggambar apa pun.

Indeks baca (`StudioRail`) hanya muncul di layar lebar: angka bagian, nama bagian, dan satu garis progres. Hover dan keadaan aktif hanya mengubah warna.

EQbot duduk di kanan bawah. Sebelum dibuka, bentuknya tombol bulat berlatar putih, supaya tidak menyatu dengan kertas. Setelah halaman siap, gelembung singkat muncul sekali di sampingnya. Setelah ditutup, bentuknya tab: foto, nama, status “chat sedang berlangsung”, dan tutup. Lingkaran hanya untuk foto EQbot. Panelnya kotak, memanjang sampai dekat tepi bawah, putih cerah pada mode terang dan `bg-raised` pada mode gelap, `border-line`, tanpa bayangan dan tanpa blur. Di layar kecil panel memakai hampir seluruh lebar, dengan sisa di tepi.

- Klik membuka dengan dua gerak: foto pindah ke header, lalu panel bertambah ke bawah. `prefers-reduced-motion` melewati gerak itu. Gelembung perkenalan bukan panel yang membuka sendiri.
- Header menulis nama dan “Online”. Saat sebuah pertanyaan diklik, tiga titik bergelombang sebentar, lalu jawaban yang sudah ditulis muncul. Pilihan “Another question” dan “Another section”, beserta padanannya, hanya mengganti daftar opsi. Pilihan itu tidak masuk ke percakapan, dan EQbot tidak menjawab.
- Isinya percakapan bercabang. Pengunjung memilih bagian, lalu satu pertanyaan. Jawabannya ada di `eqbot-script.ts`: paragraf yang bercerita tentang bagian itu, berurutan dan mudah diikuti, bukan daftar poin dan bukan perintah untuk membaca section. Baris pintasan ke suatu bagian hanya muncul sekali, pada jawaban pertama untuk bagian itu. Klik pada baris itu menutup chat dan menggulir halaman ke bagian tersebut. Jawaban berikutnya di bagian yang sama tidak mengulang pintasan. Fakta hanya yang tertulis di data. Tidak ada kolom ketik dan tidak ada model di belakangnya.
- Jangan membuat EQbot berjalan di halaman.
- Kalimat memakai kedua bahasa lewat `t(en, idn)`. Fakta hanya yang sudah ada di `src/data/portfolio.ts`.
- Jangan mengembalikan figur yang berjalan di halaman, atau pengatur waktu 5, 10, dan 15 menit.

Navigasi menandai section aktif dengan garis bawah aksen (`.nav-current`) atau warna aksen di menu kecil. Bukan kapsul dan bukan blur.

## Yang tidak boleh ditambahkan lagi

Komponen ini masih ada di repo sebagai sisa. Jangan di-import, dibungkuskan, atau dihidupkan kembali:

- `ParticlesBackground`
- `GooeyNav`
- `ElectricBorder`
- `TiltedCard`
- `FallingSkillCards`
- `GlassSkillCard`
- `VariableProximity`
- `ProfileCard` (kartu holografik)
- navbar kapsul / `backdrop-blur` / `rounded-full` pada header
- menu mengambang dengan ikon percik

Kelas dan efek yang dilarang:

- `backdrop-blur`, `bg-white/10`, `bg-clip-text`, `text-transparent` untuk teks gradien
- `bg-gradient-to-*` sebagai identitas visual
- warna Tailwind `emerald`, `blue`, `indigo`, `purple`, `violet`, `fuchsia`, `pink` untuk dekorasi. Skala itu sudah digeser di `tailwind.config.ts` dan bukan palet merek
- `from-emerald-500 to-blue-500` dan variasi ungu–hijau–biru
- emoji sebagai sistem ikon baru. Ikon yang sudah dipakai dari `lucide-react` boleh tetap

Warna semantik form hanya untuk status sungguhan: sukses dan gagal kirim pesan. Bukan untuk kartu, badge, atau ikon.

Tema peran (`uiux`, `developer`, `fullstack`) tidak boleh mengganti palet halaman. Peran hanya boleh memakai token yang sama.

## Data

Sumber data: `src/data/portfolio.ts`. Tipe: `src/types/index.ts`.

| Data | Export | Dipakai untuk |
| --- | --- | --- |
| Navigasi | `navLinks` | Header dan footer |
| Peran berputar | `typingTexts.en` / `typingTexts.id` | Hero |
| Sorotan | `aboutHighlights` | About |
| Keahlian | `hardSkills`, `softSkills`, `developerSkills`, `designSkills` | Services |
| Kerja | `workExperience` | Experience, `type: 'work'` |
| Organisasi | `organizationExperience` | Experience, `type: 'organization'` |
| Proyek | `individualProjects`, `groupProjects`, `designProjects` | Services dan daftar proyek |
| Sertifikat | `certificateCategories` | Certificates |
| Kontak | `contactInfo` | Hero, footer, kontak |

Saat update data:

1. Ubah nilai di `portfolio.ts`. Jangan menyalin teks yang sama ke dalam JSX.
2. Isi pasangan bahasa yang sudah ada pada tipe itu (`title` + `titleId`, `description` + `descriptionId`, `labelEn` + `labelId`). Jangan mengosongkan salah satu bahasa.
3. Pertahankan field yang sudah terisi. Jangan menghapus proyek, pengalaman, tautan, atau sertifikat kecuali pengguna meminta item itu dihapus.
4. `id` stabil, huruf kecil, tanpa spasi. Jangan mengubah `id` yang sudah dipakai hanya untuk merapikan nama.
5. Gambar dan slide menunjuk file yang benar-benar ada di `public/assets`. Jangan mengarang path, URL demo, atau repo.
6. Tautan baru hanya dari pengguna. Jangan menukar `demo`, `github`, `prototype`, `needToKnow`, email, LinkedIn, GitHub, atau WhatsApp dengan tebakan.
7. Angka di About (`30+`, `10+`, tahun dari `calculateTotalExperience`) jangan diubah kecuali pengguna memberi angka baru. Jangan menambah progress bar, persentase skill, atau statistik baru.
8. `count` pada kategori sertifikat harus sama dengan jumlah item di `certificates`.
9. Jangan menambah jenis proyek, kategori sertifikat, atau layanan di luar union tipe yang ada tanpa permintaan eksplisit. Jika tipe perlu field baru, tambahkan opsional dan isi hanya data yang diberikan pengguna.

Salinan UI yang sudah tertulis di komponen (tombol, label section, pesan form, teks EQbot) boleh diubah hanya jika pengguna meminta kalimat itu. Jangan menulis ulang biografi agar “lebih profesional”.

## Mode mobile

Layar sempit memakai token, huruf, tombol, dan judul yang sama. Jangan membuat palet, kapsul, atau komponen kedua untuk ponsel.

- Section: `py-16 px-5 border-b border-line bg-paper text-ink`
- Susun vertikal. Jangan carousel memutar, tumpukan kartu fisika, atau galeri melingkar
- Kartu dalam satu baris memakai tinggi yang sama, mengikuti isi terpanjang
- Dialog detail tetap `ProjectDetailDialog`, dipasang ke `document.body`
- `id` section tetap sama dengan desktop supaya menu menggulir ke tempat yang benar
- Jangan mengimpor `GlassSkillCard`, `SimpleLanyard`, `CircularGallery`, atau `Stack` pada halaman mobile
- Hero tidak memakai `min-h-screen` dengan isi didorong ke bawah. Jarak atas hanya cukup untuk header tetap. Saat jendela ditarik, section berikutnya yang muncul, bukan area kosong di dalam hero

## Halaman semua projek

Halaman yang terbuka dari tombol View Projects memakai kartu `ProjectCard` yang sama dengan baris projek. Latar `bg-paper`, filter kotak berisi tinta, pencarian berbingkai `border-line`. Tidak ada kartu miring, pil, blur, atau palet hijau-biru.

## Batas perbaikan

Saat memperbaiki bug atau menambah satu data:

- Sentuh file yang diperlukan saja.
- Jika file itu masih berisi kelas lama (`rounded-3xl`, `font-black`, blur), rapikan hanya permukaan yang sedang diedit agar ikut token di atas. Jangan merombak section lain dalam tugas yang sama.
- Jangan menambah dependency, font, halaman, atau section.
- Jangan mengganti isi `portfolio.ts` dengan data contoh.
- Jangan membuat file desain, palet, atau komponen “versi baru” kedua. Perluas pola `btn-primary-custom`, `AnimatedSectionTitle`, dan token `paper` / `ink` / `line` / `accent`.

## Pemeriksaan sebelum selesai

- Tidak ada hex, gradien warna, blur, font baru, atau pola latar per section di diff.
- Teks bilingual yang sudah berpasangan tetap berpasangan.
- Tidak ada path gambar atau URL yang tidak diberikan pengguna atau tidak ada di `public/assets`.
- Section baru tidak muncul.
- Tombol dan kartu baru memakai kelas standar, bukan pill atau kaca.
