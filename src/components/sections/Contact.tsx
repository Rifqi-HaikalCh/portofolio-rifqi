import { useLanguage } from '../../context/LanguageContext';
import { contactInfo } from '../../data/portfolio';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Open Gmail compose
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email}&su=${encodeURIComponent(
      subject as string
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.open(gmailUrl, '_blank');
    alert(t('Gmail will open in a new tab. Thank you for your message!', 'Gmail akan terbuka di tab baru. Terima kasih atas pesan Anda!'));
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("Get In Touch", "Hubungi Saya")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            {t(
              "Have a project in mind? Let's discuss how we can work together to bring your ideas to life.",
              "Punya projek dalam pikiran? Mari diskusikan bagaimana kita bisa bekerja sama untuk mewujudkan ide Anda."
            )}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg" data-aos="zoom-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-900 dark:text-white font-medium mb-2 text-sm sm:text-base">
                  {t("Full Name", "Nama Lengkap")}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-900 dark:text-white font-medium mb-2 text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 dark:text-white font-medium mb-2 text-sm sm:text-base">
                {t("Subject", "Subjek")}
              </label>
              <input
                type="text"
                name="subject"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-dark dark:text-white focus:border-primary-green focus:outline-none transition-colors"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-900 dark:text-white font-medium mb-2 text-sm sm:text-base">
                {t("Message", "Pesan")}
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors resize-none text-sm sm:text-base"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                <Send size={16} className="sm:w-5 sm:h-5" />
                {t("Send Message", "Kirim Pesan")}
              </button>
            </div>
          </form>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 sm:mt-12">
            <div data-aos="fade-up" data-aos-delay="100" className="bg-white dark:bg-gray-700 rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 mx-auto mb-3" />
              <h5 className="font-semibold text-text-dark dark:text-white mb-1">
                {t("Email Me", "Email Saya")}
              </h5>
              <p className="text-text-light dark:text-gray-400 text-sm">{contactInfo.email}</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200" className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-custom hover:shadow-custom-hover hover:-translate-y-1 transition-all duration-300">
              <Phone className="w-12 h-12 text-primary-green mx-auto mb-3" />
              <h5 className="font-semibold text-text-dark dark:text-white mb-1">
                {t("Call Me", "Telepon Saya")}
              </h5>
              <p className="text-text-light dark:text-gray-400 text-sm">{contactInfo.phone}</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300" className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-custom hover:shadow-custom-hover hover:-translate-y-1 transition-all duration-300">
              <MapPin className="w-12 h-12 text-primary-green mx-auto mb-3" />
              <h5 className="font-semibold text-text-dark dark:text-white mb-1">
                {t("Location", "Lokasi")}
              </h5>
              <p className="text-text-light dark:text-gray-400 text-sm">{contactInfo.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};