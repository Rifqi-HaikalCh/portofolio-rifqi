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
  { href: '#gallery', labelEn: 'Gallery', labelId: 'Galeri' },
  { href: '#certificates', labelEn: 'Certificates', labelId: 'Sertifikat' },
  { href: '#contact', labelEn: 'Contact', labelId: 'Kontak' },
];

export const typingTexts = {
  en: ['Web Developer', 'Mobile App Developer', 'UI/UX Designer'],
  id: ['Pengembang Web', 'Pengembang Aplikasi Mobile', 'Perancang UI/UX']
};

export const aboutHighlights: AboutHighlight[] = [
  {
    icon: 'graduation-cap',
    title: 'Education Excellence',
    titleId: 'Keunggulan Pendidikan',
    description: 'Bachelors of Informatics at Del Institute of Technology',
    descriptionId: 'Sarjana Informatika di Institut Teknologi Del'
  },
  {
    icon: 'briefcase',
    title: 'Industry Experience',
    titleId: 'Pengalaman Industri',
    description: 'Internships at PT. Javan Cipta Solusi & FIFGROUP',
    descriptionId: 'Magang di PT. Javan Cipta Solusi & FIFGROUP'
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
    title: 'Freelance UI/UX & Web Developer',
    titleId: 'Freelance UI/UX & Web Developer',
    description: 'Has 2 years of experience as a freelancer',
    descriptionId: 'Memiliki 2 tahun pengalaman sebagai freelancer'
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

export const workExperience: Experience[] = [
  {
    id: 'javan',
    title: 'Angular Developer Intern (IT Consulting Company)',
    titleId: 'Magang Angular Developer',
    company: 'PT. Javan Cipta Solusi',
    period: 'Sep 2024 - Jan 2025',
    location: 'Yogyakarta, Indonesia',
    description: 'Demonstrated strong expertise as an Angular Programmer Intern by successfully implementing full CRUD operations and integrating multiple APIs.',
    descriptionId: 'Menunjukkan keahlian yang kuat sebagai Magang Angular Developer dengan berhasil mengimplementasikan operasi CRUD lengkap dan mengintegrasikan beberapa API.',
    techStack: ['Angular', 'Spring Boot', 'Express.js', 'React.js', 'Vue.js'],
    type: 'work',
    image: '/assets/javan.webp'
  },
  {
    id: 'fif',
    title: 'Fullstack Developer Intern (Multi-Finance Company)',
    titleId: 'Magang Angular Developer',
    company: 'PT. Federal International Finance',
    period: 'Jun 2024 - Aug 2024',
    location: 'Jakarta Selatan, Indonesia',
    description: 'Gained hands-on experience in full-stack development, utilizing Java Spring Boot for robust back-end services and mastering effective API management.',
    descriptionId: 'Memperoleh pengalaman langsung dalam pengembangan full-stack, menggunakan Java Spring Boot untuk layanan back-end yang kuat dan menguasai manajemen API yang efektif.',
    techStack: ['Angular', 'Spring Boot', 'Swagger', 'MySQL'],
    type: 'work',
    image: '/assets/fif.webp'
  }
];

export const organizationExperience: Experience[] = [
  {
    id: 'gdsc',
    title: 'Public Relations - Core Team',
    titleId: 'Hubungan Masyarakat - Tim Inti',
    company: 'Google Developer Student Club IT Del',
    period: 'Oct 2023 - Dec 2024',
    description: 'Played a key role in executing strategic public relations plans and served as Master of Ceremonies during key club events.',
    descriptionId: 'Berperan kunci dalam menjalankan rencana hubungan masyarakat strategis dan menjabat sebagai Master of Ceremonies selama acara klub utama.',
    type: 'organization',
    image: '/assets/gdsc.webp'
  },
  {
    id: 'bem',
    title: 'Head of Social Division',
    titleId: 'Kepala Divisi Sosial',
    company: 'Student Executive Board - IT Del',
    period: 'Aug 2023 - Sep 2024',
    description: 'Successfully managed various off-campus activities and drove division\'s public relations efforts through strategic social media management.',
    descriptionId: 'Berhasil mengelola berbagai kegiatan luar kampus dan mendorong upaya hubungan masyarakat divisi melalui manajemen media sosial strategis.',
    type: 'organization',
    image: '/assets/dhpm.webp'
  },
  {
    id: 'delfest',
    title: 'IT Del Festival',
    company: 'Public Relations and Documentation Division - Member',
    period: 'Aug 2023',
    description: 'Actively participated as a member of the Public Relations and Documentation division, handling essential documentation tasks to capture and promote key moments of the festival.',
    descriptionId: 'Berpartisipasi aktif sebagai anggota divisi Hubungan Masyarakat dan Dokumentasi, menangani tugas-tugas dokumentasi penting untuk mengabadikan dan mempromosikan momen-momen penting dalam festival.',
    type: 'organization',
    image: '/assets/delfest.webp'
  }
];

export const individualProjects: Project[] = [
    {
    id: 'marketplace-influencer',
    title: 'Marketplace Influencer Platform',
    description: 'Simplifies influencer discovery and collaboration for brands. Engineered a full-stack marketplace from scratch using a modern tech stack (Next.js 14, TypeScript, Supabase) to connect brands with influencers. Designed and implemented a pixel-perfect, responsive UI/UX with Tailwind CSS, featuring separate, optimized views for desktop and mobile to ensure a seamless user journey.',
    descriptionId: 'Menyederhanakan penemuan influencer dan kolaborasi untuk brand. Platform marketplace full-stack yang dibangun dari awal menggunakan tech stack modern untuk menghubungkan brand dengan influencer.',
    image: '/assets/marketplaceweb.webp',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'RBAC'],
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
    descriptionId: 'Platform hiring modern yang memungkinkan administrator mengelola lowongan pekerjaan dan kandidat untuk menelusuri/melamar. Sistem otentikasi aman dengan kontrol akses berbasis peran.',
    image: '/assets/Hiring Platform web.webp',
    techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'React Hook Form', 'Zustand'],
    links: {
      demo: 'https://hiring-platform-woad.vercel.app',
      needToKnow: 'https://drive.google.com/file/d/1sDZJJzx59VfwPaw2Y7J-hss0yh88rDyj/view'
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
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Local Storage'],
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
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'DOM Manipulation', 'Event Handling'],
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
    techStack: ['Angular', 'Spring Boot', 'Java', 'TypeScript', 'Tailwind CSS'],
    links: {
      demo: 'https://api-central.netlify.app/',
      github: 'https://github.com/Rifqi-HaikalCh/apicentral-frontend'
    },
    category: 'individual'
  },
  {
    id: 'employee-management',
    title: 'Employee Management System',
    description: 'Comprehensive employee management application with CRUD functionality and role-based access control.',
    descriptionId: 'Aplikasi manajemen karyawan yang komprehensif dengan fungsi CRUD dan kontrol akses berbasis peran.',
    image: '/assets/employee.webp',
    techStack: ['Angular', 'Spring Boot', 'JWT', 'MySQL', 'Bootstrap'],
    links: {
      demo: 'https://employee-web.netlify.app/',
      github: 'https://github.com/Rifqi-HaikalCh/employee-frontend'
    },
    category: 'individual'
  },
  {
    id: 'notes-app',
    title: 'Notes Web Application',
    description: 'Responsive single-page note-taking application built with vanilla JavaScript and Web Components API.',
    descriptionId: 'Aplikasi pencatat responsif satu halaman yang dibangun dengan vanilla JavaScript dan Web Components API.',
    image: '/assets/notes.webp',
    techStack: ['JavaScript', 'Web Components', 'CSS Grid', 'Flexbox', 'HTML5'],
    links: {
      demo: 'https://notes-rifqi.netlify.app/',
      github: 'https://github.com/Rifqi-HaikalCh/notes-app'
    },
    category: 'individual'
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
    category: 'individual'
  }
];

export const groupProjects: Project[] = [
  {
    id: 'del-pick',
    title: 'Del-Pick Delivery App',
    description: 'Mobile delivery system designed to overcome logistics and transportation problems. Led a 3-person team through the entire product lifecycle, from initial concept to a fully functional mobile delivery application. Translated high-fidelity Figma UI/UX designs into 20+ polished and intuitive screens using Flutter. Built and integrated 30+ RESTful APIs with Express.js to power real-time order processing, driver matching, and route optimization.',
    descriptionId: 'Sistem Layanan Antar yang dirancang untuk mengatasi masalah logistik dan transportasi. Memimpin tim 3 orang melalui seluruh siklus produk, dari konsep awal hingga aplikasi pengiriman mobile yang berfungsi penuh.',
    image: '/assets/del-pick.webp',
    techStack: ['Flutter', 'Express.js', 'Dart', 'JavaScript', 'C++', 'MySQL'],
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
    techStack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap'],
    links: {
      demo: 'https://semat.del.ac.id/program',
      github: 'https://github.com/gabrielhtg/project-spmb-pabwe'
    },
    category: 'group'
  },
  {
    id: 'frk-fed',
    title: 'FRK & FED System',
    description: 'Employee performance management system with work planning and evaluation features built for project management course.',
    descriptionId: 'Sistem manajemen kinerja karyawan dengan fitur perencanaan kerja dan evaluasi yang dibangun untuk mata kuliah manajemen proyek.',
    image: '/assets/frk.webp',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'Blade'],
    links: {
      github: 'https://github.com/boysitorus/FrontEnd-FRK'
    },
    category: 'group'
  },
  {
    id: 'dentist-expert',
    title: 'Sistem Pakar Diagnosa Penyakit Gigi',
    description: 'Sistem Pakar Diagnosa Penyakit Gigi is a Python program that employs the forward chaining method for accurate assessment.',
    descriptionId: 'Sistem Pakar Diagnosa Penyakit Gigi adalah sebuah program Python yang menggunakan metode forward chaining untuk penilaian yang akurat.',
    image: '/assets/dentist.webp',
    techStack: ['HTML', 'Python', 'Bootstrap', 'JavaScript'],
    links: {
      github: 'https://github.com/Rifqi-HaikalCh/SistemPakarDiagnosaPenyakitGigi'
    },
    category: 'group'
  },
  {
    id: 'des-algorithm',
    title: 'DES (Data Encryption Standard) Algorithm System',
    description: 'The DES (Data Encryption Standard) algorithm implemented in Python follows a series of steps to encrypt and decrypt data.',
    descriptionId: 'Algoritma DES (Standar Enkripsi Data) yang diimplementasikan dalam Python mengikuti serangkaian langkah untuk mengenkripsi dan mendekripsi data.',
    image: '/assets/des.webp',
    techStack: ['HTML', 'Python', 'Bootstrap', 'JavaScript'],
    links: {
      github: 'https://github.com/Rifqi-HaikalCh/DES_Algorithm'
    },
    category: 'group'
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
    category: 'group'
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
        description: 'Certification in artificial intelligence fundamentals and applications in modern technology.',
        descriptionId: 'Sertifikasi dalam dasar-dasar kecerdasan buatan dan aplikasinya dalam teknologi modern.',
        link: '/assets/sertifikat AI.pdf',
        category: 'kegiatan'
      },
      {
        id: 'cyber-cert',
        title: 'Cyber Security Training',
        titleId: 'Pelatihan Keamanan Siber',
        description: 'Comprehensive training in cybersecurity principles, threats, and protection strategies.',
        descriptionId: 'Pelatihan komprehensif dalam prinsip keamanan siber, ancaman, dan strategi perlindungan.',
        link: '/assets/Sertifikat Cyber Kulum.webp',
        category: 'kegiatan'
      },
      {
        id: 'pca-cert',
        title: 'PCA Certificate',
        titleId: 'Sertifikat PCA',
        description: 'Professional certification in Principal Component Analysis and data dimensionality reduction techniques.',
        descriptionId: 'Sertifikasi profesional dalam Principal Component Analysis dan teknik reduksi dimensionalitas data.',
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
    count: 3,
    certificates: [
      {
        id: 'bem-member',
        title: 'BEM Member Certificate',
        titleId: 'Sertifikat Anggota BEM',
        description: 'Official membership certificate for participation in the Student Executive Board (BEM) activities.',
        descriptionId: 'Sertifikat keanggotaan resmi untuk partisipasi dalam kegiatan Badan Eksekutif Mahasiswa (BEM).',
        link: '/assets/Sertifikat BEM - Anggota.webp',
        category: 'organisasi'
      },
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
    count: 3,
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
        id: 'internship-letter',
        title: 'Internship Completion Letter',
        titleId: 'Surat Keterangan Magang',
        description: 'Official internship completion letter documenting successful completion of programming internship program.',
        descriptionId: 'Surat keterangan magang resmi yang mendokumentasikan penyelesaian program magang programming dengan sukses.',
        link: '/assets/Surat Keterangan Magang Rifqi Haikal.pdf',
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
  whatsapp: 'https://wa.me/085362784585'
};