// function toggleMenu() {
//   const menu = document.querySelector(".menu-links");
//   const icon = document.querySelector(".hamburger-icon");
//   menu.classList.toggle("open");
//   icon.classList.toggle("open");
// }

// function validate() {
//   var name = document.querySelector(".msg-name-emp");
//   var email = document.querySelector(".msg-email-emp");
//   var msg = document.querySelector(".msg-txt-emp");
//   var inputName = document.getElementById("name-input");
//   var inputEmail = document.getElementById("email-input");
//   var inputTxt = document.getElementById("message");

//   if (
//     inputName.value === "" ||
//     inputEmail.value === "" ||
//     inputTxt.value === ""
//   ) {
//     if (inputName.value === "") {
//       name.style.display = "block";
//       name.style.color = "red";
//       setTimeout(() => {
//         name.style.display = "none";
//       }, 2000);
//     }
//     if (inputEmail.value === "") {
//       email.style.display = "block";
//       email.style.color = "red";
//       setTimeout(() => {
//         email.style.display = "none";
//       }, 2000);
//     }
//     if (inputTxt.value === "") {
//       msg.style.display = "block";
//       msg.style.color = "red";
//       setTimeout(() => {
//         msg.style.display = "none";
//       }, 2000);
//     }
//     return false;
//   } else {
//     return true;
//   }
// }

// JavaScript untuk menganimasi dan menampilkan persentase skill bars
document.addEventListener('DOMContentLoaded', function() {
  // Fungsi untuk menganimasikan progress bar saat terlihat di viewport
  const animateProgressBars = () => {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(skill => {
      // Ambil nilai persentase dari width style
      const currentValue = parseFloat(skill.style.width);
      // Konversi ke format yang dapat dibaca manusia
      const humanReadable = (currentValue * 100).toFixed(0);
      
      // Tambahkan teks persentase
      skill.textContent = `${humanReadable}%`;
      
      // Animasikan progress bar
      skill.style.animation = 'progressAnimation 1.5s ease-in-out';
    });
  };
  
  // Fungsi untuk memeriksa apakah elemen terlihat di viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  // Tambahkan listener untuk scroll
  window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('#experience');
    if (skillsSection && isInViewport(skillsSection)) {
      animateProgressBars();
    }
  });
  
  // Jalankan animasi jika section sudah terlihat saat page load
  const skillsSection = document.querySelector('#experience');
  if (skillsSection && isInViewport(skillsSection)) {
    animateProgressBars();
  }
});

// Mobile Menu Toggle
const hamburgerIcon = document.getElementById('hamburger-icon');
const menuLinks = document.getElementById('menu-links');

// Toggle the menu when the hamburger icon is clicked
hamburgerIcon.addEventListener('click', () => {
  menuLinks.classList.toggle('active');
});

// Form Validation
// JavaScript untuk validasi form
function validateForm() {
  // Ambil nilai input
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Cek apakah input kosong (meskipun sudah ada atribut required, ini sebagai backup)
  if (name === '' || email === '' || message === '') {
    alert('Please fill in all fields');
    return false;
  }
  
  // Validasi email dengan regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return false;
  }
  
  // Jika semua validasi berhasil, bisa menambahkan logika untuk mengirim form
  // Misalnya dengan menggunakan fetch API atau service seperti EmailJS, FormSubmit, dll.
  
  // Untuk contoh ini, kita hanya tampilkan alert berhasil
  alert('Thank you for your message! I will get back to you soon.');
  
  // Reset form setelah berhasil submit
  document.getElementById('contact-form').reset();
  
  // Mencegah form melakukan default submit
  return false;
}
// const contactForm = document.getElementById('contact-form');
// const nameInput = document.getElementById('name-input');
// const emailInput = document.getElementById('email-input');
// const messageInput = document.getElementById('message');

// const nameError = document.getElementById('empty-name-error');
// const emailError = document.getElementById('empty-email-error');
// const messageError = document.getElementById('empty-message-error');

// contactForm.addEventListener('submit', (e) => {
//   let valid = true;

//   // Validate name
//   if (nameInput.value.trim() === "") {
//     nameError.style.display = "inline-block";
//     valid = false;
//   } else {
//     nameError.style.display = "none";
//   }

//   // Validate email
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(emailInput.value.trim())) {
//     emailError.style.display = "inline-block";
//     valid = false;
//   } else {
//     emailError.style.display = "none";
//   }

//   // Validate message
//   if (messageInput.value.trim() === "") {
//     messageError.style.display = "inline-block";
//     valid = false;
//   } else {
//     messageError.style.display = "none";
//   }

//   // Prevent form submission if not valid
//   if (!valid) {
//     e.preventDefault();
//   }
// });
