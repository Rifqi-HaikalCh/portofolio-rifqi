import type { 
  NavLink, 
  Skill, 
  Experience, 
  Project, 
  CertificateCategory, 
  ContactInfo,
  AboutHighlight 
} from '../types';

export const navLinks: NavLink[] = [
  { href: '#home', labelEn: 'Home', labelId: 'Beranda' },
  { href: '#about', labelEn: 'About', labelId: 'Tentang' },
  { href: '#services', labelEn: 'Services', labelId: 'Layanan' },
  { href: '#experience', labelEn: 'Experience', labelId: 'Pengalaman' },
  { href: '#certificates', labelEn: 'Certificates', labelId: 'Sertifikat' },
  { href: '#contact', labelEn: 'Contact', labelId: 'Kontak' },
];

export const typingTexts = {
  en: ['A Software Developer', 'A Fullstack Developer', 'A Frontend Developer', 'A .Net/C# Developer'],
  id: ['Seorang Pengembang Perangkat Lunak', 'Seorang Pengembang Fullstack', 'Seorang Pengembang Frontend', 'Seorang Pengembang .Net/C#']
};

export const aboutHighlights: AboutHighlight[] = [
  {
    icon: 'graduation-cap',
    title: 'Education Excellence',
    titleId: 'Keunggulan Pendidikan',
    description: 'Bachelor of Informatics at Institut Teknologi Del, GPA 3.39/4.00',
    descriptionId: 'Sarjana Informatika di Institut Teknologi Del, IPK 3,39/4,00'
  },
  {
    icon: 'briefcase',
    title: 'Industry Experience',
    titleId: 'Pengalaman Industri',
    description: 'Telecommunications, oil and gas, research, IT consulting, and multifinance',
    descriptionId: 'Telekomunikasi, minyak dan gas, riset, konsultan TI, dan multifinance'
  },
  {
    icon: 'trophy',
    title: 'Achievements',
    titleId: 'Prestasi',
    description: 'Certified Industry Ready Talent (MSIB 2024)',
    descriptionId: 'Talenta yang Siap Bekerja di Industri (MSIB 2024)'
  },
  {
    icon: 'users',
    title: 'Freelance Software Engineer',
    titleId: 'Software Engineer Freelance',
    description: 'More than 3 years delivering web projects for organizations and MSMEs',
    descriptionId: 'Lebih dari 3 tahun mengerjakan proyek web untuk organisasi dan UMKM'
  }
];

export const hardSkills: Skill[] = [
  { name: 'HTML5', icon: 'html5', color: '#E34F26', category: 'hard' },
  { name: 'CSS3', icon: 'css3-alt', color: '#1572B6', category: 'hard' },
  { name: 'JavaScript', icon: 'js-square', color: '#F7DF1E', category: 'hard' },
  { name: 'TypeScript', icon: 'js-square', color: '#3178C6', category: 'hard' },
  { name: 'Java', icon: 'java', color: '#007396', category: 'hard' },
  { name: 'PHP', icon: 'php', color: '#777BB4', category: 'hard' },
  { name: 'Angular', icon: 'angular', color: '#DD0031', category: 'hard' },
  { name: 'React.js', icon: 'react', color: '#61DAFB', category: 'hard' },
  { name: 'Vue.js', icon: 'vuejs', color: '#4FC08D', category: 'hard' },
  { name: 'Spring Boot', icon: 'leaf', color: '#6DB33F', category: 'hard' },
  { name: 'Laravel', icon: 'laravel', color: '#FF2D20', category: 'hard' },
  { name: 'Git', icon: 'git-alt', color: '#F05032', category: 'hard' },
];

export const softSkills: Skill[] = [
  { name: 'Problem Solving', icon: 'puzzle-piece', color: '#10B981', category: 'soft' },
  { name: 'Critical Thinking', icon: 'lightbulb', color: '#F59E0B', category: 'soft' },
  { name: 'Team Work', icon: 'users', color: '#3B82F6', category: 'soft' },
  { name: 'Communication', icon: 'comments', color: '#8B5CF6', category: 'soft' },
  { name: 'Leadership', icon: 'user-tie', color: '#EF4444', category: 'soft' },
  { name: 'Time Management', icon: 'clock', color: '#06B6D4', category: 'soft' },
  { name: 'Creativity', icon: 'palette', color: '#EC4899', category: 'soft' },
  { name: 'Adaptability', icon: 'sync-alt', color: '#84CC16', category: 'soft' },
];

// Developer Skills for GlassSkillCard
export const developerSkills = [
  { name: 'C#', image: '/assets/csharp.png', focus: 'core' as const },
  { name: 'ASP.NET MVC', image: '/assets/aspnet.png', focus: 'core' as const },
  { name: '.NET Core', image: '/assets/dotnet.png', focus: 'core' as const },
  { name: 'Entity Framework', image: '/assets/entity-framework.png', focus: 'core' as const },
  { name: 'SQL Server', image: '/assets/SSMS.webp', focus: 'core' as const },
  { name: 'Telerik', image: '/assets/telerik.png', focus: 'core' as const },
  { name: 'TypeScript', image: '/assets/typescript-new.webp', focus: 'additional' as const },
  { name: 'JavaScript', image: '/assets/javascript-new.webp', focus: 'additional' as const },
  { name: 'HTML', image: '/assets/HTML-new.webp', focus: 'additional' as const },
  { name: 'CSS', image: '/assets/CSS-new.webp', focus: 'additional' as const },
  { name: 'Angular', image: '/assets/angularlogo.webp', focus: 'additional' as const },
  { name: 'Next.js', image: '/assets/Next JS logo.webp', focus: 'additional' as const },
  { name: 'Tailwind CSS', image: '/assets/tailwind.webp', focus: 'additional' as const },
  { name: 'Bootstrap', image: '/assets/boostrap-new.webp', focus: 'additional' as const },
  { name: 'React', image: '/assets/react js logo.webp', focus: 'additional' as const },
  { name: 'Vue.js', image: '/assets/Vue.js logo.webp', focus: 'additional' as const },
  { name: 'Java', image: '/assets/Java-new.webp', focus: 'additional' as const },
  { name: 'Spring Boot', image: '/assets/springboot-new.webp', focus: 'additional' as const },
  { name: 'Express.js', image: '/assets/express_js-new.webp', focus: 'additional' as const },
  { name: 'Node.js', image: '/assets/node_js.webp', focus: 'additional' as const },
  { name: 'Laravel', image: '/assets/laravel.webp', focus: 'additional' as const },
  { name: 'PHP', image: '/assets/php-new.webp', focus: 'additional' as const },
];

export const additionalSkillGroups = [
  {
    labelEn: 'Language',
    labelId: 'Bahasa',
    skills: [
      { name: 'JavaScript', level: 'advance' as const, image: '/assets/javascript-new.webp' },
      { name: 'TypeScript', level: 'advance' as const, image: '/assets/typescript-new.webp' },
      { name: 'HTML', level: 'advance' as const, image: '/assets/HTML-new.webp' },
      { name: 'CSS', level: 'advance' as const, image: '/assets/CSS-new.webp' },
      { name: 'Java', level: 'intermediate' as const, image: '/assets/Java-new.webp' },
      { name: 'PHP', level: 'basic' as const, image: '/assets/php-new.webp' },
      { name: 'Python', level: 'basic' as const, image: '/assets/python.png' },
    ],
  },
  {
    labelEn: 'Framework',
    labelId: 'Framework',
    skills: [
      { name: 'Angular', level: 'advance' as const, image: '/assets/angularlogo.webp' },
      { name: 'Next.js', level: 'advance' as const, image: '/assets/Next JS logo.webp' },
      { name: 'Tailwind CSS', level: 'advance' as const, image: '/assets/tailwind.webp' },
      { name: 'Bootstrap', level: 'advance' as const, image: '/assets/boostrap-new.webp' },
      { name: 'Vue.js', level: 'intermediate' as const, image: '/assets/Vue.js logo.webp' },
      { name: 'React.js', level: 'intermediate' as const, image: '/assets/react js logo.webp' },
      { name: 'Spring Boot', level: 'intermediate' as const, image: '/assets/springboot-new.webp' },
      { name: 'Express.js', level: 'intermediate' as const, image: '/assets/express_js-new.webp' },
      { name: 'Node.js', level: 'intermediate' as const, image: '/assets/node_js.webp' },
      { name: 'Laravel', level: 'basic' as const, image: '/assets/laravel.webp' },
      { name: 'Flutter', level: 'basic' as const, image: '/assets/flutter.png' },
    ],
  },
  {
    labelEn: 'Development tools',
    labelId: 'Alat pengembangan',
    skills: [
      { name: 'Git', level: 'advance' as const, image: '/assets/git.png' },
      { name: 'GitHub / GitLab', level: 'advance' as const, image: '/assets/github-gitlab.png', imageDark: '/assets/github-gitlab-dark.png' },
      { name: 'Postman', level: 'intermediate' as const, image: '/assets/postman.png' },
      { name: 'Swagger', level: 'intermediate' as const, image: '/assets/swagger.png' },
    ],
  },
  {
    labelEn: 'Application',
    labelId: 'Aplikasi',
    skills: [
      { name: 'VS Code', level: 'advance' as const, image: '/assets/vscode.png' },
      { name: 'Visual Studio Community', level: 'basic' as const, image: '/assets/visual-studio.png' },
      { name: 'JetBrains IDEs', level: 'basic' as const, image: '/assets/jetbrains.png' },
      { name: 'Android Studio', level: 'basic' as const, image: '/assets/android-studio.png' },
    ],
  },
];

// Design Skills for GlassSkillCard
export const designSkills = [
  { name: 'Figma', image: '/assets/Figma.webp' },
  { name: 'Canva', image: '/assets/Canva.webp' },
  { name: 'Framer', image: '/assets/framer.webp' },
  { name: 'SketchUp', image: '/assets/sketchup.webp' },
  { name: 'Webflow', image: '/assets/webflow-new.webp' },
  { name: 'Photoshop', image: '/assets/Photoshop.webp' },
];

export const workExperience: Experience[] = [
  {
    id: 'tbg',
    title: 'IT SOFTWARE DEVELOPER',
    titleId: 'PENGEMBANG PERANGKAT LUNAK TI',
    positionDetail: 'Contract based',
    positionDetailId: 'Berbasis kontrak',
    company: 'PT TOWER BERSAMA INFRASTRUCTURE TBK',
    companyType: 'TELECOMMUNICATION INFRASTRUCTURE',
    companyTypeId: 'INFRASTRUKTUR TELEKOMUNIKASI',
    period: 'Jul 2026 – Present',
    location: 'South Jakarta, Indonesia',
    shortDescription: 'Re-architected an enterprise monolith into 8 standalone applications and delivered 3 operational monitoring dashboards.',
    shortDescriptionId: 'Merancang ulang monolit enterprise menjadi 8 aplikasi mandiri dan menyelesaikan 3 dashboard pemantauan operasional.',
    description: '• Re-architected a monolithic enterprise application into 8 standalone applications, isolating codebases and deployments so a change or failure in one module no longer affected the others.\n• Developed 3 enterprise monitoring dashboards for Payout, Business Projects, and HSE using C#, ASP.NET MVC, and Telerik, giving management centralized operational visibility.\n• Optimized SQL Server data processing with stored procedures, set-based queries, indexing, and transactional logic across 8 applications and 3 dashboards.\n• Collaborated with project managers and business users across requirements analysis, system design, development, testing, deployment, and maintenance.',
    descriptionId: '• Merancang ulang aplikasi enterprise monolitik menjadi 8 aplikasi mandiri, memisahkan basis kode dan deployment agar perubahan atau kegagalan di satu modul tidak memengaruhi modul lain.\n• Mengembangkan 3 dashboard pemantauan enterprise untuk Payout, Business Projects, dan HSE memakai C#, ASP.NET MVC, dan Telerik, sehingga manajemen mendapat visibilitas operasional yang terpusat.\n• Mengoptimalkan pemrosesan data SQL Server dengan stored procedure, kueri set-based, indexing, dan logika transaksional pada 8 aplikasi dan 3 dashboard.\n• Berkolaborasi dengan manajer proyek dan pengguna bisnis dari analisis kebutuhan, desain sistem, pengembangan, pengujian, deployment, hingga pemeliharaan.',
    techStack: ['C#', 'ASP.NET MVC', '.NET Core', 'Telerik', 'SQL Server', 'Stored Procedure'],
    type: 'work',
    image: '/assets/Logo-TBG.png',
    logo: '/assets/logo-tower-bersama.png'
  },
  {
    id: 'phr',
    title: 'IT BUSINESS SOLUTION INTERN',
    titleId: 'MAGANG SOLUSI BISNIS TI',
    company: 'PT. PERTAMINA HULU ROKAN (PHR)',
    companyType: 'OIL & GAS INDUSTRY',
    companyTypeId: 'INDUSTRI MINYAK & GAS',
    period: 'Dec 2025 – Jun 2026',
    location: 'South Jakarta, Indonesia',
    shortDescription: 'Developed ISEA, an N-tier platform that consolidates seismic, drilling, and exploration workflows.',
    shortDescriptionId: 'Mengembangkan ISEA, platform N-tier yang menyatukan alur kerja seismik, pengeboran, dan eksplorasi.',
    description: '• Developed ISEA (Subsurface Integrated Exploration Application), an N-tier enterprise platform consolidating seismic, drilling, and exploration workflows into one application.\n• Optimized backend processing for millions of database records using Entity Framework, deferred execution, AutoMapper DTOs, and Kendo UI.\n• Implemented enterprise security controls including Keycloak SSO, MFA, Serilog audit logging, and load-balancer IP tracking.\n• Designed a reusable Dynamic Milestone Engine with Generic Repository and Service patterns, reducing duplicated implementation across modules.\n• Deployed the application to IIS in accordance with ADS v1.6 requirements.',
    descriptionId: '• Mengembangkan ISEA (Subsurface Integrated Exploration Application), platform enterprise N-tier yang menyatukan alur kerja seismik, pengeboran, dan eksplorasi dalam satu aplikasi.\n• Mengoptimalkan pemrosesan backend untuk jutaan rekaman basis data memakai Entity Framework, deferred execution, DTO AutoMapper, dan Kendo UI.\n• Menerapkan kontrol keamanan enterprise, termasuk SSO Keycloak, MFA, jejak audit Serilog, dan pelacakan IP load balancer.\n• Merancang Dynamic Milestone Engine yang dapat dipakai ulang dengan pola Generic Repository dan Service, mengurangi implementasi yang terduplikasi antar modul.\n• Men-deploy aplikasi ke IIS sesuai persyaratan ADS v1.6.',
    techStack: ['ASP.NET MVC', 'C#', 'SQL Server', 'Entity Framework', 'Kendo UI', 'Keycloak', 'Serilog', 'IIS'],
    type: 'work',
    image: '/assets/phr-momen.webp',
    logo: '/assets/logo-phr.png'
  },
  {
    id: 'brin',
    title: 'SOFTWARE ENGINEER (PROJECT-BASED PARTNER)',
    titleId: 'SOFTWARE ENGINEER (MITRA BERBASIS PROYEK)',
    company: 'BADAN RISET DAN INOVASI NASIONAL (BRIN)',
    companyType: 'RESEARCH AND DEVELOPMENT',
    companyTypeId: 'RISET DAN INOVASI',
    period: 'Oct 2025 – Dec 2025',
    location: 'Central Jakarta, Indonesia',
    shortDescription: 'Joined as a technical partner to finish a research and innovation funding monitoring system within one month.',
    shortDescriptionId: 'Bergabung sebagai mitra teknis untuk menyelesaikan sistem pemantauan pendanaan riset dan inovasi dalam satu bulan.',
    description: '• Joined as a technical partner to complete a Research and Innovation Funding Monitoring System within a one-month delivery deadline.\n• Optimized financial modules for tracking research fund inflows and outflows, improving data accuracy and accountability.\n• Bridged business stakeholders and developers through requirements clarification, code reviews, and production deployment.',
    descriptionId: '• Bergabung sebagai mitra teknis untuk menyelesaikan Sistem Pemantauan Pendanaan Riset dan Inovasi dalam batas waktu satu bulan.\n• Mengoptimalkan modul keuangan untuk melacak arus masuk dan keluar dana riset, meningkatkan akurasi data dan akuntabilitas.\n• Menjembatani pemangku kepentingan bisnis dan pengembang melalui klarifikasi kebutuhan, tinjauan kode, dan deployment ke produksi.',
    techStack: ['React.js', 'JavaScript', 'PHP', 'Laravel', 'HTML', 'CSS', 'SQL', 'Postman', 'RESTful API'],
    type: 'work',
    image: '/assets/brin-momen.webp',
    logo: '/assets/logo-brin.png'
  },
  {
    id: 'javan',
    title: 'ANGULAR DEVELOPER INTERN',
    titleId: 'MAGANG PENGEMBANG ANGULAR',
    positionDetail: 'MSIB (Internship and Certified Independent Study)',
    positionDetailId: 'MSIB (Magang dan Studi Independen Bersertifikat)',
    company: 'PT. JAVAN CIPTA SOLUSI',
    companyType: 'IT CONSULTANT',
    companyTypeId: 'KONSULTAN TI',
    period: 'Jan 2025 - Jun 2025',
    location: 'Yogyakarta, Indonesia',
    shortDescription: 'Delivered 6 enterprise applications for 5 clients, including BRI, KPK, Kemenkeu, Kominfo, and UII.',
    shortDescriptionId: 'Menyelesaikan 6 aplikasi enterprise untuk 5 klien, termasuk BRI, KPK, Kemenkeu, Kominfo, dan UII.',
    description: '• Delivered 6 enterprise applications for 5 clients, including BRI, KPK, Kemenkeu, Kominfo, and UII, within Agile sprint timelines.\n• Developed responsive enterprise interfaces from Figma designs using Angular, React.js, and Vue.js.\n• Developed Spring Boot backend services for Kominfo User Access Management and UII SIMLAB, supporting access control and inventory workflows.\n• Collaborated within Agile teams across development, testing, issue resolution, and delivery.',
    descriptionId: '• Menyelesaikan 6 aplikasi enterprise untuk 5 klien, termasuk BRI, KPK, Kemenkeu, Kominfo, dan UII, dalam timeline sprint Agile.\n• Mengembangkan antarmuka enterprise yang responsif dari desain Figma memakai Angular, React.js, dan Vue.js.\n• Mengembangkan layanan backend Spring Boot untuk Manajemen Akses Pengguna Kominfo dan SIMLAB UII, mendukung kontrol akses dan alur inventaris.\n• Berkolaborasi dalam tim Agile pada pengembangan, pengujian, penyelesaian isu, dan pengiriman.',
    techStack: ['Spring Boot', 'Java', 'React.js', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    type: 'work',
    image: '/assets/javan.webp',
    logo: '/assets/logo-javan.png'
  },
  {
    id: 'fif',
    title: 'FULLSTACK DEVELOPER INTERN',
    titleId: 'MAGANG PENGEMBANG FULLSTACK',
    positionDetail: 'Individual Internship',
    positionDetailId: 'Magang individu',
    company: 'PT. FEDERAL INTERNATIONAL FINANCE',
    companyType: 'MULTIFINANCE',
    companyTypeId: 'MULTIFINANCE',
    period: 'Jun 2024 - Jan 2025',
    location: 'South Jakarta, Indonesia',
    shortDescription: 'Built an HRIS proof of concept with role-based access for 100+ employee profiles, and a Swagger portal for 100+ APIs.',
    shortDescriptionId: 'Membangun bukti konsep HRIS dengan akses berbasis peran untuk 100+ profil karyawan, dan portal Swagger untuk 100+ API.',
    description: '• Developed an HRIS proof of concept with role-based access control for managing 100+ employee profiles.\n• Built API Central, a Swagger-documented portal standardizing 100+ APIs and improving developer onboarding and integration.\n• Developed reusable Angular and TypeScript components and Spring Boot services for standardized data exchange with legacy systems.',
    descriptionId: '• Mengembangkan bukti konsep HRIS dengan kontrol akses berbasis peran untuk mengelola 100+ profil karyawan.\n• Membangun API Central, portal berdokumen Swagger yang menstandarkan 100+ API dan mempercepat orientasi serta integrasi pengembang.\n• Mengembangkan komponen Angular dan TypeScript yang dapat dipakai ulang, serta layanan Spring Boot, untuk pertukaran data yang standar dengan sistem lama.',
    techStack: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Spring Boot', 'Java', 'Swagger'],
    type: 'work',
    image: '/assets/fif.webp',
    logo: '/assets/logo-fifgroup.png'
  },
  {
    id: 'freelance',
    title: 'SOFTWARE ENGINEER / IT CONSULTANT',
    titleId: 'SOFTWARE ENGINEER / KONSULTAN TI',
    company: 'FREELANCE',
    companyType: 'IT CONSULTANT',
    companyTypeId: 'KONSULTAN TI',
    period: 'Aug 2023 - Present',
    location: 'Remote',
    shortDescription: 'Delivered 20+ web projects for academic organizations and MSMEs, from requirements through handover.',
    shortDescriptionId: 'Menyelesaikan 20+ proyek web untuk organisasi akademik dan UMKM, dari kebutuhan hingga serah terima.',
    description: '• Delivered 20+ web projects for academic organizations and MSMEs, covering requirements consultation, UI/UX design, development, testing, deployment, and handover.\n• Translated business requirements into production-ready web applications within agreed delivery timelines.\n• Worked directly with clients to clarify requirements, prioritize features, and deliver maintainable solutions.',
    descriptionId: '• Menyelesaikan 20+ proyek web untuk organisasi akademik dan UMKM, mencakup konsultasi kebutuhan, desain UI/UX, pengembangan, pengujian, deployment, dan serah terima.\n• Menerjemahkan kebutuhan bisnis menjadi aplikasi web yang siap produksi sesuai batas waktu yang disepakati.\n• Bekerja langsung dengan klien untuk mengklarifikasi kebutuhan, menyusun prioritas fitur, dan menyerahkan solusi yang mudah dipelihara.',
    techStack: ['Figma', 'React.js', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    type: 'work',
    image: '/assets/Profile.webp'
  }
];

export const organizationExperience: Experience[] = [
  {
    id: 'gdsc',
    title: 'Public Relations - Core Team',
    titleId: 'Hubungan Masyarakat - Tim Inti',
    shortDescription: 'Played a key role in executing strategic public relations plans and serving as Master of Ceremonies.',
    shortDescriptionId: 'Berperan menjalankan rencana hubungan masyarakat dan bertugas sebagai pembawa acara.',
    company: 'Google Developer Student Club IT Del',
    period: 'Oct 2023 - Dec 2024',
    description: 'Played a key role in executing strategic public relations plans and served as Master of Ceremonies during key club events.',
    descriptionId: 'Berperan menjalankan rencana hubungan masyarakat dan bertugas sebagai pembawa acara pada acara utama klub.',
    type: 'organization',
    image: '/assets/gdsc.webp'
  },
  {
    id: 'bem',
    title: 'Head of Social Division',
    titleId: 'Kepala Divisi Sosial',
    shortDescription: 'Managed off-campus activities and social media management for the student executive board.',
    shortDescriptionId: 'Mengelola kegiatan luar kampus dan media sosial badan eksekutif mahasiswa.',
    company: 'Student Executive Board - IT Del',
    period: 'Aug 2023 - Sep 2024',
    description: 'Successfully managed various off-campus activities and drove division\'s public relations efforts through strategic social media management.',
    descriptionId: 'Mengelola berbagai kegiatan luar kampus dan mengarahkan hubungan masyarakat divisi melalui pengelolaan media sosial.',
    type: 'organization',
    image: '/assets/dhpm.webp'
  }
];

export const individualProjects: Project[] = [
  {
    id: 'shipment-tracker',
    title: 'Shipment – Transport Tracker',
    description: 'Web-based application used for logistic company to track delivery. Developed a responsive Shipment Management SPA using Vue 3 (Composition API) and TypeScript, delivering a seamless user experience across desktop and mobile devices with a built-in Dark/Light mode via Tailwind CSS. Engineered a real-time tracking and filtering system utilizing Pinia for state management. Built a fully simulated REST API environment using Mirage.js to mimic realistic network latency, HTTP status codes, and real-time shipment route simulations with automated status transitions.',
    descriptionId: 'Aplikasi berbasis web yang dipakai perusahaan logistik untuk melacak pengiriman. Dikembangkan sebagai SPA manajemen pengiriman yang responsif memakai Vue 3 (Composition API) dan TypeScript, dengan pengalaman yang mulus di desktop dan ponsel serta mode gelap/terang lewat Tailwind CSS. Sistem pelacakan dan penyaringan waktu nyata memakai Pinia untuk state. Lingkungan REST API yang disimulasikan penuh memakai Mirage.js meniru latensi jaringan, kode status HTTP, dan simulasi rute pengiriman waktu nyata dengan transisi status otomatis.',
    image: '/assets/ShipTrack-view1.webp',
    techStack: ['Vue 3', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Pinia', 'Mirage.js'],
    links: {
      demo: 'https://transport-shipment-tracker-chi.vercel.app/',
      github: 'https://github.com/Rifqi-HaikalCh/-Transport-Shipment-Tracker'
    },
    category: 'individual',
    type: 'web',
    slides: ['/assets/ShipTrack-view1.webp', '/assets/ShipTrack-view2.webp']
  },
    {
    id: 'marketplace-influencer',
    title: 'Marketplace Influencer Platform',
    description: 'Simplifies influencer discovery and collaboration for brands. Engineered a full-stack marketplace from scratch using a modern tech stack (Next.js 14, TypeScript, Supabase) to connect brands with influencers. Designed and implemented a pixel-perfect, responsive UI/UX with Tailwind CSS, featuring separate, optimized views for desktop and mobile to ensure a seamless user journey.',
    descriptionId: 'Menyederhanakan pencarian influencer dan kolaborasi untuk merek. Marketplace full-stack dibangun dari awal memakai Next.js 14, TypeScript, dan Supabase untuk menghubungkan merek dengan influencer. Antarmuka responsif dengan Tailwind CSS memiliki tampilan terpisah yang dioptimalkan untuk desktop dan ponsel.',
    image: '/assets/marketplaceweb.webp',
    techStack: ['Next.js 14', 'React.js', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Supabase', 'RBAC'],
    links: {
      demo: 'https://homepage-redesign-inky.vercel.app/'
    },
    category: 'individual',
    type: 'web'
  },
  {
    id: 'hiring-platform',
    title: 'Hiring Platform for Jobseeker',
    description: 'Modern hiring platform enabling administrators to manage job listings and candidates to browse/apply. Implemented secure user authentication and role-based access control (RBAC) leveraging Supabase Auth. Designed and built reusable, responsive UI components using Tailwind CSS and Headless UI, ensuring an intuitive user experience across desktop and mobile platforms.',
    descriptionId: 'Platform perekrutan yang memungkinkan administrator mengelola lowongan dan kandidat menelusuri serta melamar. Otentikasi pengguna dan kontrol akses berbasis peran memakai Supabase Auth. Komponen antarmuka yang dapat dipakai ulang dan responsif memakai Tailwind CSS dan Headless UI, untuk desktop dan ponsel.',
    image: '/assets/Hiring Platform web.webp',
    techStack: ['Next.js 16', 'React.js', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Supabase', 'React Hook Form', 'Zustand'],
    links: {
      demo: 'https://hiring-platform-woad.vercel.app',
      needToKnow: 'https://drive.google.com/file/d/1sDZJJzx59VfwPaw2Y7J-hss0yh88rDyj/view?usp=sharing'
    },
    category: 'individual',
    type: 'web'
  },
    {
    id: 'todo-app',
    title: 'Todo Application',
    description: 'A modern and intuitive todo application for task management. Built with modern web technologies for seamless user experience with features like task creation, editing, deletion, and status tracking.',
    descriptionId: 'Aplikasi todo yang modern dan intuitif untuk manajemen tugas. Dibangun dengan teknologi web modern untuk pengalaman pengguna yang mulus dengan fitur seperti pembuatan tugas, editing, penghapusan, dan pelacakan status.',
    image: '/assets/todo-app.webp',
    techStack: ['React', 'Next.js', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Local Storage'],
    links: {
      demo: 'https://assessment-todo-application.vercel.app/'
    },
    category: 'individual',
    type: 'web'
  },
    {
    id: 'mini-games',
    title: 'Mini Games Web Portal',
    description: 'Collection of interactive web-based games developed with JavaScript, featuring engaging user experience.',
    descriptionId: 'Kumpulan game interaktif berbasis web yang dikembangkan dengan JavaScript, menampilkan pengalaman pengguna yang menarik.',
    image: '/assets/game.webp',
    techStack: ['JavaScript', 'HTML', 'HTML5 Canvas', 'CSS3', 'DOM Manipulation', 'Event Handling'],
    links: {
      demo: 'https://games-rifqi.netlify.app/',
      github: 'https://github.com/Rifqi-HaikalCh'
    },
    category: 'individual',
    type: 'web'
  },
  {
    id: 'api-central',
    title: 'API Central',
    description: 'Centralization and standardization of API documentation with Postman-to-Swagger converter tool.',
    descriptionId: 'Sentralisasi dan standardisasi dokumentasi API dengan alat konverter Postman-ke-Swagger.',
    image: '/assets/api-central.webp',
    techStack: ['Angular', 'TypeScript', 'Spring Boot', 'Java', 'HTML', 'CSS', 'Tailwind CSS'],
    links: {
      demo: 'https://api-central.netlify.app/',
      github: 'https://github.com/Rifqi-HaikalCh/apicentral-frontend'
    },
    category: 'individual',
    type: 'web'
  },
  {
    id: 'employee-management',
    title: 'Employee Management System',
    description: 'Comprehensive employee management application with CRUD functionality and role-based access control.',
    descriptionId: 'Aplikasi manajemen karyawan yang komprehensif dengan fungsi CRUD dan kontrol akses berbasis peran.',
    image: '/assets/employee.webp',
    techStack: ['Angular', 'TypeScript', 'Spring Boot', 'Java', 'HTML', 'CSS', 'Bootstrap', 'JWT', 'MySQL'],
    links: {
      demo: 'https://employee-web.netlify.app/',
      github: 'https://github.com/Rifqi-HaikalCh/employee-frontend'
    },
    category: 'individual',
    type: 'web'
  },
  {
    id: 'notes-app',
    title: 'Notes Web Application',
    description: 'Responsive single-page note-taking application built with vanilla JavaScript and Web Components API.',
    descriptionId: 'Aplikasi pencatat responsif satu halaman yang dibangun dengan vanilla JavaScript dan Web Components API.',
    image: '/assets/notes.webp',
    techStack: ['JavaScript', 'HTML5', 'CSS', 'CSS Grid', 'Flexbox', 'Web Components'],
    links: {
      demo: 'https://notes-rifqi.netlify.app/',
      github: 'https://github.com/Rifqi-HaikalCh/notes-app'
    },
    category: 'individual',
    type: 'web'
  },
  {
    id: 'bookshelf',
    title: 'Bookshelf Web Application',
    description: 'Interactive front-end application for managing digital bookshelf with full CRUD operations.',
    descriptionId: 'Aplikasi front-end interaktif untuk mengelola rak buku digital dengan operasi CRUD lengkap.',
    image: '/assets/bookshelf.webp',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage', 'DOM'],
    links: {
      demo: 'https://bookshelf-rifqi.netlify.app/',
      github: 'https://github.com/Rifqi-HaikalCh/bookshelf-app'
    },
    category: 'individual',
    type: 'web'
  }
];

export const designProjects: Project[] = [
  {
    id: 'sportainment-app',
    title: 'Sportainment App',
    description: 'A platform for sports enthusiasts to easily find activities, events, and track their progress. Complete with features for booking sports facilities, joining community events, and monitoring personal fitness achievements.',
    descriptionId: 'Platform bagi penggemar olahraga untuk menemukan aktivitas, acara, dan memantau progres. Dilengkapi pemesanan fasilitas olahraga, keikutsertaan pada acara komunitas, dan pemantauan pencapaian kebugaran pribadi.',
    image: '/assets/Sportainment-web.webp',
    techStack: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
    links: {
      prototype: 'https://www.figma.com/proto/qzu1Y29B3OPdQwCp62JpbZ/Sportainment?page-id=0%3A1&node-id=22-1273&p=f&viewport=93%2C-29%2C0.17&t=636v3PPntD4Dg81U-1&scaling=contain&content-scaling=fixed'
    },
    category: 'individual',
    type: 'design'
  },
  {
    id: 'beauty-mobile-app-design',
    title: 'Beauty E-Commerce Mobile App Design',
    description: 'Designing a modern and intuitive mobile e-commerce experience dedicated to beauty and skincare products.',
    descriptionId: 'Merancang pengalaman e-commerce mobile yang modern dan intuitif khusus untuk produk kecantikan dan perawatan kulit.',
    image: '/assets/beautyMobileApp.webp',
    techStack: ['Figma', 'UI/UX Design', 'Mobile Design', 'Design System', 'Prototyping'],
    links: {
      prototype: 'https://www.figma.com/proto/P1HhF2cjWydsS4UtzQ9liv/Beauty-Mobile-App-Design?page-id=0%3A1&node-id=49-1149&p=f&viewport=133%2C397%2C0.55&t=dfdOnSGjlSOq84Zw-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=49%3A1072'
    },
    category: 'individual',
    type: 'design',
    slides: ['/assets/beautyMobileApp.webp']
  },
  {
    id: 'dinoshop-design',
    title: 'DinoShop E-Commerce Design',
    description: 'Designing a complete, visually-driven user experience for an electronics e-commerce platform, focusing on a clean, minimalist aesthetic.',
    descriptionId: 'Merancang pengalaman pengguna yang lengkap dan visual untuk platform e-commerce elektronik, berfokus pada estetika minimalis yang bersih.',
    image: '/assets/DinoShop.webp',
    techStack: ['Figma', 'UI/UX Design', 'Prototyping', 'Interactive Design'],
    links: {
      prototype: 'https://www.figma.com/proto/ZNCYVnAGdOL47VgFPnZGHE/Project-Mock?page-id=0%3A1&node-id=145-4254&p=f&viewport=1008%2C3367%2C0.45&t=a6FkFBiT6pik43fA-1&scaling=contain&content-scaling=fixed&starting-point-node-id=145%3A4254'
    },
    category: 'individual',
    type: 'design',
    slides: ['/assets/DinoShop.webp']
  },
  {
    id: 'del-pick-design',
    title: 'Del-Pick: Mobile Delivery & Logistics App',
    description: 'Mobile delivery system designed to overcome logistics problems. Translated high-fidelity Figma UI/UX designs into 20+ polished screens.',
    descriptionId: 'Sistem pengiriman mobile yang dirancang untuk mengatasi masalah logistik. Menerjemahkan desain Figma UI/UX fidelitas tinggi menjadi 20+ layar.',
    image: '/assets/del-pick.webp',
    techStack: ['Figma', 'UI/UX Design', 'Flutter', 'Mobile Design'],
    links: {
      needToKnow: 'https://drive.google.com/file/d/1dFmPBOM7i7SubKeOztS6FWffawnltK2p/view'
    },
    category: 'individual',
    type: 'design',
    slides: ['/assets/del-pick.webp']
  },
  {
    id: 'assets-management',
    title: 'Assets Management System',
    description: 'A comprehensive web design system for asset management platform with focus on user experience and data visualization. Features advanced dashboard analytics and intuitive navigation.',
    descriptionId: 'Sistem desain web komprehensif untuk platform manajemen aset dengan fokus pada pengalaman pengguna dan visualisasi data. Menampilkan analitik dashboard canggih dan navigasi intuitif.',
    image: '/assets/Assets Manajemen Web Design-01.webp',
    techStack: ['Figma', 'Adobe Photoshop'],
    links: {
      prototype: 'https://www.figma.com/proto/N2eNg8UcsUg3Z4oIpwPn4g/Aplikasi-Manajemen-Aset?page-id=0%3A1&node-id=9-356&p=f&viewport=338%2C243%2C0.06&t=RcXQkGz3wJYNThcT-1&scaling=contain&content-scaling=fixed'
    },
    category: 'individual',
    type: 'design',
    slides: [
      '/assets/Assets Manajemen Web Design-01.webp',
      '/assets/Assets Manajemen Web Design-02.webp',
      '/assets/Assets Manajemen Web Design-03.webp',
      '/assets/Assets Manajemen Web Design-04.webp',
      '/assets/Assets Manajemen Web Design-05.webp',
      '/assets/Assets Manajemen Web Design-06.webp',
      '/assets/Assets Manajemen Web Design-07.webp',
      '/assets/Assets Manajemen Web Design-08.webp',
      '/assets/Assets Manajemen Web Design-09.webp',
      '/assets/Assets Manajemen Web Design-10.webp'
    ]
  },
  {
    id: 'campus-website',
    title: 'Campus Portal Design',
    description: 'Modern and accessible campus website design focusing on student experience and information architecture.',
    descriptionId: 'Desain website kampus modern dan accessible yang berfokus pada pengalaman mahasiswa dan arsitektur informasi.',
    image: '/assets/Campuss Website Design-1.webp',
    techStack: ['Figma'],
    links: {
      prototype: 'https://www.figma.com/proto/rileM7AuecCrGEnA0soMd1/RE-DESIGN-WEBSITE-DEL?page-id=0%3A1&node-id=447-121&p=f&viewport=845%2C151%2C0.13&t=gbfdy7gE7yozEW3C-1&scaling=scale-down-width&content-scaling=fixed'
    },
    category: 'individual',
    type: 'design',
    slides: [
      '/assets/Campuss Website Design-1.webp',
      '/assets/Campuss Website Design-2.webp',
      '/assets/Campuss Website Design-3.webp',
      '/assets/Campuss Website Design-4.webp',
      '/assets/Campuss Website Design-5.webp',
      '/assets/Campuss Website Design-6.webp',
      '/assets/Campuss Website Design-7.webp',
      '/assets/Campuss Website Design-8.webp',
      '/assets/Campuss Website Design-9.webp'
    ]
  },
  {
    id: 'gordenaise',
    title: 'Gordenaise E-commerce',
    description: 'Luxury home decor e-commerce platform with emphasis on visual appeal and conversion optimization.',
    descriptionId: 'Platform e-commerce dekorasi rumah mewah dengan penekanan pada daya tarik visual dan optimasi konversi.',
    image: '/assets/Gordenaise Website Design-01.webp',
    techStack: ['Figma', 'Photoshop'],
    links: {
      prototype: 'https://www.figma.com/proto/m63t9o0EJ7aBvG5I09yWVf/Gordenaise?page-id=0%3A1&node-id=34-373&p=f&viewport=89%2C310%2C0.07&t=LJSZaTROUnCZIqfH-1&scaling=scale-down-width&content-scaling=fixed'
    },
    category: 'individual',
    type: 'design',
    slides: [
      '/assets/Gordenaise Website Design-01.webp',
      '/assets/Gordenaise Website Design-02.webp',
      '/assets/Gordenaise Website Design-03.webp',
      '/assets/Gordenaise Website Design-04.webp',
      '/assets/Gordenaise Website Design-05.webp',
      '/assets/Gordenaise Website Design-06.webp',
      '/assets/Gordenaise Website Design-07.webp',
      '/assets/Gordenaise Website Design-08.webp',
      '/assets/Gordenaise Website Design-09.webp',
      '/assets/Gordenaise Website Design-10.webp'
    ]
  }
];

export const groupProjects: Project[] = [
  {
    id: 'del-pick',
    title: 'Del-Pick Delivery App',
    description: 'Mobile delivery system designed to overcome logistics and transportation problems. Led a 3-person team through the entire product lifecycle, from initial concept to a fully functional mobile delivery application. Translated high-fidelity Figma UI/UX designs into 20+ polished and intuitive screens using Flutter. Built and integrated 30+ RESTful APIs with Express.js to power real-time order processing, driver matching, and route optimization.',
    descriptionId: 'Sistem Layanan Antar yang dirancang untuk mengatasi masalah logistik dan transportasi. Memimpin tim 3 orang melalui seluruh siklus produk, dari konsep awal hingga aplikasi pengiriman mobile yang berfungsi penuh.',
    image: '/assets/del-pick.webp',
    techStack: ['Flutter', 'Dart', 'Express.js', 'Node.js', 'JavaScript', 'C++', 'MySQL'],
    links: {
      github: 'https://github.com/yeftaamir/Front-end-Del-Pick',
      needToKnow: 'https://drive.google.com/file/d/1dFmPBOM7i7SubKeOztS6FWffawnltK2p/view?usp=sharing'
    },
    category: 'group',
    type: 'mobile'
  },
  {
    id: 'semat-del',
    title: 'SEMAT DEL',
    description: 'Web-based information platform for IT Del student candidates built with Laravel 9 and MySQL.',
    descriptionId: 'Platform informasi berbasis web untuk calon mahasiswa IT Del yang dibangun dengan Laravel 9 dan MySQL.',
    image: '/assets/spmb.webp',
    techStack: ['Laravel', 'PHP', 'HTML', 'CSS', 'Bootstrap', 'Blade', 'MySQL'],
    links: {
      demo: 'https://semat.del.ac.id/program',
      github: 'https://github.com/gabrielhtg/project-spmb-pabwe'
    },
    category: 'group',
    type: 'web'
  },
  {
    id: 'frk-fed',
    title: 'FRK & FED System',
    description: 'Employee performance management system with work planning and evaluation features built for project management course.',
    descriptionId: 'Sistem manajemen kinerja karyawan dengan fitur perencanaan kerja dan evaluasi yang dibangun untuk mata kuliah manajemen proyek.',
    image: '/assets/frk.webp',
    techStack: ['PHP', 'Laravel', 'HTML', 'CSS', 'Bootstrap', 'Blade', 'MySQL'],
    links: {
      github: 'https://github.com/boysitorus/FrontEnd-FRK'
    },
    category: 'group',
    type: 'web'
  },
  {
    id: 'dentist-expert',
    title: 'Sistem Pakar Diagnosa Penyakit Gigi',
    description: 'Sistem Pakar Diagnosa Penyakit Gigi is a Python program that employs the forward chaining method for accurate assessment.',
    descriptionId: 'Sistem Pakar Diagnosa Penyakit Gigi adalah sebuah program Python yang menggunakan metode forward chaining untuk penilaian yang akurat.',
    image: '/assets/dentist.webp',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Python', 'Bootstrap'],
    links: {
      github: 'https://github.com/Rifqi-HaikalCh/SistemPakarDiagnosaPenyakitGigi'
    },
    category: 'group',
    type: 'web'
  },
  {
    id: 'des-algorithm',
    title: 'DES (Data Encryption Standard) Algorithm System',
    description: 'The DES (Data Encryption Standard) algorithm implemented in Python follows a series of steps to encrypt and decrypt data.',
    descriptionId: 'Algoritma DES (Standar Enkripsi Data) yang diimplementasikan dalam Python mengikuti serangkaian langkah untuk mengenkripsi dan mendekripsi data.',
    image: '/assets/des.webp',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Python', 'Bootstrap'],
    links: {
      github: 'https://github.com/Rifqi-HaikalCh/DES_Algorithm'
    },
    category: 'group',
    type: 'web'
  },
  {
    id: 'clicknic',
    title: 'Clicknik Application',
    description: 'A hospital database that stores a huge data of patient, medication, doctor and diagnoses.',
    descriptionId: 'Database rumah sakit yang menyimpan data pasien, obat, dokter, dan diagnosis dalam jumlah besar.',
    image: '/assets/clicknic.webp',
    techStack: ['Java'],
    links: {
      github: 'https://github.com/archicos/clicknic'
    },
    category: 'group',
    type: 'web'
  }
];

export const certificateCategories: CertificateCategory[] = [
  {
    id: 'dicoding',
    title: 'DICODING Certifications',
    titleId: 'Sertifikasi DICODING',
    icon: 'code',
    count: 4,
    certificates: [
      {
        id: 'dicoding-js',
        title: 'Basic JavaScript Programming',
        titleId: 'Pemrograman Dasar JavaScript',
        description: 'Fundamental JavaScript programming concepts including ES6+, async programming, and best practices.',
        descriptionId: 'Konsep dasar pemrograman JavaScript termasuk ES6+, pemrograman async, dan praktik terbaik.',
        link: '/assets/Belajar Dasar Pemrograman JavaScript.pdf',
        category: 'dicoding'
      },
      {
        id: 'dicoding-web',
        title: 'Basic Web Programming',
        titleId: 'Pemrograman Web Dasar',
        description: 'Foundation of web development covering HTML, CSS, and basic web technologies.',
        descriptionId: 'Dasar-dasar pengembangan web yang mencakup HTML, CSS, dan teknologi web dasar.',
        link: '/assets/Belajar Dasar Pemrograman Web.pdf',
        category: 'dicoding'
      },
      {
        id: 'dicoding-frontend',
        title: 'Fundamental Front-End Web Development',
        titleId: 'Fundamental Pengembangan Web Front-End',
        description: 'Advanced front-end concepts including responsive design, accessibility, and modern CSS techniques.',
        descriptionId: 'Konsep front-end lanjutan termasuk desain responsif, aksesibilitas, dan teknik CSS modern.',
        link: '/assets/Belajar Fundamental Front-End Web Development.pdf',
        category: 'dicoding'
      },
      {
        id: 'dicoding-beginner',
        title: 'Front-End Web for Beginners',
        titleId: 'Web Front-End untuk Pemula',
        description: 'Beginner-friendly introduction to front-end web development with hands-on projects.',
        descriptionId: 'Pengenalan ramah pemula untuk pengembangan web front-end dengan proyek praktis.',
        link: '/assets/Belajar Membuat Front-End Web untuk Pemula.pdf',
        category: 'dicoding'
      }
    ]
  },
  {
    id: 'kegiatan',
    title: 'ACTIVITIES & Competitions',
    titleId: 'KEGIATAN & Kompetisi',
    icon: 'trophy',
    count: 5,
    certificates: [
      {
        id: 'delfest-cert',
        title: 'IT Del Festival 2023',
        titleId: 'IT Del Festival 2023',
        description: 'Active participation in the IT Del Festival 2023 as a member of the Public Relations and Documentation division.',
        descriptionId: 'Partisipasi aktif dalam IT Del Festival 2023 sebagai anggota divisi Hubungan Masyarakat dan Dokumentasi.',
        link: '/assets/IT Del Fest 2023-Rifqi.pdf',
        category: 'kegiatan'
      },
      {
        id: 'ai-cert',
        title: 'AI Certificate',
        titleId: 'Sertifikat AI',
        description: 'Certificate of completion in artificial intelligence.',
        descriptionId: 'Sertifikat penyelesaian kecerdasan buatan.',
        link: '/assets/sertifikat AI.pdf',
        category: 'kegiatan'
      },
      {
        id: 'cyber-cert',
        title: 'Cyber Security Training',
        titleId: 'Pelatihan Keamanan Siber',
        description: 'Certificate of completion in cybersecurity.',
        descriptionId: 'Sertifikat penyelesaian keamanan siber.',
        link: '/assets/Sertifikat Cyber Kulum.webp',
        category: 'kegiatan'
      },
      {
        id: 'pca-cert',
        title: 'PCA Certificate',
        titleId: 'Sertifikat PCA',
        description: 'Certificate of completion in Principal Component Analysis.',
        descriptionId: 'Sertifikat penyelesaian Principal Component Analysis.',
        link: '/assets/SERTIFIKAT PCA RIFQI.pdf',
        category: 'kegiatan'
      },
      {
        id: 'pkm-cert',
        title: 'PKM Competition Certificate',
        titleId: 'Sertifikat Kompetisi PKM',
        description: 'Achievement certificate for participation and accomplishment in the Student Creativity Program (PKM) competition.',
        descriptionId: 'Sertifikat prestasi untuk partisipasi dan pencapaian dalam kompetisi Program Kreativitas Mahasiswa (PKM).',
        link: '/assets/Sertifikat PKM.pdf',
        category: 'kegiatan'
      }
    ]
  },
  {
    id: 'organisasi',
    title: 'ORGANIZATION Leadership',
    titleId: 'Kepemimpinan ORGANISASI',
    icon: 'users',
    count: 2,
    certificates: [
      {
        id: 'bem-leader',
        title: 'BEM Leadership Certificate',
        titleId: 'Sertifikat Kepemimpinan BEM',
        description: 'Leadership certificate for serving as Head of Social Division in the Student Executive Board.',
        descriptionId: 'Sertifikat kepemimpinan untuk menjabat sebagai Kepala Divisi Sosial di Badan Eksekutif Mahasiswa.',
        link: '/assets/Sertifikat BEM - Rifqi Haikal Chairiansyah.pdf',
        category: 'organisasi'
      },
      {
        id: 'gdsc-core',
        title: 'GDSC Core Team Certificate',
        titleId: 'Sertifikat Tim Inti GDSC',
        description: 'Core team member certificate for Google Developer Student Club IT Del, Public Relations division.',
        descriptionId: 'Sertifikat anggota tim inti untuk Google Developer Student Club IT Del, divisi Hubungan Masyarakat.',
        link: '/assets/GDSC - Rifqi Haikal Chairiansyah.pdf',
        category: 'organisasi'
      }
    ]
  },
  {
    id: 'magang',
    title: 'INTERNSHIP Certificates',
    titleId: 'Sertifikat MAGANG',
    icon: 'briefcase',
    count: 2,
    certificates: [
      {
        id: 'msib-cert',
        title: 'MSIB Batch 7 Certificate',
        titleId: 'Sertifikat MSIB Angkatan 7',
        description: 'Official certificate for completing the MSIB (Magang dan Studi Independen Bersertifikat) Batch 7 program.',
        descriptionId: 'Sertifikat resmi untuk menyelesaikan program MSIB (Magang dan Studi Independen Bersertifikat) Angkatan 7.',
        link: '/assets/Sertifikat-MSIB 7 Rifqi Haikal Chairiansyah.pdf',
        category: 'magang'
      },
      {
        id: 'javan-cert',
        title: 'Javan Internship Certificate',
        titleId: 'Sertifikat Magang Javan',
        description: 'Certificate of completion for Angular Programmer internship at PT. Javan Cipta Solusi.',
        descriptionId: 'Sertifikat penyelesaian untuk magang Angular Programmer di PT. Javan Cipta Solusi.',
        link: '/assets/Sertifikat - Rifqi Haikal Chairiansyah.pdf',
        category: 'magang'
      }
    ]
  }
];

export const contactInfo: ContactInfo = {
  email: 'r.haikal1610@gmail.com',
  phone: '+62 853-6278-4585',
  location: 'Jakarta, Indonesia',
  linkedin: 'https://www.linkedin.com/in/rifqhaikall',
  github: 'https://github.com/Rifqi-HaikalCh',
  whatsapp: 'https://wa.me/6285362784585'
};