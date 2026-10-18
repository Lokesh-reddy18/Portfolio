import { useState } from 'react';
import { profile } from '../data/profile';
import { CheckCircleIcon, LocationIcon, MailIcon } from './icons';

const emptyForm = { name: '', email: '', subject: '', message: '' };

const inputClass =
  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100';
const labelClass = 'block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300';

const Field = ({ id, label, ...props }) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      {label}
    </label>
    {props.rows ? (
      <textarea id={id} name={id} required className={`${inputClass} resize-none`} {...props} />
    ) : (
      <input id={id} name={id} required className={inputClass} {...props} />
    )}
  </div>
);

const ContactItem = ({ icon, gradient, title, children }) => (
  <div className="flex items-center space-x-4">
    <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center text-white`}>
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
      {children}
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Netlify Forms: the POST must be url-encoded and include `form-name` matching the
  // hidden static form in index.html, which is what Netlify detects at build time.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...formData }).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      setFormData(emptyForm);
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 transition-colors duration-300 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent from-gray-900 to-blue-800 dark:from-gray-100 dark:to-blue-200">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Happy to chat about Android, backend, or interesting projects
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Let&apos;s Connect</h3>
                <p className="leading-relaxed mb-8 text-gray-600 dark:text-gray-300">
                  Whether it&apos;s mobile architecture, backend design, a side project idea, or just a good tech
                  conversation, drop me a message and I&apos;ll get back to you.
                </p>
              </div>

              <div className="space-y-6">
                <ContactItem icon={<MailIcon />} gradient="from-blue-500 to-purple-500" title="Email">
                  <a
                    href={`mailto:${profile.email}`}
                    className="transition-colors duration-300 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    {profile.email}
                  </a>
                </ContactItem>
                <ContactItem icon={<LocationIcon />} gradient="from-orange-500 to-red-500" title="Location">
                  <span className="text-gray-600 dark:text-gray-300">{profile.location}</span>
                </ContactItem>
              </div>
            </div>

            <div className="rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-900">
              <form name="contact" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="name" label="Name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                  <Field id="email" label="Email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                </div>
                <Field id="subject" label="Subject" type="text" placeholder="What's this about?" value={formData.subject} onChange={handleChange} />
                <Field
                  id="message"
                  label="Message"
                  rows={4}
                  placeholder="Tell me about your project or just say hello!"
                  value={formData.message}
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {status === 'success' ? (
                    <>
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <MailIcon className="w-5 h-5 mr-2" />
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </>
                  )}
                </button>
                {status === 'error' && (
                  <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                    Something went wrong. Please email me directly at {profile.email}.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
