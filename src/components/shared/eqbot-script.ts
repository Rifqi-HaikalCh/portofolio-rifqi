export type EqbotSection = 'home' | 'about' | 'experience' | 'services' | 'projects' | 'certificates' | 'contact';
export type EqbotPlace = EqbotSection;

export type EqbotText = { en: string; idn: string };

export type EqbotChoice = {
  id: string;
  en: string;
  idn: string;
  to: string;
  silent?: boolean;
  download?: boolean;
};

export type EqbotNode = {
  say?: EqbotText;
  again?: EqbotText;
  choices: EqbotChoice[];
  go?: EqbotSection;
  section?: boolean;
  answer?: boolean;
};

export const eqbotSectionNode: Record<EqbotSection, string> = {
  home: 'home',
  about: 'about',
  experience: 'experience',
  services: 'services',
  projects: 'projects',
  certificates: 'certificates',
  contact: 'contact',
};

export const eqbotCopy = {
  headerName: {
    en: 'Rifqi · Paper Guide',
    idn: 'Rifqi · Pemandu Kertas',
  },
  openLabel: {
    en: 'Chat with Rifqi (EQbot)',
    idn: 'Ngobrol sama Rifqi (EQbot)',
  },
  close: {
    en: 'Close chat',
    idn: 'Tutup obrolan',
  },
  closeLabel: {
    en: 'Close chat',
    idn: 'Tutup obrolan',
  },
  minLabel: {
    en: 'Minimize chat',
    idn: 'Kecilkan obrolan',
  },
  dismissNotice: {
    en: 'Hide greeting',
    idn: 'Sembunyikan sapaan',
  },
  greetingBubbleBadge: {
    en: 'Hey! I’m Rifqi 👋',
    idn: 'Halo! Aku Rifqi 👋',
  },
  greetingSubBadge: {
    en: 'Your Paper Studio Guide',
    idn: 'Pemandu Studio Kertasmu',
  },
  online: {
    en: 'Paper Rifqi · Ready to guide you',
    idn: 'Rifqi versi kertas · Siap memandu kamu',
  },
  ongoing: {
    en: 'Tap to continue our chat',
    idn: 'Klik buat lanjut ngobrol',
  },
  status: {
    en: 'Paper Rifqi · Ask me anything here',
    idn: 'Rifqi versi kertas · Tanya apa aja di sini',
  },
  hint: {
    en: 'Swipe or scroll sideways to pick a question →',
    idn: 'Geser ke samping untuk pilih pertanyaan →',
  },
  notice: {
    en: 'Hey! I’m Paper Rifqi 👋 Tap me if you want a fun tour or have questions about my work!',
    idn: 'Halo! Aku Rifqi versi kertas 👋 Klik aku kalau mau ditemani keliling atau tanya-tanya soal karyaku!',
  },
  first: {
    en: 'Hey there, welcome to my paper studio! I’m Rifqi Haikal Chairiansyah—and this cut-paper character waving beside the panel is my twin who lives on this page to guide you around.',
    idn: 'Halo, selamat datang di studio kertasku! Kenalin, aku Rifqi Haikal Chairiansyah—dan karakter kertas yang lagi dadah-dadah di samping ini kembaranku yang jaga halaman buat memandu kamu keliling.',
  },
  introFollow: {
    en: 'Think of this chat as talking straight to me! In real life I’m an IT Software Developer in Jakarta (currently at PT Tower Bersama Infrastructure). Pick any topic below and I’ll explain my rooms, my projects, or how we can work together.',
    idn: 'Anggap aja kamu lagi ngobrol langsung sama aku! Sehari-hari aku kerja sebagai IT Software Developer di Jakarta (sekarang di PT Tower Bersama Infrastructure). Pilih aja pertanyaan di bawah, nanti aku jelasin ruanganku, proyekku, atau cara kita bisa kolaborasi.',
  },
  morning: {
    en: 'Good morning! I’m Rifqi Haikal—and my paper twin right beside the chat is awake and ready to show you around my studio.',
    idn: 'Selamat pagi! Aku Rifqi Haikal—dan kembaran kertasku di samping panel ini sudah siap nemenin kamu keliling studioku.',
  },
  night: {
    en: 'Hey, browsing late at night? I’m Rifqi Haikal! My paper twin is keeping the studio lights warm—remember you can click any room’s lamp to toggle night mode while we chat.',
    idn: 'Halo, lagi jalan-jalan malam nih? Aku Rifqi Haikal! Kembaran kertasku lagi jagain lampu studio tetap hangat—ingat, kamu bisa klik lampu di tiap ruangan buat nyalain mode malam sambil kita ngobrol.',
  },
  return: {
    en: 'Hey, welcome back! What part of my studio or work should we check out next?',
    idn: 'Halo lagi! Bagian mana lagi dari studio atau karyaku yang mau kita bahas sekarang?',
  },
  left: {
    en: 'We hadn’t picked a topic yet earlier—no worries! What would you like me to explain first?',
    idn: 'Tadi kita belum sempat pilih topik obrolan—santai aja! Sekarang mau aku ceritain bagian mana dulu nih?',
  },
  restless: {
    en: 'Enjoying the room-to-room tour? Whenever a room catches your eye, tap one of the specific questions so I can tell you the story behind it!',
    idn: 'Seru ya lihat-lihat tiap ruangannya? Kalau ada ruangan yang bikin penasaran, klik aja salah satu pertanyaannya biar aku ceritain detail di baliknya!',
  },
  thorough: {
    en: 'I love how curious you are! Feel free to keep asking—or jump straight to any room whenever you want to see the visuals in action.',
    idn: 'Wah, senang banget kamu nanya sedetail ini! Lanjut tanya aja sepuasnya—atau langsung lompat ke ruangannya kapan pun kamu mau lihat visualnya langsung.',
  },
  here: {
    en: 'Tell me about this room',
    idn: 'Ceritain ruangan ini dong',
  },
  other: {
    en: 'Other rooms',
    idn: 'Ruangan lain',
  },
  ask: {
    en: 'Pick a question to ask me',
    idn: 'Pilih pertanyaan buat aku',
  },
  Jump: {
    home: { en: '↗ Take me to Room 01 · My Desk', idn: '↗ Ajak ke Ruang 01 · Meja Kerjaku' },
    about: { en: '↗ Take me to Room 02 · About Me', idn: '↗ Ajak ke Ruang 02 · Tentang Saya' },
    experience: { en: '↗ Take me to Room 03 · Experience & Career Board', idn: '↗ Ajak ke Ruang 03 · Pengalaman & Papan Karier' },
    services: { en: '↗ Take me to Room 04 · Services & Blueprints', idn: '↗ Ajak ke Ruang 04 · Layanan & Blueprint' },
    projects: { en: '↗ Take me to Room 04b · Selected Work Gallery', idn: '↗ Ajak ke Ruang 04b · Galeri Proyek Pilihan' },
    certificates: { en: '↗ Take me to Room 05 · Certificate Books', idn: '↗ Ajak ke Ruang 05 · Rak Buku Sertifikat' },
    contact: { en: '↗ Take me to Room 06 · Contact & Mail Tray', idn: '↗ Ajak ke Ruang 06 · Kontak & Baki Surat' },
  } as Record<EqbotSection, EqbotText>,
  Place: {
    home: { en: 'Room 01 · My Desk', idn: 'Ruang 01 · Meja Kerjaku' },
    about: { en: 'Room 02 · Pinboard & Bio', idn: 'Ruang 02 · Papan Pin & Profil' },
    experience: { en: 'Room 03 · Filing Cabinet & Career Board', idn: 'Ruang 03 · Lemari Arsip & Papan Karier' },
    services: { en: 'Room 04 · Drafting Table & Stack', idn: 'Ruang 04 · Meja Gambar & Stack' },
    projects: { en: 'Room 04b · Gallery Wall (Projects)', idn: 'Ruang 04b · Dinding Galeri (Proyek)' },
    certificates: { en: 'Room 05 · Certificate Shelf', idn: 'Ruang 05 · Rak Buku Sertifikat' },
    contact: { en: 'Room 06 · Mail Tray & Contact', idn: 'Ruang 06 · Baki Surat & Kontak' },
  } as Record<EqbotSection, EqbotText>,
};

const rootChoices: EqbotChoice[] = [
  { id: 'r-start', en: 'First time here? Start with me', idn: 'Baru mampir? Mulai dari sini yuk', to: 'start' },
  { id: 'r-home', en: 'What’s on your desk?', idn: 'Ada apa aja di meja kerjamu?', to: 'home' },
  { id: 'r-about', en: 'Tell me about yourself', idn: 'Ceritain tentang dirimu dong', to: 'about' },
  { id: 'r-exp', en: 'Where have you worked?', idn: 'Kamu pernah kerja di mana aja?', to: 'experience' },
  { id: 'r-svc', en: 'What tech stack & services do you do?', idn: 'Tech stack & layananmu apa aja?', to: 'services' },
  { id: 'r-prj', en: 'Show me your projects', idn: 'Lihat proyek-proyek buatanmu', to: 'projects' },
  { id: 'r-cert', en: 'What certificates do you have?', idn: 'Sertifikat apa aja yang kamu punya?', to: 'certificates' },
  { id: 'r-contact', en: 'How can I contact you?', idn: 'Gimana cara menghubungi kamu?', to: 'contact' },
  { id: 'r-meta', en: 'Who is this paper character?', idn: 'Siapa karakter kertas ini?', to: 'meta' },
];

const backTo = (section: string, en = 'More questions in this room', idn = 'Pertanyaan lain di ruangan ini'): EqbotChoice => ({
  id: `back-${section}`,
  en,
  idn,
  to: section,
  silent: true,
});

const toRoot: EqbotChoice = {
  id: 'to-root',
  en: 'Explore another room',
  idn: 'Lihat ruangan lain',
  to: 'menu',
  silent: true,
};

const reply = (say: EqbotText, again: EqbotText, back: string, go?: EqbotSection, extra: EqbotChoice[] = []): EqbotNode => ({
  say,
  again,
  go,
  answer: true,
  choices: [...extra, backTo(back), toRoot],
});

export const eqbotNodes: Record<string, EqbotNode> = {
  menu: {
    choices: rootChoices,
  },
  root: {
    choices: rootChoices,
  },

  /* ============================================================================
   * 01 — HOME / DESK STATION
   * ========================================================================== */
  home: {
    section: true,
    say: {
      en: 'This first room is my actual work desk in paper form! On the laptop screen you can see my current role—IT Software Developer at PT Tower Bersama Infrastructure Tbk in Jakarta. Try clicking my architect lamp to flip between daylight and night mode, or tap the speaker if you want chill studio music and paper sound effects while scrolling.',
      idn: 'Ruangan pertama ini meja kerjaku versi kertas! Di layar laptop kelihatan peranku sekarang—IT Software Developer di PT Tower Bersama Infrastructure Tbk, Jakarta. Coba deh klik lampu arsitek di mejaku buat ganti suasana siang atau malam, atau klik speaker kecilnya kalau mau denger musik studio dan efek suara kertas waktu scroll.',
    },
    again: {
      en: 'Back at my desk! Want to ask about my current role, the four numbers on the tickets, my CV, or the interactive items on the desk?',
      idn: 'Balik lagi ke meja kerjaku! Mau tanya soal peranku sekarang, empat angka di tiket meja, CV-ku, atau barang-barang interaktif di meja?',
    },
    choices: [
      { id: 'home-role', en: 'What is your main role right now?', idn: 'Sekarang fokus kerjamu sebagai apa?', to: 'home-role' },
      { id: 'home-counts', en: 'What do the 4 numbers on the tickets mean?', idn: 'Empat angka di tiket itu artinya apa?', to: 'home-counts' },
      { id: 'home-mark', en: 'Do you do backend, frontend, or design?', idn: 'Kamu pegang backend, frontend, atau desain?', to: 'home-mark' },
      { id: 'home-cv', en: 'Can I download your CV?', idn: 'Bisa unduh CV kamu nggak?', to: 'home-cv', download: true },
      { id: 'home-buttons', en: 'What can I click on your desk?', idn: 'Apa aja yang bisa diklik di mejamu?', to: 'home-buttons' },
    ],
  },
  'home-role': reply(
    {
      en: 'Right now I work mainly in the .NET ecosystem—C#, ASP.NET MVC, .NET Core, Entity Framework, SQL Server, and Telerik UI for enterprise web apps. Alongside that, I also build modern web apps with React, Next.js, Angular, Vue 3, and Spring Boot, plus UI/UX prototypes in Figma.',
      idn: 'Sekarang fokus utamaku di ekosistem .NET—C#, ASP.NET MVC, .NET Core, Entity Framework, SQL Server, dan Telerik UI buat aplikasi web enterprise. Di luar itu, aku juga sering bangun aplikasi web pakai React, Next.js, Angular, Vue 3, dan Spring Boot, plus bikin desain UI/UX di Figma.',
    },
    {
      en: 'My daily core is C#, .NET, and SQL Server, paired with modern frontend frameworks and Figma.',
      idn: 'Sehari-hari intiku di C#, .NET, dan SQL Server, ditambah framework frontend modern dan Figma.',
    },
    'home',
    'home',
  ),
  'home-counts': reply(
    {
      en: 'Those four little paper tickets on the second beat sum up my journey so far: 5 industries served (telecom infrastructure, oil & gas, government research, financial services, and IT consulting), 100+ standardized APIs, 3+ years of hands-on development, and 30+ web & design projects shipped.',
      idn: 'Empat tiket kertas di bagian kedua itu rangkuman perjalananku sejauh ini: 5 industri yang pernah kutangani (infrastruktur telekomunikasi, migas, riset pemerintahan, layanan finansial, dan konsultan IT), 100+ API yang distandardisasi, 3+ tahun ngoding langsung, dan 30+ proyek web & desain yang sudah selesai.',
    },
    {
      en: '5 industries, 100+ APIs, 3+ years of development, and 30+ projects.',
      idn: '5 industri, 100+ API, 3+ tahun pengembangan, dan 30+ proyek.',
    },
    'home',
    'home',
  ),
  'home-mark': reply(
    {
      en: 'I handle both full-stack development and interface design. In corporate teams I’m usually trusted with heavy backend logic, stored procedures, and enterprise dashboards (.NET & SQL Server), while on product and freelance projects I often take an idea all the way from Figma wireframes to a live Next.js or Vue app.',
      idn: 'Aku biasa pegang full-stack sekaligus desain tampilannya. Kalau di kantor korporat, aku sering dipercaya ngurus logika backend, stored procedure, dan dashboard enterprise (.NET & SQL Server). Tapi kalau di proyek produk atau freelance, aku sering bawa idenya dari sketsa Figma sampai jadi aplikasi Next.js atau Vue yang live.',
    },
    {
      en: 'I cover enterprise .NET/SQL backend as well as modern frontend and Figma UI/UX.',
      idn: 'Aku pegang backend enterprise .NET/SQL sekaligus frontend modern dan UI/UX di Figma.',
    },
    'home',
    'home',
  ),
  'home-cv': reply(
    {
      en: 'Yes! Right on the first card at my desk there’s a "Download CV" link. It opens my 2-page PDF CV (`Rifqi Haikal Chairiansyah-CV.pdf`) in a new tab so you can save or print it right away.',
      idn: 'Bisa banget! Di kartu pertama meja kerjaku ada tombol "Unduh CV". Kalau diklik, file PDF CV 2 halamanku (`Rifqi Haikal Chairiansyah-CV.pdf`) langsung kebuka di tab baru, jadi gampang disimpan atau diprint.',
    },
    {
      en: 'My 2-page PDF CV opens directly from the "Download CV" link on the first card.',
      idn: 'CV PDF 2 halamanku langsung kebuka dari tombol "Unduh CV" di kartu pertama.',
    },
    'home',
    'home',
  ),
  'home-buttons': reply(
    {
      en: 'Quite a lot! On the laptop screen (`rifqi.profile`), "Open projects" takes you straight to my gallery wall and "Ask EQbot" opens this chat. You can also click the desk lamp to toggle day/night lighting, click the speaker for music and paper sound effects, or poke my paper character on stage (he reacts!).',
      idn: 'Lumayan banyak! Di layar laptop (`rifqi.profile`), tombol "Buka proyek" langsung ngajak ke dinding galeri dan "Tanya EQbot" buka obrolan ini. Kamu juga bisa klik lampu meja buat nyalain mode malam/siang, klik speaker buat musik & suara kertas, atau colek karakter kertasku di panggung (dia bakal kaget!).',
    },
    {
      en: 'Try the laptop buttons, the desk lamp switch, the speaker, or poking my paper character.',
      idn: 'Cobain tombol di layar laptop, saklar lampu meja, speaker, atau colek karakter kertasku.',
    },
    'home',
    'home',
  ),

  /* ============================================================================
   * 02 — ABOUT / PINBOARD STATION
   * ========================================================================== */
  about: {
    section: true,
    say: {
      en: 'Welcome to Room 02, my Pinboard! Here I pinned my photo with a blinking "Available" tag, along with four index cards that tell my story: where I studied, how I bridge enterprise .NET systems with clean UI, and my freelance track record since 2023.',
      idn: 'Selamat datang di Ruang 02, Papan Pinku! Di sini aku tempel fotoku dengan tanda "Tersedia" yang berkedip, bareng empat kartu catatan tentang latar belakangku: tempat kuliahku, gimana aku gabungin sistem .NET enterprise dengan UI yang rapi, sampai perjalananku freelance sejak 2023.',
    },
    again: {
      en: 'We’re at the Pinboard! Want to know about my university, my GPA, the 5 industries I’ve worked in, or my freelance work?',
      idn: 'Kita di Papan Pin! Mau tanya soal kuliahku, IPK, 5 industri tempatku berkarya, atau pengalamanku freelance?',
    },
    choices: [
      { id: 'about-school', en: 'Where did you go to university?', idn: 'Dulu kuliah di mana dan jurusan apa?', to: 'about-school' },
      { id: 'about-gpa', en: 'What was your GPA?', idn: 'IPK kuliahmu berapa?', to: 'about-gpa' },
      { id: 'about-years', en: 'How long have you been coding?', idn: 'Sudah berapa lama menekuni dunia ngoding?', to: 'about-years' },
      { id: 'about-industries', en: 'Which 5 industries have you served?', idn: '5 industri apa aja yang pernah kamu tangani?', to: 'about-industries' },
      { id: 'about-msib', en: 'Tell me about MSIB & your freelance work', idn: 'Ceritain soal MSIB & kerjaan freelance-mu dong', to: 'about-msib' },
    ],
  },
  'about-school': reply(
    {
      en: 'I graduated with a Bachelor of Informatics (S.Kom) from Institut Teknologi Del (IT Del) in North Sumatra, studying from May 2021 to September 2025. While on campus, I was also active in the Google Developer Student Club (GDSC) core team and led the Social Division in BEM IT Del.',
      idn: 'Aku lulusan S1 Informatika (S.Kom) dari Institut Teknologi Del (IT Del), Sumatera Utara, kuliah dari Mei 2021 sampai September 2025. Waktu di kampus, aku juga aktif di tim inti Google Developer Student Club (GDSC) dan jadi Kepala Divisi Sosial di BEM IT Del.',
    },
    {
      en: 'Informatics at Institut Teknologi Del (2021–2025), active in GDSC and BEM.',
      idn: 'S1 Informatika di Institut Teknologi Del (2021–2025), aktif di GDSC dan BEM.',
    },
    'about',
    'about',
  ),
  'about-gpa': reply(
    {
      en: 'I graduated with a GPA of 3.39 out of 4.00 from Informatics at Institut Teknologi Del.',
      idn: 'Aku lulus dengan IPK 3,39 dari skala 4,00 di jurusan Informatika Institut Teknologi Del.',
    },
    { en: 'My GPA is 3.39 / 4.00.', idn: 'IPK-ku 3,39 / 4,00.' },
    'about',
    'about',
  ),
  'about-years': reply(
    {
      en: 'I’ve been building and shipping web applications hands-on for over 3 years now—starting from my freelance projects in August 2023, through my internships at FIFGROUP, Javan (MSIB), and BRIN, and into my enterprise engineering roles at Pertamina Hulu Rokan and Tower Bersama.',
      idn: 'Aku sudah terjun langsung bangun aplikasi web selama lebih dari 3 tahun—mulai dari garap proyek freelance sejak Agustus 2023, lanjut magang di FIFGROUP, Javan (MSIB), dan BRIN, sampai kerja di lingkungan enterprise Pertamina Hulu Rokan dan Tower Bersama.',
    },
    {
      en: 'Over 3 years of hands-on software development since 2023.',
      idn: 'Lebih dari 3 tahun pengalaman ngoding langsung sejak 2023.',
    },
    'about',
    'about',
  ),
  'about-industries': reply(
    {
      en: 'Across my contracts and internships, I’ve built production software in 5 industries: telecommunication infrastructure (Tower Bersama), oil & gas (Pertamina Hulu Rokan), government research (BRIN), financial services (FIFGROUP), and IT consulting (Javan Cipta Solusi).',
      idn: 'Lewat kontrak kerja dan magangku, aku sudah pernah bangun sistem di 5 industri berbeda: infrastruktur telekomunikasi (Tower Bersama), migas (Pertamina Hulu Rokan), riset pemerintahan (BRIN), layanan pembiayaan/finansial (FIFGROUP), dan konsultan IT (Javan Cipta Solusi).',
    },
    {
      en: 'Telecom infrastructure, oil & gas, government research, financial services, and IT consulting.',
      idn: 'Infrastruktur telekomunikasi, migas, riset pemerintahan, layanan finansial, dan konsultan IT.',
    },
    'about',
    'about',
  ),
  'about-msib': reply(
    {
      en: 'I was selected as a Kampus Merdeka MSIB intern (Batch 7) at PT Javan Cipta Solusi, and alongside my formal roles I’ve been working as a remote freelance full-stack & UI/UX developer since August 2023—delivering 20+ custom web apps and interface designs for clients.',
      idn: 'Aku sempat terpilih ikut program Kampus Merdeka MSIB (Batch 7) di PT Javan Cipta Solusi. Sambil jalanin kuliah dan kerja formal, aku juga buka jasa freelance full-stack & UI/UX secara remote sejak Agustus 2023 dan sudah nyelesain 20+ proyek web serta desain buat klien.',
    },
    {
      en: 'MSIB Batch 7 intern at Javan, plus 20+ freelance web and UI/UX projects since August 2023.',
      idn: 'Peserta MSIB Batch 7 di Javan, plus 20+ proyek freelance web dan UI/UX sejak Agustus 2023.',
    },
    'about',
    'about',
  ),

  /* ============================================================================
   * 03 — EXPERIENCE / CABINET & CAREER BOARD STATION
   * ========================================================================== */
  experience: {
    section: true,
    say: {
      en: 'Room 03 is my Filing Cabinet and Career Board! As you scroll through this room, each folder slides out of the steel drawer—6 work roles and 2 campus organizations—and then folds into a glowing company pin on the Career Board with little fireworks. On the final beat, you can click any pin on the board to inspect that role!',
      idn: 'Ruang 03 ini Lemari Arsip dan Papan Karierku! Waktu kamu scroll di sini, tiap map keluar satu-satu dari laci besi—ada 6 pengalaman kerja dan 2 organisasi kampus—terus terlipat jadi pin perusahaan yang nyala di Papan Karier lengkap sama kembang api kecil. Di akhir ruangan, kamu bisa klik pin mana aja di papan buat baca detailnya!',
    },
    again: {
      en: 'Back at the Filing Cabinet! Which folder should we open—Tower Bersama, Pertamina Hulu Rokan, BRIN, Javan, FIFGROUP, Freelance, or my campus organizations?',
      idn: 'Balik lagi ke Lemari Arsip! Map mana yang mau kita buka—Tower Bersama, Pertamina Hulu Rokan, BRIN, Javan, FIFGROUP, Freelance, atau organisasi kampusku?',
    },
    choices: [
      { id: 'exp-tbg', en: 'What do you build at Tower Bersama?', idn: 'Di Tower Bersama kamu ngerjain apa aja?', to: 'exp-tbg' },
      { id: 'exp-phr', en: 'What did you build at Pertamina Hulu Rokan?', idn: 'Waktu di Pertamina Hulu Rokan bangun apa?', to: 'exp-phr' },
      { id: 'exp-fif', en: 'Tell me about FIFGROUP, Javan & BRIN', idn: 'Ceritain waktu di FIFGROUP, Javan & BRIN dong', to: 'exp-fif' },
      { id: 'exp-free', en: 'How does your freelance work run?', idn: 'Kerjaan freelance-mu kayak gimana?', to: 'exp-free' },
      { id: 'exp-org', en: 'What organizations did you lead in college?', idn: 'Organisasi apa yang kamu ikuti waktu kuliah?', to: 'exp-org' },
      { id: 'exp-now', en: 'Which roles are active right now?', idn: 'Peran mana yang masih aktif sekarang?', to: 'exp-now' },
      { id: 'exp-places', en: 'Were these jobs in Jakarta or remote?', idn: 'Kerjaannya di Jakarta atau remote?', to: 'exp-places' },
    ],
  },
  'exp-tbg': reply(
    {
      en: 'At PT Tower Bersama Infrastructure Tbk (South Jakarta, contract since July 2026), I’m an IT Software Developer working with C#, ASP.NET MVC, .NET Core, and SQL Server. My big focus here was breaking a single legacy monolith into 8 modular applications with clean API boundaries, and building 3 executive dashboards for Payout, Business Projects, and HSE.',
      idn: 'Di PT Tower Bersama Infrastructure Tbk (Jakarta Selatan, kontrak sejak Juli 2026), aku kerja sebagai IT Software Developer pakai C#, ASP.NET MVC, .NET Core, dan SQL Server. Fokus besarku di sini mecah satu aplikasi monolit besar jadi 8 aplikasi modular yang rapi batas API-nya, plus bangun 3 dashboard eksekutif untuk Payout, Business Projects, dan HSE.',
    },
    {
      en: 'At Tower Bersama I split a monolith into 8 modular apps and delivered 3 executive dashboards (Payout, Business Projects, HSE).',
      idn: 'Di Tower Bersama aku mecah monolit jadi 8 aplikasi modular dan nyelesain 3 dashboard eksekutif (Payout, Business Projects, HSE).',
    },
    'experience',
    'experience',
  ),
  'exp-phr': reply(
    {
      en: 'At PT Pertamina Hulu Rokan (South Jakarta, December 2025 – June 2026), I worked on ISEA—the Infrastructure System & Equipment Readiness Assessment platform. I engineered 7 end-to-end assessment modules in ASP.NET MVC, Entity Framework, SQL Server, and Telerik UI, complete with multi-stage approval workflows, audit trails, and role-based access control.',
      idn: 'Di PT Pertamina Hulu Rokan (Jakarta Selatan, Desember 2025 – Juni 2026), aku ikut menggarap ISEA—platform Infrastructure System & Equipment Readiness Assessment. Aku bangun 7 modul asesmen end-to-end pakai ASP.NET MVC, Entity Framework, SQL Server, dan Telerik UI, lengkap dengan alur persetujuan bertingkat, audit trail, dan akses berbasis peran (RBAC).',
    },
    {
      en: 'At Pertamina Hulu Rokan I built 7 end-to-end modules for the ISEA readiness assessment platform.',
      idn: 'Di Pertamina Hulu Rokan aku bangun 7 modul end-to-end untuk platform asesmen kesiapan ISEA.',
    },
    'experience',
    'experience',
  ),
  'exp-fif': reply(
    {
      en: 'Those three internships gave me a strong foundation! At FIFGROUP (June 2024 – Jan 2025), I built a web-based HRIS and API Central—standardizing 100+ enterprise APIs with a custom Postman-to-Swagger converter in Angular and Spring Boot. At Javan Cipta Solusi (MSIB, Jan – June 2025), I built enterprise Angular components. And at BRIN (Oct – Nov 2025), I researched deep-learning super-resolution models for satellite remote sensing.',
      idn: 'Tiga pengalaman magang itu ngasih fondasi yang kuat banget buatku! Di FIFGROUP (Juni 2024 – Jan 2025), aku bangun HRIS web dan API Central—nyatuin 100+ API perusahaan lengkap dengan alat konverter Postman-ke-Swagger pakai Angular & Spring Boot. Di Javan Cipta Solusi (MSIB, Jan – Juni 2025), aku ngembangin komponen enterprise pakai Angular. Terus di BRIN (Okt – Nov 2025), aku riset model deep learning super-resolution buat citra satelit.',
    },
    {
      en: 'FIFGROUP (HRIS & 100+ APIs in API Central), Javan (MSIB Angular dev), and BRIN (satellite image super-resolution research).',
      idn: 'FIFGROUP (HRIS & 100+ API di API Central), Javan (Angular dev MSIB), dan BRIN (riset super-resolution citra satelit).',
    },
    'experience',
    'experience',
    [
      { id: 'exp-javan-more', en: 'More on Javan (MSIB)', idn: 'Detail waktu di Javan (MSIB)', to: 'exp-javan' },
      { id: 'exp-brin-more', en: 'More on BRIN research', idn: 'Detail riset di BRIN', to: 'exp-brin' },
    ],
  ),
  'exp-javan': reply(
    {
      en: 'During my MSIB internship at PT Javan Cipta Solusi in Yogyakarta (January – June 2025), I worked as an Angular Programmer in an Agile Scrum team—building reusable TypeScript & Tailwind components and wiring up RESTful backend integrations.',
      idn: 'Waktu magang MSIB di PT Javan Cipta Solusi Yogyakarta (Januari – Juni 2025), aku berperan sebagai Angular Programmer di tim Agile Scrum—bikin komponen TypeScript & Tailwind yang reusable dan nyambungin integrasi REST API ke backend.',
    },
    {
      en: 'Angular Programmer at Javan Cipta Solusi (Jan – June 2025).',
      idn: 'Angular Programmer di Javan Cipta Solusi (Jan – Juni 2025).',
    },
    'experience',
    'experience',
  ),
  'exp-brin': reply(
    {
      en: 'At BRIN (the National Research and Innovation Agency in Central Jakarta, October – November 2025), I trained and benchmarked deep-learning super-resolution models in Python to sharpen low-resolution satellite imagery, measuring PSNR and SSIM gains.',
      idn: 'Di BRIN (Badan Riset dan Inovasi Nasional, Jakarta Pusat, Oktober – November 2025), aku melatih dan menguji model deep-learning super-resolution pakai Python buat mempertajam resolusi citra satelit, sambil ngukur peningkatan akurasi PSNR dan SSIM-nya.',
    },
    {
      en: 'Deep-learning super-resolution research for satellite imagery at BRIN.',
      idn: 'Riset deep-learning super-resolution untuk citra satelit di BRIN.',
    },
    'experience',
    'experience',
  ),
  'exp-free': reply(
    {
      en: 'I’ve been taking remote freelance projects since August 2023. Clients usually come to me when they need either a full web application built from scratch (React, Next.js, Laravel, Node.js, or .NET) or a complete Figma UI/UX design system ready for handoff. So far I’ve delivered 20+ freelance projects.',
      idn: 'Aku sudah jalanin freelance secara remote sejak Agustus 2023. Biasanya klien datang kalau butuh dibikinin aplikasi web dari nol (pakai React, Next.js, Laravel, Node.js, atau .NET) atau butuh sistem desain UI/UX lengkap di Figma yang siap di-coding. Sejauh ini sudah 20+ proyek freelance yang kuselesaikan.',
    },
    {
      en: 'Remote freelance full-stack & UI/UX developer since August 2023 with 20+ delivered projects.',
      idn: 'Freelance full-stack & UI/UX remote sejak Agustus 2023 dengan 20+ proyek selesai.',
    },
    'experience',
    'experience',
  ),
  'exp-org': reply(
    {
      en: 'In college I wore two community hats: I was part of the Core Team (Public Relations) at Google Developer Student Club (GDSC) IT Del from Nov 2023 to Nov 2024, and I served as Head of the Social Division in BEM IT Del from Oct 2023 to Nov 2024, organizing outreach and off-campus programs.',
      idn: 'Waktu kuliah aku aktif di dua organisasi ini: jadi Core Team (Humas) di Google Developer Student Club (GDSC) IT Del dari Nov 2023 sampai Nov 2024, dan menjabat sebagai Kepala Divisi Sosial di BEM IT Del dari Okt 2023 sampai Nov 2024 buat ngurus kegiatan sosial dan komunikasi luar kampus.',
    },
    {
      en: 'GDSC IT Del Core Team (PR) and Head of the Social Division at BEM IT Del.',
      idn: 'Core Team GDSC IT Del (Humas) dan Kepala Divisi Sosial BEM IT Del.',
    },
    'experience',
    'experience',
  ),
  'exp-now': reply(
    {
      en: 'Two of my work tracks are active right now: my full-time contract at PT Tower Bersama Infrastructure in South Jakarta, and my remote freelance practice for custom web and UI/UX projects.',
      idn: 'Ada dua jalur yang aktif sekarang: kontrak kerjaku di PT Tower Bersama Infrastructure di Jakarta Selatan, sama kerjaan freelance remote-ku untuk proyek web dan desain UI/UX.',
    },
    {
      en: 'Tower Bersama is my current full-time contract, and freelance is open on the side.',
      idn: 'Tower Bersama kontrak utamaku sekarang, dan freelance tetap jalan untuk proyek luar.',
    },
    'experience',
    'experience',
  ),
  'exp-places': reply(
    {
      en: 'Tower Bersama, Pertamina Hulu Rokan, and FIFGROUP are all in South Jakarta. BRIN is in Central Jakarta, Javan Cipta Solusi was in Yogyakarta, and my freelance work is 100% remote.',
      idn: 'Tower Bersama, Pertamina Hulu Rokan, dan FIFGROUP semuanya di Jakarta Selatan. BRIN di Jakarta Pusat, Javan Cipta Solusi di Yogyakarta, dan kalau kerjaan freelance-ku 100% remote.',
    },
    {
      en: 'South Jakarta, Central Jakarta, Yogyakarta, and remote.',
      idn: 'Jakarta Selatan, Jakarta Pusat, Yogyakarta, dan remote.',
    },
    'experience',
    'experience',
  ),

  /* ============================================================================
   * 04 — SERVICES / DRAFTING TABLE STATION
   * ========================================================================== */
  services: {
    section: true,
    say: {
      en: 'Welcome to Room 04, my Drafting Table! Here my core stack sits on the first sheet (`C#`, `ASP.NET MVC`, `.NET Core`, `SQL Server`, `Entity Framework`, `Telerik`), and as you scroll, 6 cyanotype blueprint sheets slide onto the board one by one—3 for software engineering and 3 for UI/UX design—while my paper hand sketches the diagrams.',
      idn: 'Selamat datang di Ruang 04, Meja Gambarku! Di lembar pertama ada core stack utamaku (`C#`, `ASP.NET MVC`, `.NET Core`, `SQL Server`, `Entity Framework`, `Telerik`). Terus waktu kamu scroll, 6 lembar kertas blueprint biru masuk satu per satu ke atas meja—3 lembar layanan engineering dan 3 lembar layanan desain UI/UX—sambil tanganku menggambar diagramnya.',
    },
    again: {
      en: 'Back at the Drafting Table! Want to talk about my .NET & SQL core stack, my 6 service blueprints, or the other frameworks and tools I use?',
      idn: 'Balik lagi di Meja Gambar! Mau bahas core stack .NET & SQL-ku, 6 lembar layanan di blueprint, atau framework dan tools lain yang kupakai?',
    },
    choices: [
      { id: 'svc-web', en: 'What are the 3 engineering blueprints?', idn: '3 lembar blueprint engineering itu apa aja?', to: 'svc-web' },
      { id: 'svc-ui', en: 'What are the 3 UI/UX design blueprints?', idn: '3 lembar blueprint desain UI/UX itu apa aja?', to: 'svc-ui' },
      { id: 'svc-code', en: 'What languages & frameworks do you use most?', idn: 'Bahasa & framework apa yang paling sering kamu pakai?', to: 'svc-code' },
      { id: 'svc-data', en: 'Which databases do you work with?', idn: 'Database apa aja yang biasa kamu pegang?', to: 'svc-data' },
      { id: 'svc-tools', en: 'What about Git, APIs, and daily tools?', idn: 'Kalau Git, API, dan tools harianmu apa aja?', to: 'svc-tools' },
    ],
  },
  'svc-web': reply(
    {
      en: 'Sheets 01 to 03 on the blueprint board cover my engineering side:\n1. Enterprise .NET applications (`ASP.NET MVC`, `.NET Core`, modular monolith decomposition, role-based access, and audit trails).\n2. SQL Server & data layers (stored procedures, indexing, Entity Framework, and transactional reporting).\n3. Internal dashboards & operational portals (Telerik UI grids, KPI dashboards, and multi-step approval workflows).',
      idn: 'Lembar 01 sampai 03 di papan blueprint itu layanan engineering-ku:\n1. Aplikasi Enterprise .NET (`ASP.NET MVC`, `.NET Core`, pemecahan monolit jadi modular, akses berbasis peran, dan audit trail).\n2. SQL Server & pengolahan data (stored procedure, indexing, Entity Framework, dan laporan transaksional).\n3. Dashboard internal & portal operasional (tabel Telerik UI, dashboard KPI, dan alur persetujuan bertingkat).',
    },
    {
      en: 'Enterprise .NET apps, SQL Server data engineering, and Telerik/internal operational dashboards.',
      idn: 'Aplikasi enterprise .NET, data engineering di SQL Server, dan dashboard operasional internal.',
    },
    'services',
    'services',
  ),
  'svc-ui': reply(
    {
      en: 'Sheets 04 to 06 cover my product design and frontend side:\n4. Interface design in Figma (wireframes, user flows, and clickable high-fidelity prototypes).\n5. Design systems & reusable UI components (consistent tokens, responsive layouts, and clean developer handoff).\n6. Modern web & mobile frontends (turning those Figma screens into live Next.js, React, Angular, Vue, or Flutter interfaces).',
      idn: 'Lembar 04 sampai 06 itu sisi desain produk dan frontend-ku:\n4. Desain antarmuka di Figma (wireframe, alur pengguna, sampai prototipe yang bisa diklik).\n5. Design system & komponen UI reusable (token yang konsisten, layout responsif, dan gampang di-coding).\n6. Frontend web & mobile modern (mengubah desain Figma tadi jadi aplikasi live pakai Next.js, React, Angular, Vue, atau Flutter).',
    },
    {
      en: 'Figma interface design, reusable design systems, and live frontend implementation.',
      idn: 'Desain antarmuka Figma, design system yang reusable, dan implementasi langsung ke kode frontend.',
    },
    'services',
    'services',
  ),
  'svc-code': reply(
    {
      en: 'My primary stack at work is C#, ASP.NET MVC, .NET Core, Entity Framework, SQL Server, and Telerik UI. Right beside that, I build full-stack web apps with TypeScript, JavaScript, React, Next.js (up to Next.js 16 & React 19), Angular, Vue 3, Spring Boot (Java), Express/Node.js, Laravel (PHP), Python, and Flutter.',
      idn: 'Stack utamaku di kerjaan sekarang itu C#, ASP.NET MVC, .NET Core, Entity Framework, SQL Server, dan Telerik UI. Di samping itu, aku aktif bikin aplikasi full-stack pakai TypeScript, JavaScript, React, Next.js (sampai Next.js 16 & React 19), Angular, Vue 3, Spring Boot (Java), Express/Node.js, Laravel (PHP), Python, dan Flutter.',
    },
    {
      en: 'Core in C# / .NET / SQL Server, plus TypeScript, React, Next.js, Angular, Vue 3, Spring Boot, Laravel, and Flutter.',
      idn: 'Inti di C# / .NET / SQL Server, ditambah TypeScript, React, Next.js, Angular, Vue 3, Spring Boot, Laravel, dan Flutter.',
    },
    'services',
    'services',
  ),
  'svc-data': reply(
    {
      en: 'In enterprise environments I work daily with Microsoft SQL Server (stored procedures, complex joins, indexing, and Entity Framework). Across my web and mobile projects I also use PostgreSQL (especially with Supabase), MySQL, and MongoDB.',
      idn: 'Di lingkungan enterprise, sehari-hari aku pegang Microsoft SQL Server (bikin stored procedure, query kompleks, indexing, dan Entity Framework). Kalau di proyek web dan mobile lainnya, aku juga sering pakai PostgreSQL (terutama lewat Supabase), MySQL, dan MongoDB.',
    },
    {
      en: 'SQL Server for enterprise work, plus PostgreSQL / Supabase, MySQL, and MongoDB.',
      idn: 'SQL Server untuk sistem enterprise, ditambah PostgreSQL / Supabase, MySQL, dan MongoDB.',
    },
    'services',
    'services',
  ),
  'svc-tools': reply(
    {
      en: 'For version control and APIs, I use Git (GitHub & GitLab), Postman, and Swagger/OpenAPI every day—I even built a Postman-to-Swagger converter at FIFGROUP. For coding and design, my daily drivers are VS Code, Visual Studio, Figma, and Tailwind CSS.',
      idn: 'Buat urusan versi kode dan API, tiap hari aku pakai Git (GitHub & GitLab), Postman, dan Swagger/OpenAPI—malah waktu di FIFGROUP aku sempat bikin alat konverter Postman-ke-Swagger. Kalau buat ngoding dan desain, senjata harianku VS Code, Visual Studio, Figma, dan Tailwind CSS.',
    },
    {
      en: 'Git, GitHub/GitLab, Postman, Swagger, VS Code, Visual Studio, and Figma.',
      idn: 'Git, GitHub/GitLab, Postman, Swagger, VS Code, Visual Studio, dan Figma.',
    },
    'services',
    'services',
  ),

  /* ============================================================================
   * 04b — PROJECTS / GALLERY WALL STATION
   * ========================================================================== */
  projects: {
    section: true,
    say: {
      en: 'This is Room 04b, my Shadow-Box Gallery! I hung 8 of my favorite projects on the wire here—including my newest builds, MejaScalp and BukuDompet—while I stand on the wooden ladder under the track spotlight. You can drag or scroll the rail sideways, click any frame to read its full case study with slides, or open the Archive Drawer to browse all 24 projects!',
      idn: 'Ini Ruang 04b, Dinding Galeri Proyekku! Ada 8 proyek favorit yang kugantung di kawat galeri ini—termasuk dua karya terbaruku, MejaScalp dan BukuDompet—sambil karakterku berdiri di atas tangga kayu di bawah lampu sorot. Kamu bisa geser relnya ke samping, klik bingkai mana aja buat baca studi kasus & lihat slide-nya, atau buka Laci Arsip buat lihat total 24 proyekku!',
    },
    again: {
      en: 'Back at the Gallery Wall! Want to hear about MejaScalp, BukuDompet, API Central, Shipment Tracker, Del-Pick, or what’s inside the 24-project archive drawer?',
      idn: 'Balik lagi di Dinding Galeri! Mau aku ceritain soal MejaScalp, BukuDompet, API Central, Shipment Tracker, Del-Pick, atau isi laci arsip 24 proyekku?',
    },
    choices: [
      { id: 'prj-mejascalp', en: 'What is MejaScalp (AI Crypto Assistant)?', idn: 'MejaScalp (Asisten Kripto AI) itu aplikasi apa?', to: 'prj-mejascalp' },
      { id: 'prj-bukudompet', en: 'What is BukuDompet (Family Money Journal)?', idn: 'BukuDompet (Jurnal Uang Keluarga) itu apa?', to: 'prj-bukudompet' },
      { id: 'prj-web', en: 'Tell me about API Central, Shipment & Hiring', idn: 'Ceritain API Central, Shipment & Hiring dong', to: 'prj-web' },
      { id: 'prj-group', en: 'What is Del-Pick and your team projects?', idn: 'Del-Pick dan proyek timmu yang lain itu apa?', to: 'prj-group' },
      { id: 'prj-design', en: 'Show me your Figma UI/UX projects', idn: 'Lihat proyek desain UI/UX Figma-mu dong', to: 'prj-design' },
      { id: 'prj-archive', en: 'How many total projects are in the drawer?', idn: 'Total ada berapa proyek di dalam laci arsip?', to: 'prj-archive' },
    ],
  },
  'prj-mejascalp': reply(
    {
      en: 'MejaScalp is my AI Crypto Scalping Assistant built with Next.js 16, React 19, TypeScript, Supabase, and a Node.js price worker. It watches Binance and DEX prices 24/7 via WebSocket and fires an instant Telegram alert the second your position hits its target. I also wired Gemini (with Groq as fallback) to read the candlesticks, SMA, and volume and give a clear BUY or DO NOT BUY breakdown.',
      idn: 'MejaScalp itu aplikasi Asisten Scalping Kripto AI yang kubangun pakai Next.js 16, React 19, TypeScript, Supabase, dan worker Node.js. Aplikasinya mantau harga Binance dan DEX 24 jam lewat WebSocket, terus langsung kirim notifikasi Telegram begitu posisi trading nyentuh target. Aku juga pasang AI (Gemini dengan cadangan Groq) yang baca candlestick, SMA, dan volume buat ngasih pertimbangan BELI atau JANGAN BELI.',
    },
    {
      en: 'MejaScalp tracks crypto positions 24/7 with Node.js + Binance WebSockets, Telegram alerts, and Gemini/Groq AI chart analysis.',
      idn: 'MejaScalp memantau posisi kripto 24/7 dengan Node.js + Binance WebSocket, notifikasi Telegram, dan analisis grafik AI Gemini/Groq.',
    },
    'projects',
    'projects',
  ),
  'prj-bukudompet': reply(
    {
      en: 'BukuDompet is a mobile-first Family Money Journal I built with Next.js 15, React 19, Supabase, Zustand, and Motion. One app serves three roles in a family: teens and adults log item-by-item spending (with odd-amount checks, wallets, streaks, and a growing pet), primary-school kids learn money habits through a story journal and 49 mini learning games, and parents get a portal to approve requests and set weekly budgets.',
      idn: 'BukuDompet itu aplikasi Jurnal Kas Keluarga mobile-first yang kubuat pakai Next.js 15, React 19, Supabase, Zustand, dan Motion. Uniknya, satu aplikasi punya tiga peran: remaja & dewasa nyatat pengeluaran per barang (lengkap dengan deteksi nominal janggal, dompet, streak, dan peliharaan virtual), anak SD belajar melek uang lewat jurnal cerita & 49 game edukasi, sedangkan orang tua punya portal buat setujui permintaan dan atur budget mingguan.',
    },
    {
      en: 'BukuDompet brings parents, teens, and kids together in one family finance app with 49 learning games.',
      idn: 'BukuDompet menyatukan orang tua, remaja, dan anak di satu aplikasi keuangan keluarga dengan 49 game belajar.',
    },
    'projects',
    'projects',
  ),
  'prj-web': reply(
    {
      en: 'Here are the other featured web apps hanging on the wire:\n• API Central (Angular + Spring Boot): centralizes 100+ enterprise API docs with a Postman-to-Swagger converter.\n• Shipment Transport Tracker (Vue 3 + Pinia + Mirage.js): real-time logistics route simulation with dark/light mode.\n• Hiring Platform (Next.js 16 + Supabase Auth): role-based job portal for admins and candidates.\n• Influencer Marketplace (Next.js 14 + Supabase): connects brands and creators with separate desktop/mobile views.',
      idn: 'Ini beberapa aplikasi web pilihan lain yang tergantung di kawat galeri:\n• API Central (Angular + Spring Boot): nyatuin 100+ dokumentasi API perusahaan lengkap dengan konverter Postman-ke-Swagger.\n• Shipment Transport Tracker (Vue 3 + Pinia + Mirage.js): pelacakan logistik dengan simulasi rute real-time.\n• Hiring Platform (Next.js 16 + Supabase Auth): portal rekrutmen dengan akses berbasis peran buat admin & pelamar.\n• Marketplace Influencer (Next.js 14 + Supabase): platform kolaborasi brand dan kreator.',
    },
    {
      en: 'API Central, Shipment Tracker, Hiring Platform, and Influencer Marketplace are all right on the gallery wire.',
      idn: 'API Central, Shipment Tracker, Hiring Platform, dan Marketplace Influencer semuanya ada di kawat galeri.',
    },
    'projects',
    'projects',
    [
      { id: 'prj-api-more', en: 'Details on API Central', idn: 'Detail API Central', to: 'prj-api' },
      { id: 'prj-ship-more', en: 'Details on Shipment Tracker', idn: 'Detail Shipment Tracker', to: 'prj-ship' },
      { id: 'prj-hire-more', en: 'Details on Hiring Platform', idn: 'Detail Hiring Platform', to: 'prj-hire' },
      { id: 'prj-market-more', en: 'Details on Influencer Marketplace', idn: 'Detail Marketplace Influencer', to: 'prj-market' },
    ],
  ),
  'prj-api': reply(
    {
      en: 'I built API Central with Angular, TypeScript, Spring Boot, and Java to solve scattered API docs. It includes a Postman-to-Swagger converter and has both a live demo and a public GitHub repo.',
      idn: 'Aku bangun API Central pakai Angular, TypeScript, Spring Boot, dan Java buat merapikan dokumentasi API yang tadinya tersebar. Di dalamnya ada konverter Postman-ke-Swagger, dan kamu bisa coba langsung lewat link demo atau cek kodenya di GitHub.',
    },
    { en: 'API Central runs on Angular and Spring Boot with a Postman-to-Swagger converter.', idn: 'API Central berjalan di Angular dan Spring Boot dengan konverter Postman-ke-Swagger.' },
    'prj-web',
    'projects',
  ),
  'prj-ship': reply(
    {
      en: 'Shipment – Transport Tracker is a logistics SPA I built with Vue 3 (Composition API), TypeScript, Tailwind CSS, Pinia, and Mirage.js. Mirage simulates realistic network latency and live delivery status transitions so you can test the whole tracking flow in the live demo.',
      idn: 'Shipment – Transport Tracker itu aplikasi logistik yang kubuat pakai Vue 3 (Composition API), TypeScript, Tailwind CSS, Pinia, dan Mirage.js. Mirage dipakai buat nyimulasiin latensi jaringan dan perpindahan status kurir secara real-time, jadi alur lacaknya kerasa hidup waktu dicoba di demo.',
    },
    { en: 'Shipment Tracker uses Vue 3, Pinia, and Mirage.js with a live demo and GitHub repo.', idn: 'Shipment Tracker memakai Vue 3, Pinia, dan Mirage.js lengkap dengan demo dan GitHub.' },
    'prj-web',
    'projects',
  ),
  'prj-hire': reply(
    {
      en: 'The Hiring Platform is built with Next.js 16, React, TypeScript, Tailwind CSS, Supabase Auth (RBAC), Zustand, and React Hook Form. Admins post and manage openings while jobseekers browse and apply.',
      idn: 'Hiring Platform ini kubangun pakai Next.js 16, React, TypeScript, Tailwind CSS, Supabase Auth (RBAC), Zustand, dan React Hook Form. Admin bisa kelola lowongan kerja, sementara kandidat bisa cari dan melamar langsung.',
    },
    { en: 'The Hiring Platform runs on Next.js 16, Supabase Auth, and Zustand.', idn: 'Hiring Platform berjalan dengan Next.js 16, Supabase Auth, dan Zustand.' },
    'prj-web',
    'projects',
  ),
  'prj-market': reply(
    {
      en: 'The Influencer Marketplace connects brands with creators using Next.js 14, TypeScript, Tailwind CSS, and Supabase, with dedicated responsive layouts for desktop and mobile and a live Vercel demo.',
      idn: 'Marketplace Influencer ini menghubungkan brand dengan kreator pakai Next.js 14, TypeScript, Tailwind CSS, dan Supabase, lengkap dengan tampilan khusus desktop & mobile serta demo live di Vercel.',
    },
    { en: 'The Influencer Marketplace is built with Next.js 14 and Supabase.', idn: 'Marketplace Influencer dibangun dengan Next.js 14 dan Supabase.' },
    'prj-web',
    'projects',
  ),
  'prj-staff': reply(
    {
      en: 'Employee Management System is a full CRUD web app with role-based access control that I built using Angular, Spring Boot, Java, JWT, MySQL, and Bootstrap.',
      idn: 'Employee Management System adalah aplikasi web CRUD manajemen data karyawan dengan akses berbasis peran yang kubuat pakai Angular, Spring Boot, Java, JWT, MySQL, dan Bootstrap.',
    },
    { en: 'Employee Management uses Angular, Spring Boot, JWT, and MySQL.', idn: 'Manajemen Karyawan memakai Angular, Spring Boot, JWT, dan MySQL.' },
    'prj-web',
    'projects',
  ),
  'prj-group': reply(
    {
      en: 'On the team side, my highlight is Del-Pick—a mobile delivery app where I led a 3-person team, translated 20+ Figma screens into Flutter, and integrated 30+ Express.js & MySQL REST APIs for order matching and routing. In the archive drawer you’ll also find SEMAT DEL (IT Del admissions in Laravel 9), FRK & FED (faculty performance system), a Dental Disease Expert System in Python, a DES encryption tool, and Clicknik.',
      idn: 'Di kategori proyek tim, unggulanku itu Del-Pick—aplikasi antar-jemput mobile di mana aku mimpin tim 3 orang, nerjemahin 20+ layar Figma ke Flutter, dan nyambungin 30+ REST API Express.js & MySQL buat pesanan dan rute driver. Kalau kamu buka laci arsip, ada juga SEMAT DEL (web mahasiswa baru IT Del pakai Laravel 9), sistem kinerja FRK & FED, Sistem Pakar Gigi pakai Python, enkripsi DES, dan Clicknik.',
    },
    {
      en: 'Del-Pick (Flutter + Express.js delivery app) leads my 6 team projects, alongside SEMAT DEL and FRK & FED.',
      idn: 'Del-Pick (aplikasi kurir Flutter + Express.js) jadi andalan dari 6 proyek timku, bareng SEMAT DEL dan FRK & FED.',
    },
    'projects',
    'projects',
  ),
  'prj-design': reply(
    {
      en: 'I have 7 UI/UX design projects in Figma! On the gallery wire you’ll see Sportainment App (sports facility booking & community events). Inside the archive drawer you can also explore Beauty E-Commerce Mobile App, DinoShop Electronics, Del-Pick’s 20+ mobile screens, an Assets Management Dashboard (10 slides), a Campus Portal redesign (9 slides), and Gordenaise Luxury Home Decor (10 slides).',
      idn: 'Ada 7 proyek desain UI/UX yang kukerjakan di Figma! Di kawat galeri ada Sportainment App (aplikasi booking lapangan & komunitas olahraga). Kalau di laci arsip, kamu juga bisa lihat Beauty E-Commerce Mobile App, DinoShop Electronics, desain 20+ layar Del-Pick, Dashboard Manajemen Aset (10 slide), redesign Portal Kampus (9 slide), dan Gordenaise Luxury Home Decor (10 slide).',
    },
    {
      en: '7 Figma UI/UX projects including Sportainment, Beauty E-Commerce, Assets Management, Campus Portal, and Gordenaise.',
      idn: '7 proyek UI/UX Figma termasuk Sportainment, Beauty E-Commerce, Manajemen Aset, Portal Kampus, dan Gordenaise.',
    },
    'projects',
    'projects',
    [
      { id: 'prj-beauty-more', en: 'About Beauty E-Commerce design', idn: 'Tentang desain Beauty E-Commerce', to: 'prj-beauty' },
      { id: 'prj-campus-more', en: 'About Campus Portal redesign', idn: 'Tentang redesign Portal Kampus', to: 'prj-campus' },
    ],
  ),
  'prj-beauty': reply(
    {
      en: 'The Beauty E-Commerce Mobile App is a skincare shopping prototype I designed in Figma with a reusable mobile component library and an interactive checkout flow.',
      idn: 'Beauty E-Commerce Mobile App itu prototipe belanja skincare di ponsel yang kurancang di Figma, lengkap dengan komponen design system dan alur checkout interaktif yang bisa diklik.',
    },
    { en: 'A clickable mobile skincare e-commerce prototype in Figma.', idn: 'Prototipe e-commerce skincare mobile yang bisa diklik di Figma.' },
    'prj-design',
    'projects',
  ),
  'prj-campus': reply(
    {
      en: 'The Campus Portal Design is a 9-slide Figma redesign of the university website, reorganizing the information architecture so students and prospective applicants can find academic info without getting lost.',
      idn: 'Desain Portal Kampus ini proyek redesign 9 slide di Figma untuk merapikan arsitektur informasi web kampus, supaya mahasiswa dan calon pendaftar gampang nyari pengumuman akademik.',
    },
    { en: 'A 9-slide Figma redesign focused on campus information architecture.', idn: 'Redesign 9 slide di Figma yang fokus pada kemudahan navigasi informasi kampus.' },
    'prj-design',
    'projects',
  ),
  'prj-archive': reply(
    {
      en: 'There are 24 projects in total inside the Archive Drawer: 11 individual web apps (from MejaScalp and BukuDompet to Employee Management and Mini Games), 6 team projects, and 7 Figma UI/UX case studies. You can filter them by category or search by tool name right inside the drawer.',
      idn: 'Totalnya ada 24 proyek di dalam Laci Arsip: 11 aplikasi web individu (mulai dari MejaScalp dan BukuDompet sampai Employee Management dan Mini Games), 6 proyek tim, dan 7 studi kasus desain UI/UX Figma. Di dalam lacinya kamu bebas filter per kategori atau ketik nama teknologinya.',
    },
    {
      en: '24 projects total: 11 individual web apps, 6 team projects, and 7 UI/UX designs.',
      idn: 'Total 24 proyek: 11 web individu, 6 proyek tim, dan 7 desain UI/UX.',
    },
    'projects',
    'projects',
  ),

  /* ============================================================================
   * 05 — CERTIFICATES / ARCHIVE SHELF STATION
   * ========================================================================== */
  certificates: {
    section: true,
    say: {
      en: 'Welcome to Room 05, my Certificate Shelf! I bound my 13 certificates into 4 hardcover books on the wooden shelf: Dicoding Courses (4), Activities & Competitions (5), Campus Organizations (2), and Internships (2). As you scroll down on desktop, each book flies off the shelf and opens its pages in 3D so you can click any certificate to view the original file!',
      idn: 'Selamat datang di Ruang 05, Rak Buku Sertifikatku! Ke-13 sertifikatku kujilid jadi 4 buku tebal di rak kayu ini: Kursus Dicoding (4), Kegiatan & Kompetisi (5), Organisasi Kampus (2), dan Magang (2). Waktu kamu scroll di layar desktop, bukunya bakal terbang satu-satu dari rak terus membuka halamannya secara 3D, dan tiap baris bisa langsung kamu klik buat lihat file aslinya!',
    },
    again: {
      en: 'Back at the Certificate Shelf! Which of the 4 books do you want to peek into—Dicoding, Activities & Competitions, Organizations, or Internships?',
      idn: 'Balik lagi di Rak Sertifikat! Buku mana dari 4 jilid ini yang mau kamu intip—Dicoding, Kegiatan & Kompetisi, Organisasi, atau Magang?',
    },
    choices: [
      { id: 'cert-code', en: 'What is inside the Dicoding book?', idn: 'Isi buku Sertifikasi Dicoding apa aja?', to: 'cert-code' },
      { id: 'cert-event', en: 'What is in Activities & Competitions?', idn: 'Isi buku Kegiatan & Kompetisi apa aja?', to: 'cert-event' },
      { id: 'cert-org', en: 'What is in the Organization book?', idn: 'Isi buku Kepemimpinan Organisasi apa?', to: 'cert-org' },
      { id: 'cert-intern', en: 'What is in the Internship book?', idn: 'Isi buku Sertifikat Magang apa?', to: 'cert-intern' },
    ],
  },
  'cert-code': reply(
    {
      en: 'The first book holds my 4 Dicoding Indonesia web certifications: Basic JavaScript Programming (ES6+ & async), Basic Web Programming (HTML & CSS), Front-End Web for Beginners, and Fundamental Front-End Web Development. Every entry opens its original PDF.',
      idn: 'Buku pertama isinya 4 sertifikat web dari Dicoding Indonesia: Pemrograman Dasar JavaScript (ES6+ & async), Pemrograman Web Dasar (HTML & CSS), Web Front-End untuk Pemula, dan Fundamental Pengembangan Web Front-End. Tiap judul kalau diklik langsung buka PDF aslinya.',
    },
    {
      en: '4 Dicoding certificates covering JavaScript, HTML/CSS, and Front-End Web Development.',
      idn: '4 sertifikat Dicoding yang mencakup JavaScript, HTML/CSS, dan Pengembangan Web Front-End.',
    },
    'certificates',
    'certificates',
  ),
  'cert-event': reply(
    {
      en: 'The second book holds 5 certificates from workshops, committees, and student competitions: my PKM (Student Creativity Program) competition certificate, AI completion certificate, Cyber Security Training, Principal Component Analysis (PCA), and IT Del Festival 2023 committee certificate.',
      idn: 'Buku kedua menyimpan 5 sertifikat dari pelatihan, kepanitiaan, dan lomba mahasiswa: Sertifikat Kompetisi PKM (Program Kreativitas Mahasiswa), Sertifikat AI, Pelatihan Keamanan Siber, Principal Component Analysis (PCA), dan kepanitiaan IT Del Festival 2023.',
    },
    {
      en: '5 certificates: PKM competition, AI, Cyber Security, PCA, and IT Del Festival 2023.',
      idn: '5 sertifikat: Kompetisi PKM, AI, Keamanan Siber, PCA, dan IT Del Festival 2023.',
    },
    'certificates',
    'certificates',
  ),
  'cert-org': reply(
    {
      en: 'The third book holds my 2 campus leadership certificates from Institut Teknologi Del: serving as Head of the Social Division in BEM IT Del, and serving on the Core Team (Public Relations) of Google Developer Student Club (GDSC) IT Del.',
      idn: 'Buku ketiga isinya 2 sertifikat kepemimpinan organisasi waktu di Institut Teknologi Del: sertifikat Kepala Divisi Sosial BEM IT Del, dan sertifikat Core Team (Divisi Humas) Google Developer Student Club (GDSC) IT Del.',
    },
    {
      en: '2 leadership certificates from BEM IT Del and GDSC IT Del.',
      idn: '2 sertifikat organisasi dari BEM IT Del dan GDSC IT Del.',
    },
    'certificates',
    'certificates',
  ),
  'cert-intern': reply(
    {
      en: 'The fourth book holds my 2 official internship completion certificates: Kampus Merdeka MSIB Batch 7 and my Angular Programmer internship certificate from PT Javan Cipta Solusi.',
      idn: 'Buku keempat berisi 2 sertifikat resmi kelulusan magangku: sertifikat program Kampus Merdeka MSIB Angkatan 7 dan sertifikat magang Angular Programmer dari PT Javan Cipta Solusi.',
    },
    {
      en: 'MSIB Batch 7 certificate and PT Javan Cipta Solusi Angular internship certificate.',
      idn: 'Sertifikat MSIB Angkatan 7 dan sertifikat magang Angular di PT Javan Cipta Solusi.',
    },
    'certificates',
    'certificates',
  ),

  /* ============================================================================
   * 06 — CONTACT / MAIL TRAY STATION
   * ========================================================================== */
  contact: {
    section: true,
    say: {
      en: 'And here’s Room 06, my Mail Tray at golden hour! If you’d like to talk about a software engineering role, a freelance web or UI/UX project, or just say hi, you can reach me directly by email, WhatsApp, LinkedIn, or write a letter right on this desk (it even stamps a red postmark when you hit send!).',
      idn: 'Dan ini Ruang 06, Baki Suratku di suasana sore keemasan! Kalau kamu mau ngobrol soal peluang kerja software engineer, proyek freelance web atau desain UI/UX, atau sekadar menyapa, kamu bisa hubungi aku langsung lewat email, WhatsApp, LinkedIn, atau tulis surat langsung di meja ini (nanti ada stempel pos merahnya waktu dikirim!).',
    },
    again: {
      en: 'We’re at the Mail Tray! Do you need my email address, my WhatsApp/phone number, or details on how the letter form works?',
      idn: 'Kita di Baki Surat! Kamu butuh alamat emailku, nomor WhatsApp/teleponku, atau mau tanya cara kerja formulir suratnya?',
    },
    choices: [
      { id: 'contact-mail', en: 'What is your email address?', idn: 'Alamat emailmu apa?', to: 'contact-mail' },
      { id: 'contact-wa', en: 'Can I reach you on WhatsApp?', idn: 'Bisa chat lewat WhatsApp nggak?', to: 'contact-wa' },
      { id: 'contact-phone', en: 'What is your phone number & location?', idn: 'Nomor telepon & domisilimu di mana?', to: 'contact-phone' },
      { id: 'contact-form', en: 'Does the letter form send directly to you?', idn: 'Formulir surat di halaman ini langsung masuk ke kamu?', to: 'contact-form' },
      { id: 'contact-write', en: 'What should I include if I’m hiring or have a project?', idn: 'Enaknya nulis info apa aja kalau mau rekrut atau ada proyek?', to: 'contact-write' },
    ],
  },
  'contact-mail': reply(
    {
      en: 'My email is r.haikal1610@gmail.com. It goes straight to my primary inbox, and I check it every day.',
      idn: 'Email pribadiku di r.haikal1610@gmail.com. Pesan ke situ langsung masuk ke inbox utamaku dan selalu kucek setiap hari.',
    },
    { en: 'You can email me anytime at r.haikal1610@gmail.com.', idn: 'Kamu bisa kirim email kapan aja ke r.haikal1610@gmail.com.' },
    'contact',
    'contact',
  ),
  'contact-wa': reply(
    {
      en: 'Yes, WhatsApp is usually the fastest way to reach me! My number is +62 853-6278-4585, or you can just tap the WhatsApp link on the contact sheet to open a chat right away.',
      idn: 'Bisa banget, malah WhatsApp biasanya cara paling cepat buat ngobrol sama aku! Nomorku di +62 853-6278-4585, atau klik aja link WhatsApp di kartu kontak biar langsung kebuka ruang chat-nya.',
    },
    {
      en: 'WhatsApp me anytime at +62 853-6278-4585.',
      idn: 'Langsung chat WhatsApp aja di +62 853-6278-4585.',
    },
    'contact',
    'contact',
  ),
  'contact-phone': reply(
    {
      en: 'My phone and WhatsApp number is +62 853-6278-4585, and I’m based in Jakarta, Indonesia (open to on-site roles in Jakarta as well as remote projects).',
      idn: 'Nomor telepon dan WhatsApp-ku sama di +62 853-6278-4585. Sekarang aku domisili di Jakarta, Indonesia (siap buat kerja on-site di Jakarta maupun proyek remote).',
    },
    {
      en: '+62 853-6278-4585 · Based in Jakarta, Indonesia.',
      idn: '+62 853-6278-4585 · Domisili di Jakarta, Indonesia.',
    },
    'contact',
    'contact',
  ),
  'contact-form': reply(
    {
      en: 'Yep! Just fill in your name, email, subject, and message on the second beat of the Contact room and hit "Send message". The paper sheet stamps a postmark, folds into the mail tray, and delivers your note straight to me.',
      idn: 'Iya, langsung masuk kok! Cukup isi nama, email, subjek, dan pesanmu di bagian kedua ruang Kontak terus klik "Kirim pesan". Nanti kertas suratnya bakal dicap stempel pos, masuk ke baki surat, dan pesannya langsung terkirim ke aku.',
    },
    {
      en: 'Fill in the four fields on the letter sheet and it sends straight to my inbox.',
      idn: 'Isi empat kolom di kertas surat itu dan pesannya langsung terkirim ke inbox-ku.',
    },
    'contact',
    'contact',
  ),
  'contact-write': reply(
    {
      en: 'A quick note with three things helps me reply fast: what you’re building (or the role you’re hiring for), the tech stack or scope you have in mind, and your target timeline. Even if it’s still a rough idea, send it over and we can figure out the blueprint together!',
      idn: 'Cukup ceritain singkat tiga hal ini biar aku bisa balas dengan tepat: lagi mau bangun aplikasi apa (atau posisi apa yang lagi dibuka), gambaran tech stack atau kebutuhannya, sama target waktunya kapan. Kalaupun idenya masih kasar, kirim aja dulu, nanti kita diskusikan bareng!',
    },
    {
      en: 'Just share the role or product idea, the rough scope/stack, and your timeline.',
      idn: 'Cukup kabari posisi atau ide produknya, gambaran fitur/stack-nya, dan target waktunya.',
    },
    'contact',
    'contact',
  ),

  /* ============================================================================
   * QUICK START GUIDE (FOR RECRUITERS, CLIENTS & VISITORS)
   * ========================================================================== */
  start: {
    section: true,
    say: {
      en: 'Glad you stopped by! To save you time, tell me what brings you here today and I’ll point you straight to the best part of my studio:',
      idn: 'Senang banget kamu sudah mampir! Biar hemat waktumu, kasih tahu aku tujuanmu mampir hari ini, nanti langsung kupilihkan jalur paling pas di studioku:',
    },
    again: {
      en: 'Want me to tailor the tour for hiring a software engineer, commissioning a project, or checking my background?',
      idn: 'Mau kupandu khusus buat rekrutmen engineer, kerja sama proyek/freelance, atau lihat riwayat karierku dulu?',
    },
    choices: [
      { id: 'start-hire', en: 'I’m hiring a software engineer', idn: 'Aku lagi cari / rekrut software engineer', to: 'start-hire' },
      { id: 'start-craft', en: 'I want to see your code & design work', idn: 'Aku mau lihat hasil kodingan & desainmu', to: 'start-craft' },
      { id: 'start-past', en: 'I want your career & academic timeline', idn: 'Aku mau lihat riwayat kerja & kuliahmu', to: 'start-past' },
    ],
  },
  'start-hire': reply(
    {
      en: 'Awesome—here is the quick snapshot for recruiters and engineering managers:\n• Current role: IT Software Developer at PT Tower Bersama Infrastructure (South Jakarta), where I split a legacy monolith into 8 modular .NET apps and built 3 executive dashboards.\n• Previous enterprise role: PT Pertamina Hulu Rokan, building 7 end-to-end readiness modules for ISEA in ASP.NET MVC, SQL Server & Telerik.\n• Education: B.Sc. in Informatics, IT Del (GPA 3.39/4.00).\n• Direct contact: r.haikal1610@gmail.com or WhatsApp +62 853-6278-4585, and my 2-page PDF CV is on the very first card!',
      idn: 'Siap—ini rangkuman cepat buat HR atau Engineering Manager:\n• Posisi sekarang: IT Software Developer di PT Tower Bersama Infrastructure (Jakarta Selatan), tempat aku memecah aplikasi monolit jadi 8 aplikasi modular .NET dan bangun 3 dashboard eksekutif.\n• Pengalaman enterprise sebelumnya: PT Pertamina Hulu Rokan, bangun 7 modul asesmen kesiapan ISEA pakai ASP.NET MVC, SQL Server & Telerik.\n• Pendidikan: S1 Informatika, IT Del (IPK 3,39/4,00).\n• Kontak langsung: r.haikal1610@gmail.com atau WhatsApp +62 853-6278-4585, dan CV PDF 2 halamanku bisa langsung diunduh di kartu paling atas!',
    },
    {
      en: 'Current .NET developer at Tower Bersama, ex-Pertamina Hulu Rokan, IT Del Informatics graduate. Reach me at r.haikal1610@gmail.com.',
      idn: 'Developer .NET di Tower Bersama, eks-Pertamina Hulu Rokan, lulusan Informatika IT Del. Hubungi aku di r.haikal1610@gmail.com.',
    },
    'start',
    'contact',
  ),
  'start-craft': reply(
    {
      en: 'If you want to judge my craft right away, check out two rooms:\n• Room 04 (Drafting Table) shows my core .NET + SQL Server stack and 6 service blueprints.\n• Room 04b (Gallery Wall) has 8 featured projects hanging on the wire—start with MejaScalp (Next.js 16 + AI + Binance WebSockets + Telegram bot) and BukuDompet (Next.js 15 family finance app with 49 learning games), or open the Archive Drawer for all 24 web, mobile, and Figma projects.',
      idn: 'Kalau mau langsung lihat kualitas karyaku, ada dua ruangan utama:\n• Ruang 04 (Meja Gambar) nunjukin core stack .NET + SQL Server dan 6 blueprint layananku.\n• Ruang 04b (Dinding Galeri) memajang 8 proyek unggulan di kawat galeri—coba cek MejaScalp (Next.js 16 + AI + Binance WebSocket + bot Telegram) dan BukuDompet (aplikasi keuangan keluarga dengan 49 game belajar), atau buka Laci Arsip buat lihat total 24 proyek web, mobile, dan Figma-ku.',
    },
    {
      en: 'Head to Room 04 for my stack blueprints or Room 04b for MejaScalp, BukuDompet, and all 24 projects.',
      idn: 'Mampir ke Ruang 04 buat lihat blueprint stack-ku atau Ruang 04b buat cek MejaScalp, BukuDompet, dan 24 proyek lainnya.',
    },
    'start',
    'projects',
  ),
  'start-past': reply(
    {
      en: 'My timeline runs neatly from 2021 to today:\n• 2026–Present: IT Software Developer at PT Tower Bersama Infrastructure.\n• Dec 2025–Jun 2026: Software Engineer at PT Pertamina Hulu Rokan (ISEA platform).\n• Oct–Nov 2025: AI/Deep Learning Research Intern at BRIN.\n• Jan–Jun 2025: Angular Programmer Intern (MSIB Batch 7) at PT Javan Cipta Solusi.\n• Jun 2024–Jan 2025: Full-Stack Developer Intern at FIFGROUP (HRIS & API Central).\n• Aug 2023–Present: Remote Freelance Full-Stack & UI/UX Developer (20+ projects).\n• 2021–2025: Informatics at IT Del (GPA 3.39), active in GDSC & BEM.',
      idn: 'Perjalanan karier dan kuliahku urut dari 2021 sampai sekarang:\n• 2026–Sekarang: IT Software Developer di PT Tower Bersama Infrastructure.\n• Des 2025–Jun 2026: Software Engineer di PT Pertamina Hulu Rokan (platform ISEA).\n• Okt–Nov 2025: Magang Riset AI/Deep Learning di BRIN.\n• Jan–Jun 2025: Magang Angular Programmer (MSIB Batch 7) di PT Javan Cipta Solusi.\n• Jun 2024–Jan 2025: Magang Full-Stack Developer di FIFGROUP (HRIS & API Central).\n• Agu 2023–Sekarang: Freelance Full-Stack & UI/UX Developer (20+ proyek).\n• 2021–2025: S1 Informatika di IT Del (IPK 3,39), aktif di GDSC & BEM.',
    },
    {
      en: '6 work milestones from 2023 to Tower Bersama today, backed by Informatics at IT Del.',
      idn: '6 jejak kerja dari 2023 sampai Tower Bersama sekarang, berbekal S1 Informatika di IT Del.',
    },
    'start',
    'experience',
  ),

  /* ============================================================================
   * META — ABOUT THIS PAPER CHARACTER & CHAT
   * ========================================================================== */
  meta: {
    say: {
      en: 'Haha, glad you asked! This paper guy is my hand-crafted cut-paper avatar (we call the chat widget EQbot, short for Eqi—my nickname!). Instead of plugging in a generic AI chatbot that might hallucinate facts, I wrote every single answer here myself in my own words so you get 100% real stories about my work.',
      idn: 'Haha, senang kamu nanya ini! Karakter kertas di samping ini avatar papercraft buatanku (fitur chat ini kunamai EQbot, dari panggilanku: Eqi!). Daripada pasang chatbot AI umum yang kadang suka ngarang jawaban, seluruh obrolan di sini kutulis sendiri pakai bahasaku supaya setiap cerita dan angka yang kamu baca 100% akurat sesuai pengalamanku.',
    },
    again: {
      en: 'Curious about how I built this paper character or how the chat works?',
      idn: 'Penasaran gimana aku bikin karakter kertas ini atau cara kerja obrolannya?',
    },
    choices: [
      { id: 'meta-ai', en: 'So are you a live AI or real Rifqi’s words?', idn: 'Jadi ini AI atau beneran tulisan Rifqi sendiri?', to: 'meta-ai' },
      { id: 'meta-type', en: 'Why do we pick questions instead of typing?', idn: 'Kenapa pilih tombol pertanyaan, bukan ngetik bebas?', to: 'meta-type' },
      { id: 'meta-code', en: 'How did you build the paper studio & lamps?', idn: 'Gimana cara kamu bikin studio kertas & lampunya?', to: 'meta-code' },
      { id: 'meta-secret', en: 'Any fun Easter eggs hidden on the page?', idn: 'Ada fitur rahasia atau Easter egg di halaman ini?', to: 'meta-secret' },
      { id: 'meta-lang', en: 'Can we switch between English and Indonesian?', idn: 'Bisa ganti bahasa Indonesia dan Inggris kapan aja?', to: 'meta-lang' },
    ],
  },
  'meta-ai': reply(
    {
      en: 'Every word here is written directly by me, Rifqi! That way, when I tell you about splitting a monolith into 8 apps at Tower Bersama, building 7 ISEA modules at Pertamina Hulu Rokan, or shipping MejaScalp and BukuDompet, you know not a single detail is made up.',
      idn: 'Setiap kalimat di sini kutulis langsung oleh aku sendiri, Rifqi! Jadi waktu aku cerita soal mecah monolit jadi 8 aplikasi di Tower Bersama, bangun 7 modul ISEA di Pertamina Hulu Rokan, atau bikin MejaScalp dan BukuDompet, nggak ada satu pun detail yang dikarang oleh bot.',
    },
    { en: '100% written by me—no hallucinated AI answers.', idn: '100% kutulis sendiri—nggak ada jawaban karangan AI.' },
    'meta',
  ),
  'meta-type': reply(
    {
      en: 'I designed it with guided topic chips so you never hit a dead-end "Sorry, I don’t understand" prompt, and you can explore every room with one tap. If you have a custom question for me, hit the Contact room or WhatsApp me at +62 853-6278-4585 and the real me will reply!',
      idn: 'Sengaja kurancang pakai pilihan topik kayak gini supaya kamu nggak pernah ketemu balasan buntu "Maaf, saya tidak mengerti", dan bisa lompat ke ruangan mana pun cukup sekali klik. Kalau kamu punya pertanyaan khusus di luar daftar ini, langsung aja lempar lewat ruang Kontak atau WhatsApp aku di +62 853-6278-4585, nanti aku langsung yang balas!',
    },
    { en: 'Topic chips give instant, exact answers; WhatsApp and email are open for custom questions.', idn: 'Tombol topik ngasih jawaban cepat & akurat; buat pertanyaan khusus langsung chat WhatsApp atau emailku aja!' },
    'meta',
    'contact',
  ),
  'meta-code': reply(
    {
      en: 'I built this entire portfolio with Next.js, React 19, TypeScript, and layered SVG + Three.js papercraft scenes. Every room has its own physical paper metaphor—an architect lamp, a cork pinboard, a steel filing cabinet with a career board, a cyanotype drafting table, a shadow-box gallery wire, 3D hardcover books, and a wooden mail tray!',
      idn: 'Seluruh portofolio ini kubangun pakai Next.js, React 19, TypeScript, dan gabungan ilustrasi SVG berlapis + Three.js bergaya papercraft. Tiap ruangan punya konsep benda fisik sendiri—mulai dari lampu arsitek meja kerja, papan gabus, lemari besi & papan karier, meja gambar blueprint, kawat galeri, buku 3D yang bisa terbuka, sampai baki surat kayu!',
    },
    { en: 'Built with Next.js, React 19, TypeScript, layered SVG papercraft, and Three.js.', idn: 'Dibangun dengan Next.js, React 19, TypeScript, SVG papercraft berlapis, dan Three.js.' },
    'meta',
    'services',
  ),
  'meta-secret': reply(
    {
      en: 'Try these four fun details while exploring:\n1. Click the lamp in ANY room to switch the whole studio between daylight and cozy night mode (watch the dust motes and fireflies!).\n2. Click the speaker on my desk for studio music and tactile paper sound effects.\n3. Poke my paper figurine on stage to see him flinch with a comic "Ouch!".\n4. Scroll to the end of Experience and click the glowing company pins on the Career Board!',
      idn: 'Cobain deh 4 hal seru ini waktu keliling halaman:\n1. Klik kepala lampu di ruangan MANA AJA buat ganti suasana siang dan lampu malam (perhatiin debu halus & kunang-kunang di sekitar cahayanya!).\n2. Klik speaker di meja kerjaku buat nyalain musik studio dan efek suara gesekan kertas.\n3. Colek karakter kertasku di panggung utama sampai muncul efek komik "Aduh!".\n4. Scroll sampai akhir bagian Pengalaman, terus klik pin perusahaan yang menyala di Papan Karier!',
    },
    { en: 'Try the room lamps, the desk speaker, poking my character on stage, and the Career Board pins!', idn: 'Cobain klik lampu di tiap ruangan, speaker meja, colek karakterku di panggung, dan pin di Papan Karier!' },
    'meta',
  ),
  'meta-lang': reply(
    {
      en: 'Yes! Whenever you toggle EN / ID in the top navigation bar, my chat bubbles and question chips switch between English and Indonesian automatically right where you left off.',
      idn: 'Bisa dong! Kapan pun kamu klik tombol EN / ID di bar navigasi atas, seluruh balon obrolan dan pilihan pertanyaanku otomatis ikut berganti bahasa tanpa mengulang obrolan dari awal.',
    },
    { en: 'Toggle EN / ID in the top bar anytime and our chat switches language on the fly.', idn: 'Klik EN / ID di navigasi atas kapan aja, obrolan kita langsung ikut ganti bahasa.' },
    'meta',
  ),
};

export const eqbotSee = (place: EqbotPlace): EqbotText => {
  return eqbotCopy.Jump[place] ?? { en: '↗ Take me to this room', idn: '↗ Ajak ke ruangan ini' };
};

export const eqbotPlaceOf = (id: string, node?: EqbotNode): EqbotPlace | undefined => {
  if (node?.go) return node.go;
  const head = id.split('-')[0];
  if (head === 'home') return 'home';
  if (head === 'about') return 'about';
  if (head === 'experience' || head === 'exp') return 'experience';
  if (head === 'services' || head === 'svc') return 'services';
  if (head === 'projects' || head === 'prj') return 'projects';
  if (head === 'certificates' || head === 'cert') return 'certificates';
  if (head === 'contact') return 'contact';
  return undefined;
};
