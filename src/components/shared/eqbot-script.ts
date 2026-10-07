export type EqbotPlace =
  | 'home'
  | 'about'
  | 'experience'
  | 'services'
  | 'certificates'
  | 'contact'
  | 'projects';

export type EqbotChoice = {
  id: string;
  en: string;
  idn: string;
  to?: string;
  place?: EqbotPlace;
  download?: boolean;
  silent?: boolean;
};

export type EqbotNode = {
  say: { en: string; idn: string };
  again?: { en: string; idn: string };
  place?: EqbotPlace;
  section?: boolean;
  answer?: boolean;
  choices: EqbotChoice[];
};

const sections: EqbotChoice[] = [
  { id: 'go-home', en: 'Home', idn: 'Beranda', to: 'home' },
  { id: 'go-about', en: 'About', idn: 'Tentang', to: 'about' },
  { id: 'go-experience', en: 'Experience', idn: 'Pengalaman', to: 'experience' },
  { id: 'go-services', en: 'Services', idn: 'Layanan', to: 'services' },
  { id: 'go-certificates', en: 'Certificates', idn: 'Sertifikat', to: 'certificates' },
  { id: 'go-contact', en: 'Contact', idn: 'Kontak', to: 'contact' },
  { id: 'go-projects', en: 'Projects', idn: 'Projek', to: 'projects' },
  { id: 'go-start', en: 'Where should I start?', idn: 'Dari mana sebaiknya?', to: 'start' },
  { id: 'go-meta', en: 'What are you?', idn: 'Kamu ini apa?', to: 'meta' },
];

function leave(parent: string): EqbotChoice[] {
  return [
    { id: `${parent}-more`, en: 'Another question here', idn: 'Pertanyaan lain di sini', to: parent, silent: true },
    { id: `${parent}-sections`, en: 'Another section', idn: 'Bagian lain', to: 'menu', silent: true },
  ];
}

const pagePlaces: EqbotPlace[] = [
  'home',
  'about',
  'experience',
  'services',
  'certificates',
  'contact',
  'projects',
];

const placeLabel: Record<EqbotPlace, { en: string; idn: string }> = {
  home: { en: 'Home', idn: 'Beranda' },
  about: { en: 'About', idn: 'Tentang' },
  experience: { en: 'Experience', idn: 'Pengalaman' },
  services: { en: 'Services', idn: 'Layanan' },
  certificates: { en: 'Certificates', idn: 'Sertifikat' },
  contact: { en: 'Contact', idn: 'Kontak' },
  projects: { en: 'Projects', idn: 'Projek' },
};

export function eqbotPlaceOf(id: string, node: EqbotNode): EqbotPlace | undefined {
  if (node.place) return node.place;
  return pagePlaces.find((place) => place === id);
}

export function eqbotSee(place: EqbotPlace): { en: string; idn: string } {
  const label = placeLabel[place];
  return {
    en: `See the ${label.en} section.`,
    idn: `Lihat bagian ${label.idn}.`,
  };
}

function reply(
  say: EqbotNode['say'],
  again: EqbotNode['say'],
  parent: string,
  place?: EqbotPlace,
): EqbotNode {
  return { say, again, place, answer: true, choices: leave(parent) };
}

export const eqbotCopy = {
  first: {
    en: 'Rifqi Haikal Chairiansyah is a software engineer in Jakarta and is available for work. His core is C#, ASP.NET MVC, .NET Core, and SQL Server.',
    idn: 'Rifqi Haikal Chairiansyah adalah software engineer di Jakarta dan sedang bisa diajak bekerja. Intinya C#, ASP.NET MVC, .NET Core, dan SQL Server.',
  },
  night: {
    en: 'It is late, and Rifqi Haikal Chairiansyah is still available. He works from Jakarta, and his core is C#, ASP.NET MVC, .NET Core, and SQL Server.',
    idn: 'Masih larut, dan Rifqi Haikal Chairiansyah masih bisa diajak bekerja. Dia bekerja dari Jakarta, dan intinya C#, ASP.NET MVC, .NET Core, dan SQL Server.',
  },
  morning: {
    en: 'Good morning. Rifqi Haikal Chairiansyah is a software engineer in Jakarta, available for work, with a core of C#, ASP.NET MVC, .NET Core, and SQL Server.',
    idn: 'Selamat pagi. Rifqi Haikal Chairiansyah adalah software engineer di Jakarta, sedang bisa diajak bekerja, dengan inti C#, ASP.NET MVC, .NET Core, dan SQL Server.',
  },
  return: {
    en: 'Welcome back. Rifqi Haikal Chairiansyah is in Jakarta and available for work. His core is still C#, ASP.NET, .NET Core, and SQL Server.',
    idn: 'Selamat datang kembali. Rifqi Haikal Chairiansyah ada di Jakarta dan sedang bisa diajak bekerja. Intinya tetap C#, ASP.NET, .NET Core, dan SQL Server.',
  },
  left: {
    en: 'The chat closed early. Rifqi Haikal Chairiansyah is in Jakarta, available for work, and his core is C#, ASP.NET, .NET Core, and SQL Server.',
    idn: 'Obrolan tadi tertutup lebih dulu. Rifqi Haikal Chairiansyah ada di Jakarta, sedang bisa diajak bekerja, dan intinya C#, ASP.NET, .NET Core, dan SQL Server.',
  },
  here: {
    en: 'Ask about the part on screen',
    idn: 'Tanya bagian yang sedang di layar',
  },
  thorough: {
    en: 'Four summaries so far. The facts stay the same.',
    idn: 'Empat rangkuman sejauh ini. Faktanya tetap sama.',
  },
  restless: {
    en: 'Three parts visited. Each one has a short summary one step in.',
    idn: 'Tiga bagian sudah dibuka. Masing-masing punya rangkuman pendek satu langkah di dalam.',
  },
  hint: {
    en: 'Each choice below is a short summary.',
    idn: 'Setiap pilihan di bawah adalah rangkuman pendek.',
  },
  close: { en: 'Close', idn: 'Tutup' },
  openLabel: { en: 'Open EQbot', idn: 'Buka EQbot' },
  online: { en: 'Online', idn: 'Online' },
  ongoing: { en: 'Chat in progress', idn: 'Chat sedang berlangsung' },
  notice: {
    en: 'Rifqi Haikal builds enterprise web systems in C# and .NET. I can summarize any part.',
    idn: 'Rifqi Haikal membangun sistem web enterprise dengan C# dan .NET. Saya bisa merangkum bagian mana pun.',
  },
};

export const eqbotSectionNode: Record<string, string> = {
  home: 'home',
  about: 'about',
  experience: 'experience',
  services: 'services',
  certificates: 'certificates',
  contact: 'contact',
  projects: 'projects',
};

export const eqbotNodes: Record<string, EqbotNode> = {
  menu: {
    say: {
      en: 'Rifqi Haikal Chairiansyah works from Jakarta and is available for work. The core of that work is C#, ASP.NET, .NET Core, and SQL Server.',
      idn: 'Rifqi Haikal Chairiansyah bekerja dari Jakarta dan sedang bisa diajak bekerja. Inti kerjanya C#, ASP.NET, .NET Core, dan SQL Server.',
    },
    choices: sections,
  },
  home: {
    section: true,
    say: {
      en: 'The first screen introduces Rifqi Haikal. The line under his name moves through the roles he actually works in: software, fullstack, frontend, and .NET with C#. He is available for work in Jakarta, and he can be reached by email, LinkedIn, GitHub, or WhatsApp.',
      idn: 'Layar pertama memperkenalkan Rifqi Haikal. Kalimat di bawah namanya berganti di antara peran yang memang dia kerjakan: perangkat lunak, fullstack, frontend, dan .NET dengan C#. Dia sedang bisa diajak bekerja di Jakarta, dan bisa dihubungi lewat email, LinkedIn, GitHub, atau WhatsApp.',
    },
    again: {
      en: 'Rifqi Haikal is in Jakarta and available for work. The roles on that line are software, fullstack, frontend, and .NET with C#.',
      idn: 'Rifqi Haikal ada di Jakarta dan sedang bisa diajak bekerja. Peran pada kalimat itu adalah perangkat lunak, fullstack, frontend, dan .NET dengan C#.',
    },
    choices: [
      { id: 'home-who', en: 'Who is this?', idn: 'Ini siapa?', to: 'home-who' },
      { id: 'home-roles', en: 'Why does the line change?', idn: 'Kenapa kalimatnya berganti?', to: 'home-roles' },
      { id: 'home-available', en: 'Is he available?', idn: 'Dia sedang bisa diajak kerja?', to: 'home-available' },
      { id: 'home-city', en: 'Where is he?', idn: 'Dia di mana?', to: 'home-city' },
      { id: 'home-links', en: 'What are the links?', idn: 'Tautan itu apa?', to: 'home-links' },
      { id: 'home-mark', en: 'What is the small label?', idn: 'Label kecil itu apa?', to: 'home-mark' },
      { id: 'home-counts', en: 'What are the four numbers?', idn: 'Empat angka itu apa?', to: 'home-counts' },
      { id: 'home-buttons', en: 'What do the two buttons do?', idn: 'Dua tombol itu untuk apa?', to: 'home-buttons' },
      { id: 'home-cv', en: 'Can I take the CV?', idn: 'Boleh ambil CV-nya?', to: 'home-cv' },
    ],
  },
  'home-who': reply(
    {
      en: 'This is Rifqi Haikal Chairiansyah’s own portfolio. The work it presents is enterprise web systems, the data behind them, and the interface around them.',
      idn: 'Ini portofolio pribadi Rifqi Haikal Chairiansyah. Kerja yang disajikannya adalah sistem web enterprise, data di belakangnya, dan antarmuka di sekelilingnya.',
    },
    {
      en: 'Same name. Rifqi Haikal Chairiansyah.',
      idn: 'Nama yang sama. Rifqi Haikal Chairiansyah.',
    },
    'home',
    'home',
  ),
  'home-roles': reply(
    {
      en: 'The line changes because it is naming the roles he actually works in: software developer, fullstack developer, frontend developer, and .NET developer in C#.',
      idn: 'Kalimat itu berganti karena ia menyebut peran yang memang dia kerjakan: pengembang perangkat lunak, pengembang fullstack, pengembang frontend, dan pengembang .NET dengan C#.',
    },
    {
      en: 'Software, fullstack, frontend, and .NET with C#. That is the whole cycle.',
      idn: 'Perangkat lunak, fullstack, frontend, dan .NET dengan C#. Itu seluruh putarannya.',
    },
    'home',
    'home',
  ),
  'home-available': reply(
    {
      en: 'Yes. He is available for work, based in Jakarta, Indonesia. His email is r.haikal1610@gmail.com.',
      idn: 'Ya. Dia sedang bisa diajak bekerja, berbasis di Jakarta, Indonesia. Emailnya r.haikal1610@gmail.com.',
    },
    {
      en: 'Yes. Available for work, in Jakarta.',
      idn: 'Ya. Sedang bisa diajak bekerja, di Jakarta.',
    },
    'home',
    'home',
  ),
  'home-city': reply(
    {
      en: 'He works from Jakarta, Indonesia, and the same city is written with his contact details.',
      idn: 'Dia bekerja dari Jakarta, Indonesia, dan kota yang sama tertulis bersama detail kontaknya.',
    },
    {
      en: 'Jakarta. It does not change further down the page.',
      idn: 'Jakarta. Tidak berubah di bagian bawah halaman.',
    },
    'home',
    'home',
  ),
  'home-links': reply(
    {
      en: 'He can be reached by email at r.haikal1610@gmail.com, and by LinkedIn, GitHub, or WhatsApp. The phone number behind WhatsApp is +62 853-6278-4585.',
      idn: 'Dia bisa dihubungi lewat email di r.haikal1610@gmail.com, serta LinkedIn, GitHub, atau WhatsApp. Nomor di balik WhatsApp adalah +62 853-6278-4585.',
    },
    {
      en: 'He can be reached through email, LinkedIn, GitHub, and WhatsApp.',
      idn: 'Dia bisa dihubungi lewat email, LinkedIn, GitHub, dan WhatsApp.',
    },
    'home',
    'home',
  ),
  'home-cv': {
    say: {
      en: 'The CV is a PDF already on this site, named CV Rifqi Haikal Chairiansyah, and it can be downloaded from here.',
      idn: 'CV-nya berkas PDF yang sudah ada di situs ini, bernama CV Rifqi Haikal Chairiansyah, dan bisa diunduh dari sini.',
    },
    again: {
      en: 'The same PDF. I can hand it over again.',
      idn: 'PDF yang sama. Aku bisa berikan lagi.',
    },
    place: 'home',
    answer: true,
    choices: [
      { id: 'cv-get', en: 'Download the CV', idn: 'Unduh CV-nya', to: 'cv-done', download: true },
      ...leave('home'),
    ],
  },
  'cv-done': reply(
    {
      en: 'The CV download has started. The file is CV Rifqi Haikal Chairiansyah.pdf.',
      idn: 'Pengunduhan CV sudah dimulai. Berkasnya CV Rifqi Haikal Chairiansyah.pdf.',
    },
    {
      en: 'Started again. About still has the same button.',
      idn: 'Dimulai lagi. Bagian Tentang masih punya tombol yang sama.',
    },
    'home',
    'about',
  ),
  about: {
    section: true,
    say: {
      en: 'Rifqi Haikal studied Informatics at Institut Teknologi Del and finished with a GPA of 3.39 out of 4.00. Since then he has worked in telecommunications, oil and gas, research, IT consulting, and multifinance, with more than three years of web work for organizations and MSMEs. What he builds is C#, ASP.NET MVC, .NET Core, and SQL Server, with React, Angular, and Spring Boot alongside.',
      idn: 'Rifqi Haikal menempuh Informatika di Institut Teknologi Del dan lulus dengan IPK 3,39 dari 4,00. Sejak itu dia bekerja di telekomunikasi, minyak dan gas, riset, konsultan TI, dan multifinance, dengan lebih dari tiga tahun kerja web untuk organisasi dan UMKM. Yang dia bangun adalah C#, ASP.NET MVC, .NET Core, dan SQL Server, dengan React, Angular, dan Spring Boot di sampingnya.',
    },
    again: {
      en: 'He studied Informatics at IT Del with a GPA of 3.39, then worked across five industries. The stack he is known for starts with C#, ASP.NET, and SQL Server.',
      idn: 'Dia menempuh Informatika di IT Del dengan IPK 3,39, lalu bekerja di lima industri. Tumpukan yang paling dikenalnya dimulai dari C#, ASP.NET, dan SQL Server.',
    },
    choices: [
      { id: 'about-photo', en: 'Is that his photograph?', idn: 'Itu fotonya?', to: 'about-photo' },
      { id: 'about-school', en: 'Where did he study?', idn: 'Dia kuliah di mana?', to: 'about-school' },
      { id: 'about-industries', en: 'Which industries?', idn: 'Industri yang mana?', to: 'about-industries' },
      { id: 'about-msib', en: 'What is MSIB?', idn: 'MSIB itu apa?', to: 'about-msib' },
      { id: 'about-freelance', en: 'Does he freelance?', idn: 'Dia menerima kerja lepas?', to: 'about-freelance' },
      { id: 'about-years', en: 'How many years does the text claim?', idn: 'Teksnya menyebut berapa tahun?', to: 'about-years' },
      { id: 'about-stack', en: 'What does he actually build?', idn: 'Dia sebenarnya membangun apa?', to: 'about-stack' },
    ],
  },
  'about-photo': reply(
    {
      en: 'Yes. The photograph is Rifqi Haikal, and the line under it calls him an ASP.NET software engineer.',
      idn: 'Ya. Foto itu Rifqi Haikal, dan baris di bawahnya menyebutnya software engineer ASP.NET.',
    },
    {
      en: 'The photograph is his. I am not in it.',
      idn: 'Fotonya dia. Aku tidak ada di dalamnya.',
    },
    'about',
    'about',
  ),
  'about-school': reply(
    {
      en: 'He earned a Bachelor of Informatics at Institut Teknologi Del, with a GPA of 3.39 out of 4.00.',
      idn: 'Dia meraih Sarjana Informatika di Institut Teknologi Del, dengan IPK 3,39 dari 4,00.',
    },
    {
      en: 'He studied Informatics at Institut Teknologi Del and finished with a GPA of 3.39.',
      idn: 'Dia menempuh Informatika di Institut Teknologi Del dan lulus dengan IPK 3,39.',
    },
    'about',
    'about',
  ),
  'about-industries': reply(
    {
      en: 'The industries follow the companies. Telecommunications is Tower Bersama, oil and gas is Pertamina Hulu Rokan, and research is BRIN. IT consulting covers Javan and the freelance work, and multifinance is FIF.',
      idn: 'Industrinya mengikuti perusahaannya. Telekomunikasi adalah Tower Bersama, minyak dan gas adalah Pertamina Hulu Rokan, dan riset adalah BRIN. Konsultan TI mencakup Javan dan kerja lepas, sedangkan multifinance adalah FIF.',
    },
    {
      en: 'Those five fields. The experience section names the companies.',
      idn: 'Lima bidang itu. Bagian pengalaman menyebut perusahaannya.',
    },
    'about',
    'experience',
  ),
  'about-msib': reply(
    {
      en: 'MSIB 2024 is his Certified Industry Ready Talent mark. The papers that go with it are MSIB batch 7, an internship completion letter, and the Javan Angular certificate.',
      idn: 'MSIB 2024 adalah tanda Talenta yang Siap Bekerja di Industri. Berkas yang menyertainya adalah MSIB angkatan 7, surat keterangan magang, dan sertifikat Angular di Javan.',
    },
    {
      en: 'MSIB 2024. The certificate is in the internship folder.',
      idn: 'MSIB 2024. Sertifikatnya di map magang.',
    },
    'about',
    'certificates',
  ),
  'about-freelance': reply(
    {
      en: 'Yes. Freelance has been open since August 2023, with 20 or more web projects for academic organizations and MSMEs, taken from the brief through handover.',
      idn: 'Ya. Kerja lepas masih terbuka sejak Agustus 2023, dengan 20 proyek web atau lebih untuk organisasi akademik dan UMKM, dari kebutuhan sampai serah terima.',
    },
    {
      en: 'Freelance is still listed, from August 2023.',
      idn: 'Kerja lepas masih tercatat, dari Agustus 2023.',
    },
    'about',
    'experience',
  ),
  'about-stack': reply(
    {
      en: 'The core he builds with is C#, ASP.NET MVC, and .NET Core, together with SQL Server, Entity Framework, and Telerik. On shipped work he has also used React, Angular, Next.js, and Spring Boot.',
      idn: 'Inti yang dia pakai untuk membangun adalah C#, ASP.NET MVC, dan .NET Core, bersama SQL Server, Entity Framework, dan Telerik. Pada kerja yang sudah terkirim dia juga memakai React, Angular, Next.js, dan Spring Boot.',
    },
    {
      en: 'He starts from C# and .NET, and he has also shipped work in React, Angular, and Spring Boot.',
      idn: 'Dia mulai dari C# dan .NET, dan dia juga sudah mengirim kerja dengan React, Angular, dan Spring Boot.',
    },
    'about',
    'services',
  ),
  experience: {
    section: true,
    say: {
      en: 'His work reads most clearly from the newest role backward. Since July 2026 he has been an IT software developer at PT Tower Bersama Infrastructure, where he split one enterprise monolith into 8 applications and delivered 3 dashboards. Before that, from December 2025 to June 2026, he interned at Pertamina Hulu Rokan and built ISEA, with Keycloak SSO and MFA. In October to December 2025 he spent a month at BRIN finishing a research-funding monitor. From January to June 2025, during MSIB at Javan, he delivered 6 enterprise applications for 5 clients. From June 2024 to January 2025 he interned at FIF on an HRIS and on API Central. Freelance web work has run beside all of that since August 2023, with 20 or more projects. At IT Del he was also public relations for GDSC and head of the social division in the student executive board.',
      idn: 'Kerjanya paling jelas dibaca dari peran terbaru ke belakang. Sejak Juli 2026 dia menjadi pengembang perangkat lunak TI di PT Tower Bersama Infrastructure, tempat dia memecah satu monolit enterprise menjadi 8 aplikasi dan menyelesaikan 3 dashboard. Sebelumnya, dari Desember 2025 sampai Juni 2026, dia magang di Pertamina Hulu Rokan dan membangun ISEA, dengan SSO Keycloak dan MFA. Pada Oktober sampai Desember 2025 dia menghabiskan satu bulan di BRIN menyelesaikan pemantau pendanaan riset. Dari Januari sampai Juni 2025, selama MSIB di Javan, dia menyelesaikan 6 aplikasi enterprise untuk 5 klien. Dari Juni 2024 sampai Januari 2025 dia magang di FIF untuk HRIS dan API Central. Kerja web lepas berjalan di samping semuanya sejak Agustus 2023, dengan 20 proyek atau lebih. Di IT Del dia juga mengurus hubungan masyarakat GDSC dan menjadi kepala divisi sosial badan eksekutif mahasiswa.',
    },
    again: {
      en: 'There are six work entries, plus GDSC and BEM at IT Del. The current contract is Tower Bersama, from July 2026.',
      idn: 'Ada enam catatan kerja, plus GDSC dan BEM di IT Del. Kontrak yang sedang berjalan adalah Tower Bersama, dari Juli 2026.',
    },
    choices: [
      { id: 'exp-total', en: 'How long is the total?', idn: 'Berapa lama totalnya?', to: 'exp-total' },
      { id: 'exp-now', en: 'Which job is current?', idn: 'Pekerjaan mana yang sedang berjalan?', to: 'exp-now' },
      { id: 'exp-places', en: 'Which cities?', idn: 'Kota yang mana?', to: 'exp-places' },
      { id: 'exp-work', en: 'Work', idn: 'Kerja', to: 'exp-work' },
      { id: 'exp-org', en: 'Organization', idn: 'Organisasi', to: 'exp-org' },
    ],
  },
  'exp-total': reply(
    {
      en: 'The total at the top counts paid and internship work only. Organization years stay separate, so they are not added in. His own paragraph also says three years of hands-on development.',
      idn: 'Angka di atas hanya menghitung kerja berbayar dan magang. Tahun organisasi tetap terpisah, jadi tidak dijumlahkan. Paragrafnya sendiri juga menyebut tiga tahun pengembangan langsung.',
    },
    {
      en: 'The total counts paid and internship work only, and organization years stay separate.',
      idn: 'Angka total hanya menghitung kerja berbayar dan magang, dan tahun organisasi tetap terpisah.',
    },
    'experience',
    'experience',
  ),
  'exp-work': {
    say: {
      en: 'Each software job left a finished system, and the clearest way to read them is from the newest backward. Since July 2026 at Tower Bersama he has split one monolith into 8 applications and delivered 3 dashboards. From December 2025 to June 2026 at Pertamina Hulu Rokan he built ISEA and put SSO and MFA on it. October to December 2025 at BRIN was one month spent finishing a research-funding monitor. From January to June 2025 at Javan, through MSIB, he delivered 6 applications for 5 clients. From June 2024 to January 2025 at FIF he built an HRIS for 100 or more employee profiles and API Central for 100 or more APIs. Freelance web work has run beside those contracts since August 2023, and it has passed 20 projects.',
      idn: 'Setiap pekerjaan perangkat lunak meninggalkan sistem yang selesai, dan cara paling jelas membacanya adalah dari yang terbaru ke belakang. Sejak Juli 2026 di Tower Bersama dia memecah satu monolit menjadi 8 aplikasi dan menyelesaikan 3 dashboard. Dari Desember 2025 sampai Juni 2026 di Pertamina Hulu Rokan dia membangun ISEA dan memasang SSO serta MFA. Oktober sampai Desember 2025 di BRIN adalah satu bulan yang dipakai menyelesaikan pemantau pendanaan riset. Dari Januari sampai Juni 2025 di Javan, lewat MSIB, dia menyelesaikan 6 aplikasi untuk 5 klien. Dari Juni 2024 sampai Januari 2025 di FIF dia membangun HRIS untuk 100 profil karyawan atau lebih dan API Central untuk 100 API atau lebih. Kerja web lepas berjalan di samping kontrak-kontrak itu sejak Agustus 2023, dan sudah melewati 20 proyek.',
    },
    again: {
      en: 'Six companies have hired him, and the current contract is Tower Bersama.',
      idn: 'Enam perusahaan sudah mempekerjakannya, dan kontrak yang berjalan adalah Tower Bersama.',
    },
    place: 'experience',
    choices: [
      { id: 'exp-tbg', en: 'Tower Bersama', idn: 'Tower Bersama', to: 'exp-tbg' },
      { id: 'exp-phr', en: 'Pertamina Hulu Rokan', idn: 'Pertamina Hulu Rokan', to: 'exp-phr' },
      { id: 'exp-brin', en: 'BRIN', idn: 'BRIN', to: 'exp-brin' },
      { id: 'exp-javan', en: 'Javan', idn: 'Javan', to: 'exp-javan' },
      { id: 'exp-fif', en: 'FIF', idn: 'FIF', to: 'exp-fif' },
      { id: 'exp-freelance', en: 'Freelance', idn: 'Lepas', to: 'exp-freelance' },
      ...leave('experience'),
    ],
  },
  'exp-tbg': reply(
    {
      en: 'Since July 2026 he has been an IT software developer on contract at PT Tower Bersama Infrastructure, in South Jakarta, in telecommunications. He took one enterprise monolith and split it into 8 applications, then delivered three dashboards that operations uses: Payout, Business Projects, and HSE.',
      idn: 'Sejak Juli 2026 dia menjadi pengembang perangkat lunak TI secara kontrak di PT Tower Bersama Infrastructure, di Jakarta Selatan, pada telekomunikasi. Dia mengambil satu monolit enterprise dan memecahnya menjadi 8 aplikasi, lalu menyelesaikan tiga dashboard yang dipakai operasi: Payout, Business Projects, dan HSE.',
    },
    {
      en: 'At Tower Bersama, since July 2026, he split a monolith into 8 applications and delivered 3 dashboards.',
      idn: 'Di Tower Bersama, sejak Juli 2026, dia memecah monolit menjadi 8 aplikasi dan menyelesaikan 3 dashboard.',
    },
    'exp-work',
    'experience',
  ),
  'exp-phr': reply(
    {
      en: 'From December 2025 to June 2026 he interned as an IT business solution developer at PT Pertamina Hulu Rokan, in South Jakarta, in oil and gas. He built ISEA, an N-tier application that gathers seismic, drilling, and exploration work, and he put Keycloak SSO and MFA on it.',
      idn: 'Dari Desember 2025 sampai Juni 2026 dia magang sebagai pengembang solusi bisnis TI di PT Pertamina Hulu Rokan, di Jakarta Selatan, pada minyak dan gas. Dia membangun ISEA, aplikasi N-tier yang mengumpulkan kerja seismik, pengeboran, dan eksplorasi, lalu memasang SSO Keycloak dan MFA.',
    },
    {
      en: 'At Pertamina Hulu Rokan he built ISEA, then added SSO and MFA.',
      idn: 'Di Pertamina Hulu Rokan dia membangun ISEA, lalu menambahkan SSO dan MFA.',
    },
    'exp-work',
    'experience',
  ),
  'exp-brin': reply(
    {
      en: 'From October to December 2025 he joined BRIN, Badan Riset dan Inovasi Nasional, as a project-based software engineer in Central Jakarta. In that month he finished a research-funding monitor and tightened the finance modules.',
      idn: 'Dari Oktober sampai Desember 2025 dia bergabung dengan BRIN, Badan Riset dan Inovasi Nasional, sebagai software engineer berbasis proyek di Jakarta Pusat. Dalam bulan itu dia menyelesaikan pemantau pendanaan riset dan merapikan modul keuangan.',
    },
    {
      en: 'The month at BRIN went into finishing a research-funding monitor.',
      idn: 'Sebulan di BRIN dipakai untuk menyelesaikan pemantau pendanaan riset.',
    },
    'exp-work',
    'experience',
  ),
  'exp-javan': reply(
    {
      en: 'From January to June 2025 he interned as an Angular developer at PT Javan Cipta Solusi in Yogyakarta, through MSIB. In that half year he delivered 6 enterprise applications for 5 clients, BRI, KPK, Kemenkeu, Kominfo, and UII. The interfaces came from Figma, and Spring Boot sat behind two of the applications.',
      idn: 'Dari Januari sampai Juni 2025 dia magang sebagai pengembang Angular di PT Javan Cipta Solusi di Yogyakarta, lewat MSIB. Dalam setengah tahun itu dia menyelesaikan 6 aplikasi enterprise untuk 5 klien, yaitu BRI, KPK, Kemenkeu, Kominfo, dan UII. Antarmukanya datang dari Figma, dan Spring Boot ada di belakang dua aplikasinya.',
    },
    {
      en: 'At Javan, through MSIB, he delivered six applications for five clients.',
      idn: 'Di Javan, lewat MSIB, dia menyelesaikan enam aplikasi untuk lima klien.',
    },
    'exp-work',
    'experience',
  ),
  'exp-fif': reply(
    {
      en: 'From June 2024 to January 2025 he interned as a fullstack developer at PT Federal International Finance, in South Jakarta, in multifinance. He built an HRIS proof of concept for 100 or more employee profiles, and API Central for 100 or more APIs.',
      idn: 'Dari Juni 2024 sampai Januari 2025 dia magang sebagai pengembang fullstack di PT Federal International Finance, di Jakarta Selatan, pada multifinance. Dia membangun bukti konsep HRIS untuk 100 profil karyawan atau lebih, dan API Central untuk 100 API atau lebih.',
    },
    {
      en: 'At FIF he built an HRIS and API Central.',
      idn: 'Di FIF dia membangun HRIS dan API Central.',
    },
    'exp-work',
    'experience',
  ),
  'exp-freelance': reply(
    {
      en: 'Freelance has been open since August 2023 and is still remote. Across that time he has delivered 20 or more web projects for academic organizations and MSMEs, from the first requirements through handover.',
      idn: 'Kerja lepas terbuka sejak Agustus 2023 dan masih dilakukan jarak jauh. Sepanjang waktu itu dia menyelesaikan 20 proyek web atau lebih untuk organisasi akademik dan UMKM, dari kebutuhan pertama sampai serah terima.',
    },
    {
      en: 'Freelance has been open since August 2023, with twenty or more web projects.',
      idn: 'Kerja lepas terbuka sejak Agustus 2023, dengan dua puluh proyek web atau lebih.',
    },
    'exp-work',
    'experience',
  ),
  'exp-org': {
    say: {
      en: 'Both organization roles were at IT Del. From October 2023 to December 2024 he was public relations on the core team of Google Developer Student Club and also hosted events. From August 2023 to September 2024 he led the social division of the student executive board, covering off-campus work and the division’s social channels.',
      idn: 'Kedua peran organisasi ada di IT Del. Dari Oktober 2023 sampai Desember 2024 dia mengurus hubungan masyarakat di tim inti Google Developer Student Club dan juga memandu acara. Dari Agustus 2023 sampai September 2024 dia memimpin divisi sosial badan eksekutif mahasiswa, mencakup kegiatan luar kampus dan kanal sosial divisinya.',
    },
    place: 'experience',
    choices: [
      { id: 'exp-gdsc', en: 'Google Developer Student Club', idn: 'Google Developer Student Club', to: 'exp-gdsc' },
      { id: 'exp-bem', en: 'Student executive board', idn: 'Badan eksekutif mahasiswa', to: 'exp-bem' },
      ...leave('experience'),
    ],
  },
  'exp-gdsc': reply(
    {
      en: 'At Google Developer Student Club IT Del he was public relations on the core team from October 2023 to December 2024, and he also hosted events.',
      idn: 'Di Google Developer Student Club IT Del dia mengurus hubungan masyarakat pada tim inti dari Oktober 2023 sampai Desember 2024, dan dia juga memandu acara.',
    },
    {
      en: 'At GDSC IT Del he handled public relations through December 2024.',
      idn: 'Di GDSC IT Del dia mengurus hubungan masyarakat sampai Desember 2024.',
    },
    'exp-org',
    'experience',
  ),
  'exp-bem': reply(
    {
      en: 'At the student executive board of IT Del he led the social division from August 2023 to September 2024. The work was off-campus activity and the division’s social channels.',
      idn: 'Di badan eksekutif mahasiswa IT Del dia memimpin divisi sosial dari Agustus 2023 sampai September 2024. Kerjanya kegiatan luar kampus dan kanal sosial divisinya.',
    },
    {
      en: 'At BEM IT Del he led the social division through September 2024.',
      idn: 'Di BEM IT Del dia memimpin divisi sosial sampai September 2024.',
    },
    'exp-org',
    'experience',
  ),
  services: {
    section: true,
    say: {
      en: 'The offer has two sides. Development is enterprise web applications in C#, ASP.NET MVC, and .NET Core, with SQL Server, Entity Framework, and dashboards deployed on IIS. Design is the face of those products: full app and website design, clickable prototypes, and identity, mostly in Figma. The tools marked as core are C#, ASP.NET MVC, .NET Core, Entity Framework, SQL Server, and Telerik.',
      idn: 'Tawarannya punya dua sisi. Development adalah aplikasi web enterprise dengan C#, ASP.NET MVC, dan .NET Core, bersama SQL Server, Entity Framework, dan dashboard yang di-deploy di IIS. Desain adalah wajah produk itu: desain aplikasi dan situs yang utuh, prototipe yang bisa diklik, dan identitas, sebagian besar di Figma. Alat yang ditandai sebagai inti adalah C#, ASP.NET MVC, .NET Core, Entity Framework, SQL Server, dan Telerik.',
    },
    again: {
      en: 'Development is the core. Design covers Figma prototypes and identity.',
      idn: 'Development adalah intinya. Desain mencakup prototipe Figma dan identitas.',
    },
    choices: [
      { id: 'svc-dot', en: 'What is the .NET work?', idn: 'Kerja .NET-nya apa?', to: 'svc-dot' },
      { id: 'svc-data', en: 'What about the data?', idn: 'Bagaimana datanya?', to: 'svc-data' },
      { id: 'svc-dash', en: 'And the dashboards?', idn: 'Lalu dashboardnya?', to: 'svc-dash' },
      { id: 'svc-design', en: 'Design', idn: 'Desain', to: 'svc-design' },
      { id: 'svc-tools', en: 'Which development tools?', idn: 'Alat pengembangan yang mana?', to: 'svc-tools' },
      { id: 'svc-apps', en: 'Which applications does he use?', idn: 'Aplikasi apa yang dia pakai?', to: 'svc-apps' },
      { id: 'svc-core', en: 'Which tools are the core?', idn: 'Alat mana yang inti?', to: 'svc-core' },
    ],
  },
  'svc-dot': reply(
    {
      en: 'The .NET work is enterprise web applications in C#, ASP.NET MVC, and .NET Core, with Telerik on the interface.',
      idn: 'Kerja .NET-nya adalah aplikasi web enterprise dengan C#, ASP.NET MVC, dan .NET Core, dengan Telerik di antarmukanya.',
    },
    {
      en: 'The .NET work is C#, ASP.NET MVC, .NET Core, and Telerik.',
      idn: 'Kerja .NET-nya adalah C#, ASP.NET MVC, .NET Core, dan Telerik.',
    },
    'services',
    'services',
  ),
  'svc-data': reply(
    {
      en: 'The data side is SQL Server, with stored procedures and indexing, Entity Framework, and transactional processing.',
      idn: 'Sisi datanya adalah SQL Server, dengan stored procedure dan indexing, Entity Framework, dan pemrosesan transaksional.',
    },
    {
      en: 'The data work stays on SQL Server and Entity Framework.',
      idn: 'Kerja datanya tetap di SQL Server dan Entity Framework.',
    },
    'services',
    'services',
  ),
  'svc-dash': reply(
    {
      en: 'He also builds internal monitoring dashboards and modular applications, deployed on IIS. At Tower Bersama the named ones are Payout, Business Projects, and HSE.',
      idn: 'Dia juga membangun dashboard pemantauan internal dan aplikasi modular, yang di-deploy di IIS. Di Tower Bersama yang disebut namanya adalah Payout, Business Projects, dan HSE.',
    },
    {
      en: 'He builds dashboards and modular apps, then deploys them on IIS.',
      idn: 'Dia membangun dashboard dan aplikasi modular, lalu men-deploy-nya di IIS.',
    },
    'services',
    'experience',
  ),
  'svc-design': reply(
    {
      en: 'Beside the engineering, he designs full applications and websites, clickable prototypes, and identity, mostly in Figma. The examples are Sportainment, a beauty shop, a campus portal, and Del-Pick.',
      idn: 'Di samping tekniknya, dia merancang aplikasi dan situs yang utuh, prototipe yang bisa diklik, dan identitas, sebagian besar di Figma. Contohnya Sportainment, toko kecantikan, portal kampus, dan Del-Pick.',
    },
    {
      en: 'The design work is prototypes and identity, mostly drawn in Figma.',
      idn: 'Kerja desainnya prototipe dan identitas, sebagian besar digambar di Figma.',
    },
    'services',
    'services',
  ),
  'svc-core': reply(
    {
      en: 'The tools marked as core are C#, ASP.NET MVC, .NET Core, Entity Framework, SQL Server, and Telerik. React, Angular, Next.js, and Spring Boot are additional, and he has already used them on shipped work.',
      idn: 'Alat yang ditandai sebagai inti adalah C#, ASP.NET MVC, .NET Core, Entity Framework, SQL Server, dan Telerik. React, Angular, Next.js, dan Spring Boot adalah tambahan, dan dia sudah memakainya pada kerja yang terkirim.',
    },
    {
      en: 'Six tools are marked as the core, and the rest are additional.',
      idn: 'Enam alat ditandai sebagai inti, dan sisanya tambahan.',
    },
    'services',
    'services',
  ),
  projects: {
    section: true,
    say: {
      en: 'The projects are work he has already shipped, in three kinds. On the web, Shipment tracks transport, a hiring platform posts jobs and takes applications, an influencer marketplace connects brands and influencers, employee management keeps staff records, and API Central turns API notes into shared documentation. In Figma he designed Sportainment for finding and booking a sport, a beauty shop for skincare, a campus portal for how a student finds information, and Del-Pick as a delivery app across 20 or more screens. With a team he also built Del-Pick, SEMAT DEL, FRK & FED, a dental diagnosis system, a DES encryption exercise, and the Clicknik hospital database. The same set can be narrowed by web, design, or a tool such as Vue, Next.js, or Figma.',
      idn: 'Proyeknya adalah kerja yang sudah dia kirim, dalam tiga jenis. Di web, Shipment melacak transportasi, platform rekrutmen memasang lowongan dan menerima lamaran, marketplace influencer menghubungkan brand dan influencer, manajemen karyawan menyimpan data staf, dan API Central mengubah catatan API menjadi dokumentasi bersama. Di Figma dia merancang Sportainment untuk mencari dan memesan olahraga, toko kecantikan untuk perawatan kulit, portal kampus untuk cara mahasiswa menemukan informasi, dan Del-Pick sebagai aplikasi pengiriman dengan 20 layar atau lebih. Bersama tim dia juga membangun Del-Pick, SEMAT DEL, FRK & FED, sistem diagnosa gigi, latihan enkripsi DES, dan basis data rumah sakit Clicknik. Rangkaian yang sama bisa disempitkan lewat web, desain, atau alat seperti Vue, Next.js, atau Figma.',
    },
    again: {
      en: 'The projects cover web, design, and group work, and they can be filtered by kind or by tool.',
      idn: 'Proyeknya mencakup kerja web, desain, dan kelompok, dan bisa disaring menurut jenis atau alat.',
    },
    choices: [
      { id: 'prj-how', en: 'How do I look through them?', idn: 'Bagaimana cara melihatnya?', to: 'prj-how' },
      { id: 'prj-web', en: 'Show a web project', idn: 'Tunjukkan proyek web', to: 'prj-web' },
      { id: 'prj-design', en: 'Show a design project', idn: 'Tunjukkan proyek desain', to: 'prj-design' },
      { id: 'prj-group', en: 'Is there group work?', idn: 'Ada kerja kelompok?', to: 'prj-group' },
    ],
  },
  'prj-how': reply(
    {
      en: 'The project list sits with Services and can be narrowed by web, design, or a tool name. Cards already name Vue, Next.js, Figma, Angular, Spring Boot, and Supabase.',
      idn: 'Daftar proyek ada bersama Layanan dan bisa disempitkan lewat web, desain, atau nama alat. Kartunya sudah menyebut Vue, Next.js, Figma, Angular, Spring Boot, dan Supabase.',
    },
    {
      en: 'The list sits with Services, and it can be filtered or searched by tool.',
      idn: 'Daftarnya ada bersama Layanan, dan bisa disaring atau dicari menurut alat.',
    },
    'projects',
    'services',
  ),
  'prj-web': {
    say: {
      en: 'The web projects are products a visitor can open, not sketches. Shipment tracks transport in Vue 3, TypeScript, and Pinia, with a simulated API in Mirage.js and a live demo. The hiring platform lets an administrator post jobs and a candidate apply, on Next.js and Supabase with role-based access. The influencer marketplace connects brands and influencers on Next.js 14 and Supabase, and it also has a live demo. Employee management keeps staff records as a CRUD app with roles, built in Angular, Spring Boot, JWT, and MySQL. API Central then standardizes the documentation around APIs, turning Postman collections toward Swagger with Angular and Spring Boot.',
      idn: 'Proyek webnya adalah produk yang bisa dibuka pengunjung, bukan sketsa. Shipment melacak transportasi dengan Vue 3, TypeScript, dan Pinia, plus API simulasi di Mirage.js dan demo langsung. Platform rekrutmen memungkinkan administrator memasang lowongan dan kandidat melamar, di Next.js dan Supabase dengan akses berbasis peran. Marketplace influencer menghubungkan brand dan influencer di Next.js 14 dan Supabase, dan itu juga punya demo langsung. Manajemen karyawan menyimpan data staf sebagai aplikasi CRUD dengan peran, dibangun dengan Angular, Spring Boot, JWT, dan MySQL. API Central lalu menstandarkan dokumentasi di sekeliling API, mengubah koleksi Postman ke arah Swagger dengan Angular dan Spring Boot.',
    },
    place: 'projects',
    choices: [
      { id: 'prj-ship', en: 'Shipment tracker', idn: 'Pelacak pengiriman', to: 'prj-ship' },
      { id: 'prj-hire', en: 'Hiring platform', idn: 'Platform rekrutmen', to: 'prj-hire' },
      { id: 'prj-market', en: 'Influencer marketplace', idn: 'Marketplace influencer', to: 'prj-market' },
      { id: 'prj-staff', en: 'Employee management', idn: 'Manajemen karyawan', to: 'prj-staff' },
      { id: 'prj-api', en: 'API Central', idn: 'API Central', to: 'prj-api' },
      ...leave('projects'),
    ],
  },
  'prj-ship': reply(
    {
      en: 'Shipment is a transport tracker built with Vue 3, TypeScript, and Pinia. The API is simulated with Mirage.js, and there is a live demo.',
      idn: 'Shipment adalah pelacak transportasi yang dibangun dengan Vue 3, TypeScript, dan Pinia. API-nya disimulasikan dengan Mirage.js, dan ada demo langsung.',
    },
    {
      en: 'Shipment is a Vue 3 tracker, and it has a live demo.',
      idn: 'Shipment adalah pelacak Vue 3, dan ada demo langsung.',
    },
    'prj-web',
    'services',
  ),
  'prj-hire': reply(
    {
      en: 'On the hiring platform an administrator posts jobs and a candidate applies. It uses Next.js and Supabase, with role-based access, a demo, and a short note.',
      idn: 'Pada platform rekrutmen, administrator memasang lowongan dan kandidat melamar. Ia memakai Next.js dan Supabase, dengan akses berbasis peran, sebuah demo, dan catatan pendek.',
    },
    {
      en: 'The hiring platform uses Next.js and Supabase, with separate roles for an administrator and a candidate.',
      idn: 'Platform rekrutmen memakai Next.js dan Supabase, dengan peran terpisah untuk administrator dan kandidat.',
    },
    'prj-web',
    'services',
  ),
  'prj-api': reply(
    {
      en: 'API Central standardizes API documentation and converts Postman collections toward Swagger, using Angular and Spring Boot. The same product appears in the FIF internship, where it covered 100 or more APIs.',
      idn: 'API Central menstandarkan dokumentasi API dan mengubah koleksi Postman ke arah Swagger, memakai Angular dan Spring Boot. Produk yang sama muncul di magang FIF, tempat ia mencakup 100 API atau lebih.',
    },
    {
      en: 'API Central uses Angular and Spring Boot, and the same product covered 100 or more APIs at FIF.',
      idn: 'API Central memakai Angular dan Spring Boot, dan produk yang sama mencakup 100 API atau lebih di FIF.',
    },
    'prj-web',
    'experience',
  ),
  'prj-design': {
    say: {
      en: 'Most of the design work lives in Figma, and each file is a product someone could click through. Sportainment lets a person find a sport, book a place, and track progress. The beauty shop is a mobile store for skincare. The campus portal redesigns a campus site around how a student finds information. Del-Pick carries a mobile delivery flow across 20 or more screens, and the group that later built that product used Flutter and Express.',
      idn: 'Sebagian besar kerja desain tinggal di Figma, dan setiap berkasnya adalah produk yang bisa diklik seseorang. Sportainment memungkinkan seseorang mencari olahraga, memesan tempat, dan mencatat progres. Toko kecantikan adalah toko mobile untuk perawatan kulit. Portal kampus merancang ulang situs kampus di sekitar cara mahasiswa menemukan informasi. Del-Pick membawa alur pengiriman mobile sepanjang 20 layar atau lebih, dan kelompok yang kemudian membangun produk itu memakai Flutter dan Express.',
    },
    place: 'projects',
    choices: [
      { id: 'prj-sport', en: 'Sportainment', idn: 'Sportainment', to: 'prj-sport' },
      { id: 'prj-beauty', en: 'Beauty shop', idn: 'Toko kecantikan', to: 'prj-beauty' },
      { id: 'prj-campus', en: 'Campus portal', idn: 'Portal kampus', to: 'prj-campus' },
      { id: 'prj-del', en: 'Del-Pick', idn: 'Del-Pick', to: 'prj-del' },
      ...leave('projects'),
    ],
  },
  'prj-sport': reply(
    {
      en: 'Sportainment is a Figma prototype for finding a sport, booking a place, and tracking progress.',
      idn: 'Sportainment adalah prototipe Figma untuk mencari olahraga, memesan tempat, dan mencatat progres.',
    },
    {
      en: 'Sportainment is a Figma prototype for finding and booking a sport.',
      idn: 'Sportainment adalah prototipe Figma untuk mencari dan memesan olahraga.',
    },
    'prj-design',
    'services',
  ),
  'prj-del': reply(
    {
      en: 'Del-Pick is a mobile delivery design of 20 or more screens. The group that built the same product used Flutter and Express.',
      idn: 'Del-Pick adalah desain pengiriman mobile dengan 20 layar atau lebih. Kelompok yang membangun produk yang sama memakai Flutter dan Express.',
    },
    {
      en: 'Del-Pick is a delivery design of twenty or more screens, and the group build used Flutter and Express.',
      idn: 'Del-Pick adalah desain pengiriman dengan dua puluh layar atau lebih, dan bangunan kelompoknya memakai Flutter dan Express.',
    },
    'prj-design',
    'services',
  ),
  'prj-group': reply(
    {
      en: 'Yes. Six of these were built with a team rather than alone. Del-Pick, the delivery app, used Flutter and Express. SEMAT DEL and FRK & FED both sat on Laravel and MySQL, and FRK & FED used that stack to plan and evaluate work, with PHP alongside. Two smaller programs were written in Python: a dental diagnosis system that reasons by forward chaining, and a DES encryption exercise. Clicknik stored hospital records in Java.',
      idn: 'Ya. Enam di antaranya dibangun bersama tim, bukan sendiri. Del-Pick, aplikasi pengirimannya, memakai Flutter dan Express. SEMAT DEL dan FRK & FED sama-sama duduk di Laravel dan MySQL, dan FRK & FED memakai tumpukan itu untuk merencanakan serta mengevaluasi kerja, dengan PHP di sampingnya. Dua program yang lebih kecil ditulis dengan Python: sistem diagnosa gigi yang menalar lewat forward chaining, dan latihan enkripsi DES. Clicknik menyimpan data rumah sakit dengan Java.',
    },
    {
      en: 'Six titles were built with a team, and they sit on the same project list.',
      idn: 'Enam judul dibangun bersama tim, dan semuanya ada di daftar proyek yang sama.',
    },
    'projects',
    'services',
  ),
  certificates: {
    section: true,
    say: {
      en: 'The certificates follow the same path as the work. Four Dicoding papers laid the front-end foundation, from JavaScript through beginner front-end. Campus life then left five more: IT Del Festival 2023, where he worked in public relations and documentation, plus an AI certificate, cyber security training, a PCA paper on principal component analysis, and a PKM competition paper. Organization papers record leadership of BEM’s social division and the GDSC core team. The internship folder closes the set with MSIB batch 7 and the Angular certificate from his half year at Javan.',
      idn: 'Sertifikatnya mengikuti jalur yang sama dengan pekerjaannya. Empat berkas Dicoding meletakkan dasar front-end, dari JavaScript sampai front-end pemula. Kehidupan kampus lalu meninggalkan lima berkas lagi: IT Del Festival 2023, tempat dia bekerja di hubungan masyarakat dan dokumentasi, ditambah sertifikat AI, pelatihan keamanan siber, berkas PCA tentang principal component analysis, dan berkas kompetisi PKM. Berkas organisasi mencatat kepemimpinan divisi sosial BEM dan tim inti GDSC. Map magang menutup rangkaian itu dengan MSIB angkatan 7 dan sertifikat Angular dari setengah tahunnya di Javan.',
    },
    again: {
      en: 'The certificates follow four parts of the path: front-end study at Dicoding, campus activities, organization, and the internship.',
      idn: 'Sertifikatnya mengikuti empat bagian jalur: belajar front-end di Dicoding, kegiatan kampus, organisasi, dan magang.',
    },
    choices: [
      { id: 'cert-dicoding', en: 'Dicoding', idn: 'Dicoding', to: 'cert-dicoding' },
      { id: 'cert-activity', en: 'Activities and competitions', idn: 'Kegiatan dan kompetisi', to: 'cert-activity' },
      { id: 'cert-org', en: 'Organization', idn: 'Organisasi', to: 'cert-org' },
      { id: 'cert-intern', en: 'Internship papers', idn: 'Berkas magang', to: 'cert-intern' },
    ],
  },
  'cert-dicoding': reply(
    {
      en: 'There are four Dicoding certificates, all front-end basics: JavaScript programming, web programming, fundamental front-end web development, and front-end web for beginners.',
      idn: 'Ada empat sertifikat Dicoding, semuanya dasar front-end: pemrograman JavaScript, pemrograman web, fundamental pengembangan web front-end, dan front-end web untuk pemula.',
    },
    {
      en: 'There are four Dicoding certificates, and all of them are front-end basics.',
      idn: 'Ada empat sertifikat Dicoding, dan semuanya dasar front-end.',
    },
    'certificates',
    'certificates',
  ),
  'cert-activity': reply(
    {
      en: 'Five activity papers sit together. IT Del Festival 2023 was with public relations and documentation. The others are an AI certificate, cyber security training, a PCA certificate on principal component analysis, and a PKM competition paper.',
      idn: 'Lima berkas kegiatan ada bersama. IT Del Festival 2023 bersama hubungan masyarakat dan dokumentasi. Yang lain adalah sertifikat AI, pelatihan keamanan siber, sertifikat PCA tentang principal component analysis, dan berkas kompetisi PKM.',
    },
    {
      en: 'The activity papers are the festival, AI, cyber security, PCA, and PKM.',
      idn: 'Berkas kegiatannya adalah festival, AI, keamanan siber, PCA, dan PKM.',
    },
    'certificates',
    'certificates',
  ),
  'cert-org': reply(
    {
      en: 'The organization papers are leadership of BEM’s social division and the GDSC core team. They match the roles already told: head of that social division from August 2023 to September 2024, and GDSC public relations from October 2023 to December 2024.',
      idn: 'Berkas organisasinya adalah kepemimpinan divisi sosial BEM dan tim inti GDSC. Semuanya cocok dengan peran yang sudah diceritakan: kepala divisi sosial itu dari Agustus 2023 sampai September 2024, dan hubungan masyarakat GDSC dari Oktober 2023 sampai Desember 2024.',
    },
    { en: 'BEM and GDSC. Experience tells the same story in sentences.', idn: 'BEM dan GDSC. Pengalaman menceritakan hal yang sama dalam kalimat.' },
    'certificates',
    'experience',
  ),
  'cert-intern': reply(
    {
      en: 'The internship papers are MSIB batch 7 and the Javan Angular certificate. They match the Javan internship from January to June 2025, when he delivered 6 applications for 5 clients.',
      idn: 'Berkas magangnya adalah MSIB angkatan 7 dan sertifikat Angular di Javan. Semuanya cocok dengan magang Javan dari Januari sampai Juni 2025, saat dia menyelesaikan 6 aplikasi untuk 5 klien.',
    },
    {
      en: 'The internship folder holds MSIB and the Javan certificate.',
      idn: 'Map magang menyimpan MSIB dan sertifikat Javan.',
    },
    'certificates',
    'certificates',
  ),
  contact: {
    section: true,
    say: {
      en: 'He can be reached at r.haikal1610@gmail.com, or by phone and WhatsApp at +62 853-6278-4585, from Jakarta, Indonesia. The form asks for a name, an email, a subject, and a message.',
      idn: 'Dia bisa dihubungi di r.haikal1610@gmail.com, atau lewat telepon dan WhatsApp di +62 853-6278-4585, dari Jakarta, Indonesia. Formulirnya meminta nama, email, subjek, dan pesan.',
    },
    again: {
      en: 'He is in Jakarta, at r.haikal1610@gmail.com and +62 853-6278-4585.',
      idn: 'Dia ada di Jakarta, di r.haikal1610@gmail.com dan +62 853-6278-4585.',
    },
    choices: [
      { id: 'contact-mail', en: 'What is the email?', idn: 'Emailnya apa?', to: 'contact-mail' },
      { id: 'contact-wa', en: 'Is there WhatsApp?', idn: 'Ada WhatsApp?', to: 'contact-wa' },
      { id: 'contact-form', en: 'How does the form work?', idn: 'Formulirnya bagaimana?', to: 'contact-form' },
      { id: 'contact-write', en: 'What should I write?', idn: 'Sebaiknya menulis apa?', to: 'contact-write' },
      { id: 'contact-phone', en: 'Is there a phone number?', idn: 'Ada nomor telepon?', to: 'contact-phone' },
    ],
  },
  'contact-mail': reply(
    {
      en: 'His email is r.haikal1610@gmail.com, the same address shown on the first screen.',
      idn: 'Emailnya r.haikal1610@gmail.com, alamat yang sama dengan yang tampil di layar pertama.',
    },
    { en: 'r.haikal1610@gmail.com.', idn: 'r.haikal1610@gmail.com.' },
    'contact',
    'contact',
  ),
  'contact-wa': reply(
    {
      en: 'Yes. WhatsApp is on +62 853-6278-4585, and that same number is the phone contact.',
      idn: 'Ya. WhatsApp ada di +62 853-6278-4585, dan nomor yang sama adalah kontak telepon.',
    },
    {
      en: 'WhatsApp uses the same number, +62 853-6278-4585.',
      idn: 'WhatsApp memakai nomor yang sama, +62 853-6278-4585.',
    },
    'contact',
    'contact',
  ),
  'contact-form': reply(
    {
      en: 'The form sends from this page. It asks for a name, an email, a subject, and a message, and it reaches Rifqi Haikal. EQbot does not read what is typed there.',
      idn: 'Formulir terkirim dari halaman ini. Ia meminta nama, email, subjek, dan pesan, lalu sampai ke Rifqi Haikal. EQbot tidak membaca yang diketik di sana.',
    },
    {
      en: 'The form has four fields, and EQbot never sees what is typed there.',
      idn: 'Formulirnya punya empat isian, dan EQbot tidak pernah melihat yang diketik di sana.',
    },
    'contact',
    'contact',
  ),
  'contact-write': reply(
    {
      en: 'A note he can answer names the system or product, the date it is needed, and what finished looks like. He has carried briefs like that through to handover, including 20 or more freelance web projects.',
      idn: 'Catatan yang bisa dia balas menyebut sistem atau produknya, tanggal kebutuhannya, dan seperti apa hasil yang selesai. Dia sudah membawa kebutuhan semacam itu sampai serah terima, termasuk 20 proyek web lepas atau lebih.',
    },
    {
      en: 'A useful note names the work, the dates, and what should be built.',
      idn: 'Catatan yang berguna menyebut pekerjaannya, tanggalnya, dan apa yang perlu dibangun.',
    },
    'contact',
    'contact',
  ),
  start: {
    section: true,
    say: {
      en: 'If the question is about hiring, the current contract is Tower Bersama, from July 2026, where he split a monolith into 8 applications and delivered 3 dashboards. His email is r.haikal1610@gmail.com. If the question is about the craft, the core is C#, ASP.NET MVC, .NET Core, SQL Server, and Telerik, with React, Angular, Next.js, and Spring Boot already used on shipped work. If the question is about background, there are six work entries from 2023 to now, plus GDSC and BEM at IT Del.',
      idn: 'Kalau pertanyaannya tentang rekrutmen, kontrak yang berjalan adalah Tower Bersama, dari Juli 2026, tempat dia memecah monolit menjadi 8 aplikasi dan menyelesaikan 3 dashboard. Emailnya r.haikal1610@gmail.com. Kalau pertanyaannya tentang karya, intinya C#, ASP.NET MVC, .NET Core, SQL Server, dan Telerik, dengan React, Angular, Next.js, dan Spring Boot yang sudah dipakai pada kerja terkirim. Kalau pertanyaannya tentang latar, ada enam catatan kerja dari 2023 sampai sekarang, plus GDSC dan BEM di IT Del.',
    },
    choices: [
      { id: 'start-hire', en: 'I might hire him', idn: 'Saya mungkin ingin merekrutnya', to: 'start-hire' },
      { id: 'start-craft', en: 'I want to see the craft', idn: 'Saya ingin melihat karyanya', to: 'start-craft' },
      { id: 'start-past', en: 'I want the background first', idn: 'Saya ingin latarnya dulu', to: 'start-past' },
    ],
  },
  'start-hire': reply(
    {
      en: 'The current contract is PT Tower Bersama Infrastructure, from July 2026. There he split one monolith into 8 applications and delivered the Payout, Business Projects, and HSE dashboards. Freelance has also been open since August 2023, with 20 or more web projects. He can be reached at r.haikal1610@gmail.com or +62 853-6278-4585.',
      idn: 'Kontrak yang berjalan adalah PT Tower Bersama Infrastructure, dari Juli 2026. Di sana dia memecah satu monolit menjadi 8 aplikasi dan menyelesaikan dashboard Payout, Business Projects, dan HSE. Kerja lepas juga terbuka sejak Agustus 2023, dengan 20 proyek web atau lebih. Dia bisa dihubungi di r.haikal1610@gmail.com atau +62 853-6278-4585.',
    },
    {
      en: 'The current contract is Tower Bersama, and the contact form is the way to write to him.',
      idn: 'Kontrak yang berjalan adalah Tower Bersama, dan formulir kontak adalah cara menulis kepadanya.',
    },
    'start',
    'contact',
  ),
  'start-craft': reply(
    {
      en: 'The core of the craft is C#, ASP.NET MVC, .NET Core, Entity Framework, SQL Server, and Telerik. He has also shipped work with React, Angular, Next.js, and Spring Boot. On the web side that shows up as Shipment in Vue 3, a hiring platform in Next.js and Supabase, and API Central in Angular and Spring Boot. On the design side, Sportainment, a beauty shop, a campus portal, and Del-Pick are in Figma.',
      idn: 'Inti karyanya adalah C#, ASP.NET MVC, .NET Core, Entity Framework, SQL Server, dan Telerik. Dia juga sudah mengirim kerja dengan React, Angular, Next.js, dan Spring Boot. Di sisi web, itu tampak sebagai Shipment dengan Vue 3, platform rekrutmen dengan Next.js dan Supabase, serta API Central dengan Angular dan Spring Boot. Di sisi desain, Sportainment, toko kecantikan, portal kampus, dan Del-Pick ada di Figma.',
    },
    {
      en: 'The craft is told first as services, then as the projects that shipped.',
      idn: 'Karyanya diceritakan dulu sebagai layanan, lalu sebagai proyek yang sudah terkirim.',
    },
    'start',
    'services',
  ),
  'start-past': reply(
    {
      en: 'The newest work is Tower Bersama, from July 2026. Before that came Pertamina Hulu Rokan from December 2025 to June 2026, a month at BRIN in late 2025, MSIB at Javan from January to June 2025, and FIF from June 2024 to January 2025. Freelance has run since August 2023. He studied Informatics at Institut Teknologi Del with a GPA of 3.39 out of 4.00, and the papers behind that path are Dicoding front-end, MSIB batch 7, BEM, and GDSC.',
      idn: 'Kerja terbaru adalah Tower Bersama, dari Juli 2026. Sebelumnya ada Pertamina Hulu Rokan dari Desember 2025 sampai Juni 2026, sebulan di BRIN pada akhir 2025, MSIB di Javan dari Januari sampai Juni 2025, dan FIF dari Juni 2024 sampai Januari 2025. Kerja lepas berjalan sejak Agustus 2023. Dia menempuh Informatika di Institut Teknologi Del dengan IPK 3,39 dari 4,00, dan berkas di belakang jalur itu adalah front-end Dicoding, MSIB angkatan 7, BEM, dan GDSC.',
    },
    {
      en: 'The background runs through the jobs first, then the papers that go with them.',
      idn: 'Latarnya berjalan lewat pekerjaan dulu, lalu berkas yang menyertainya.',
    },
    'start',
    'experience',
  ),
  meta: {
    say: {
      en: 'EQbot is a prepared guide for this page. Every sentence was written in advance, there is no model answering behind it, and the summaries use only the facts already here.',
      idn: 'EQbot adalah pemandu yang sudah disiapkan untuk halaman ini. Setiap kalimat ditulis lebih dulu, tidak ada model yang menjawab di belakangnya, dan rangkumannya hanya memakai fakta yang sudah ada di sini.',
    },
    choices: [
      { id: 'meta-ai', en: 'Are you an AI?', idn: 'Kamu AI?', to: 'meta-ai' },
      { id: 'meta-type', en: 'Can I type my own question?', idn: 'Boleh aku mengetik pertanyaan sendiri?', to: 'meta-type' },
      { id: 'meta-code', en: 'Can you write code for me?', idn: 'Kamu bisa menulis kode untukku?', to: 'meta-code' },
      { id: 'meta-secret', en: 'Do you know anything else?', idn: 'Kamu tahu hal lain?', to: 'meta-secret' },
      { id: 'meta-lang', en: 'Do you change language?', idn: 'Kamu ikut ganti bahasa?', to: 'meta-lang' },
    ],
  },
  'meta-ai': reply(
    {
      en: 'EQbot looks like a chatbot, but every sentence was written beforehand so it could tell Rifqi Haikal’s story without inventing details. No model is answering behind this corner.',
      idn: 'EQbot tampak seperti chatbot, tetapi setiap kalimat ditulis sebelumnya supaya ia bisa menceritakan Rifqi Haikal tanpa mengarang detail. Tidak ada model yang menjawab di balik pojok ini.',
    },
    { en: 'Prepared sentences. No model behind them.', idn: 'Kalimat yang sudah disiapkan. Tidak ada model di belakangnya.' },
    'meta',
  ),
  'meta-type': reply(
    {
      en: 'No. Questions stay on this list so the answer cannot invent a fact. Anything outside the list belongs with him, at r.haikal1610@gmail.com.',
      idn: 'Tidak. Pertanyaan tetap di daftar ini supaya jawabannya tidak mengarang fakta. Yang di luar daftar ada pada dirinya, di r.haikal1610@gmail.com.',
    },
    { en: 'The list is the whole of me. The form is for everything else.', idn: 'Daftar ini seluruh diriku. Formulir untuk sisanya.' },
    'meta',
    'contact',
  ),
  'meta-code': reply(
    {
      en: 'No. EQbot does not write new code. The person who does is Rifqi Haikal, and the shipped examples include ISEA at Pertamina Hulu Rokan, 8 applications at Tower Bersama, and API Central at FIF.',
      idn: 'Tidak. EQbot tidak menulis kode baru. Orang yang mengerjakannya adalah Rifqi Haikal, dan contoh yang sudah terkirim mencakup ISEA di Pertamina Hulu Rokan, 8 aplikasi di Tower Bersama, dan API Central di FIF.',
    },
    { en: 'I point. I do not build.', idn: 'Aku menunjuk. Aku tidak membangun.' },
    'meta',
    'services',
  ),
  'meta-secret': reply(
    {
      en: 'Only this: I used to walk across the page. It got in the way, so I sit here now.',
      idn: 'Hanya ini: dulu aku berjalan di halaman. Itu mengganggu, jadi sekarang aku duduk di sini.',
    },
    { en: 'I stay in the corner. That is the whole secret.', idn: 'Aku diam di pojok. Itu seluruh rahasianya.' },
    'meta',
  ),
  'meta-lang': reply(
    {
      en: 'Yes. The EN / ID switch changes me with the rest of the page. I do not keep a language of my own.',
      idn: 'Ya. Tombol EN / ID mengubah aku bersama halaman ini. Aku tidak punya bahasa sendiri.',
    },
    { en: 'I follow the language switch.', idn: 'Aku mengikuti tombol bahasa.' },
    'meta',
  ),
  'home-mark': reply(
    {
      en: 'The small line above the greeting says web, mobile, and interface. It names the range of the work, not a separate product.',
      idn: 'Baris kecil di atas sapaan menulis web, mobile, dan antarmuka. Baris itu menyebut jangkauan kerjanya, bukan produk yang terpisah.',
    },
    {
      en: 'The small line names web, mobile, and interface as one range of work.',
      idn: 'Baris kecil itu menyebut web, mobile, dan antarmuka sebagai satu jangkauan kerja.',
    },
    'home',
    'home',
  ),
  'home-buttons': reply(
    {
      en: 'Get in Touch leads to the contact form, where the email is r.haikal1610@gmail.com and the phone is +62 853-6278-4585. View Projects leads to the project list, which holds the web, design, and group work.',
      idn: 'Hubungi Saya menuju formulir kontak, tempat emailnya r.haikal1610@gmail.com dan teleponnya +62 853-6278-4585. Lihat Projek menuju daftar proyek, yang menyimpan kerja web, desain, dan kelompok.',
    },
    { en: 'One button writes to him. The other opens the projects.', idn: 'Satu tombol menulis kepadanya. Satunya membuka proyek.' },
    'home',
    'home',
  ),
  'home-counts': reply(
    {
      en: 'The four numbers under his name are 5 industries served, 100 or more standardized APIs, 3 or more years of development, and 30 or more web projects.',
      idn: 'Empat angka di bawah namanya adalah 5 industri yang dilayani, 100 API terstandar atau lebih, 3 tahun pengembangan atau lebih, dan 30 proyek web atau lebih.',
    },
    {
      en: 'Industries, APIs, years, and web projects.',
      idn: 'Industri, API, tahun, dan proyek web.',
    },
    'home',
    'home',
  ),
  'about-years': reply(
    {
      en: 'His paragraph says three years of hands-on development, the same 3 or more years counted on the first screen.',
      idn: 'Paragrafnya menyebut tiga tahun pengembangan langsung, sama dengan 3 tahun atau lebih yang dihitung di layar pertama.',
    },
    { en: 'Three years, in the paragraph and on the first screen.', idn: 'Tiga tahun, di paragraf dan di layar pertama.' },
    'about',
    'about',
  ),
  'exp-now': reply(
    {
      en: 'Two rows are still open. The contract at PT Tower Bersama Infrastructure has run since July 2026, and freelance has run remotely since August 2023.',
      idn: 'Dua baris masih terbuka. Kontrak di PT Tower Bersama Infrastructure berjalan sejak Juli 2026, dan kerja lepas berjalan jarak jauh sejak Agustus 2023.',
    },
    { en: 'Tower Bersama is the current contract. Freelance is still open too.', idn: 'Tower Bersama kontrak yang sedang berjalan. Kerja lepas juga masih terbuka.' },
    'experience',
    'experience',
  ),
  'exp-places': reply(
    {
      en: 'Tower Bersama, Pertamina Hulu Rokan, and FIF were in South Jakarta. BRIN was in Central Jakarta, Javan was in Yogyakarta, and the freelance work is remote.',
      idn: 'Tower Bersama, Pertamina Hulu Rokan, dan FIF ada di Jakarta Selatan. BRIN ada di Jakarta Pusat, Javan ada di Yogyakarta, dan kerja lepas dilakukan jarak jauh.',
    },
    {
      en: 'The jobs were in Jakarta and Yogyakarta, and the freelance work is remote.',
      idn: 'Pekerjaannya ada di Jakarta dan Yogyakarta, dan kerja lepas dilakukan jarak jauh.',
    },
    'experience',
    'experience',
  ),
  'svc-tools': reply(
    {
      en: 'Git, and GitHub or GitLab, are marked advanced. Postman and Swagger are marked intermediate.',
      idn: 'Git, serta GitHub atau GitLab, ditandai mahir. Postman dan Swagger ditandai menengah.',
    },
    {
      en: 'Git with GitHub or GitLab is marked advanced, and Postman with Swagger is marked intermediate.',
      idn: 'Git bersama GitHub atau GitLab ditandai mahir, dan Postman bersama Swagger ditandai menengah.',
    },
    'services',
    'services',
  ),
  'svc-apps': reply(
    {
      en: 'VS Code is marked advanced. Visual Studio Community, JetBrains IDEs, and Android Studio are marked basic.',
      idn: 'VS Code ditandai mahir. Visual Studio Community, IDE JetBrains, dan Android Studio ditandai dasar.',
    },
    {
      en: 'VS Code is the one marked advanced, and the other three editors are marked basic.',
      idn: 'VS Code yang ditandai mahir, dan tiga editor lainnya ditandai dasar.',
    },
    'services',
    'services',
  ),
  'prj-market': reply(
    {
      en: 'The influencer marketplace connects brands and influencers. It uses Next.js 14, TypeScript, Tailwind, and Supabase, and it has a live demo.',
      idn: 'Marketplace influencer menghubungkan brand dan influencer. Ia memakai Next.js 14, TypeScript, Tailwind, dan Supabase, dan ada demo langsung.',
    },
    {
      en: 'The influencer marketplace runs on Next.js and Supabase.',
      idn: 'Marketplace influencer berjalan di Next.js dan Supabase.',
    },
    'prj-web',
    'services',
  ),
  'prj-staff': reply(
    {
      en: 'Employee management is a CRUD app for employee records, with role-based access. It uses Angular, Spring Boot, JWT, MySQL, and Bootstrap, and it has a demo.',
      idn: 'Manajemen karyawan adalah aplikasi CRUD untuk data karyawan, dengan akses berbasis peran. Ia memakai Angular, Spring Boot, JWT, MySQL, dan Bootstrap, dan ada demonya.',
    },
    {
      en: 'Employee management uses Angular, Spring Boot, and MySQL.',
      idn: 'Manajemen karyawan memakai Angular, Spring Boot, dan MySQL.',
    },
    'prj-web',
    'services',
  ),
  'prj-beauty': reply(
    {
      en: 'The beauty shop is a mobile e-commerce design for skincare, made in Figma with a clickable prototype.',
      idn: 'Toko kecantikan adalah desain e-commerce mobile untuk perawatan kulit, dibuat di Figma dengan prototipe yang bisa diklik.',
    },
    {
      en: 'The beauty shop is a clickable mobile prototype in Figma.',
      idn: 'Toko kecantikan adalah prototipe mobile yang bisa diklik di Figma.',
    },
    'prj-design',
    'services',
  ),
  'prj-campus': reply(
    {
      en: 'The campus portal is a redesign of a campus site, focused on how a student finds information. The prototype is in Figma.',
      idn: 'Portal kampus adalah desain ulang situs kampus, berfokus pada cara mahasiswa menemukan informasi. Prototipenya ada di Figma.',
    },
    {
      en: 'The campus portal is a Figma redesign of how a student finds information.',
      idn: 'Portal kampus adalah desain ulang di Figma tentang cara mahasiswa menemukan informasi.',
    },
    'prj-design',
    'services',
  ),
  'contact-phone': reply(
    {
      en: 'Yes. The phone number is +62 853-6278-4585, the same number used for WhatsApp, and he is in Jakarta, Indonesia.',
      idn: 'Ya. Nomor teleponnya +62 853-6278-4585, nomor yang sama dipakai untuk WhatsApp, dan dia ada di Jakarta, Indonesia.',
    },
    {
      en: 'The phone number is +62 853-6278-4585, and WhatsApp uses it too.',
      idn: 'Nomor teleponnya +62 853-6278-4585, dan WhatsApp juga memakainya.',
    },
    'contact',
    'contact',
  ),
};
