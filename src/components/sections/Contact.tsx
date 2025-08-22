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
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-white mb-4">
            {t("Get In Touch", "Hubungi Saya")}
          </h2>
          <p className="text-text-light dark:text-gray-400 max-w-2xl mx-auto">
            {t(
              "Have a project in mind? Let's discuss how we can work together to bring your ideas to life.",
              "Punya projek dalam pikiran? Mari diskusikan bagaimana kita bisa bekerja sama untuk mewujudkan ide Anda."
            )}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-bg-light dark:bg-gray-700 rounded-2xl p-8 shadow-custom" data-aos="zoom-in">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-text-dark dark:text-white font-medium mb-2">
                  {t("Full Name", "Nama Lengkap")}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-dark dark:text-white focus:border-primary-green focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-text-dark dark:text-white font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-dark dark:text-white focus:border-primary-green focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-text-dark dark:text-white font-medium mb-2">
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
              <label className="block text-text-dark dark:text-white font-medium mb-2">
                {t("Message", "Pesan")}
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-dark dark:text-white focus:border-primary-green focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-primary text-white rounded-full font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-custom-hover inline-flex items-center gap-2"
              >
                <Send size={20} />
                {t("Send Message", "Kirim Pesan")}
              </button>
            </div>
          </form>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <div data-aos="fade-up" data-aos-delay="100" className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-custom hover:shadow-custom-hover hover:-translate-y-1 transition-all duration-300">
              <Mail className="w-12 h-12 text-primary-green mx-auto mb-3" />
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