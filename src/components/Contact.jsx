import { useState } from 'react';
import { profile } from '../data/profile';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import Reveal from './Reveal';
import Ripple from './Ripple';
import SectionHeading from './SectionHeading';
import { CheckCircleIcon, CopyIcon, LocationIcon, MailIcon } from './icons';

const emptyForm = { name: '', email: '', subject: '', message: '' };

// Material 3 outlined text field: the label sits inside the field and floats up on focus or when filled.
const Field = ({ id, label, multiline, ...props }) => {
  const Control = multiline ? 'textarea' : 'input';
  return (
    <div className="relative">
      <Control
        id={id}
        name={id}
        required
        placeholder=" "
        className={`peer w-full px-4 pt-5 pb-2 rounded-2xl bg-transparent border border-outline text-on-surface outline-none transition-colors focus:border-primary focus:border-2 ${
          multiline ? 'resize-none min-h-[140px]' : 'h-14'
        }`}
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-4 px-1 text-on-surface-variant transition-all duration-200 origin-left
          peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-surface-container
          peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-surface-container"
      >
        {label}
      </label>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState('idle');
  const [emailCopied, copyEmail] = useCopyToClipboard(profile.email, {
    label: 'Email',
    onError: () => {
      window.location.href = `mailto:${profile.email}`;
    },
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Honeypot: real users never see or fill this field, so a value means a bot.
    if (e.target.botcheck.checked) return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          from_name: 'Portfolio contact form',
          ...formData,
          subject: `[Portfolio] ${formData.subject}`,
          replyto: formData.email,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);
      setStatus('success');
      setFormData(emptyForm);
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-surface-low">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 grid lg:grid-cols-[1fr_1.15fr] gap-12 items-start">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's build something">
            Mobile architecture, BFF design, a side project idea or just a good tech conversation. My inbox is open.
          </SectionHeading>
          <Reveal delay={100} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 p-2 pr-3 rounded-3xl bg-surface-card">
              <a
                href={`mailto:${profile.email}`}
                className="group flex-1 min-w-0 flex items-center gap-4 p-2 rounded-2xl hover:bg-primary-container/60 transition-colors"
              >
                <span className="grid place-items-center w-12 h-12 flex-shrink-0 rounded-2xl bg-primary text-on-primary transition-transform group-hover:scale-110">
                  <MailIcon className="w-6 h-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-on-surface-variant">Email</span>
                  <span className="block font-semibold break-all">{profile.email}</span>
                </span>
              </a>
              <Ripple
                type="button"
                onClick={copyEmail}
                aria-label={emailCopied ? 'Email copied' : 'Copy email address'}
                title="Copy email"
                className="grid place-items-center w-11 h-11 flex-shrink-0 rounded-full text-on-surface-variant hover:bg-surface-high hover:text-primary transition-colors"
              >
                <span key={String(emailCopied)} className="animate-fadeIn">
                  {emailCopied ? <CheckCircleIcon className="w-5 h-5 text-primary" /> : <CopyIcon className="w-5 h-5" />}
                </span>
              </Ripple>
            </div>
            <p aria-live="polite" className="sr-only">
              {emailCopied ? 'Email address copied to clipboard' : ''}
            </p>
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-surface-card">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container">
                <LocationIcon className="w-6 h-6" />
              </span>
              <span>
                <span className="block text-sm text-on-surface-variant">Location</span>
                <span className="block font-semibold">{profile.location}</span>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="p-6 sm:p-8 rounded-5xl bg-surface-container">
          <form name="contact" onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="name" label="Name" type="text" value={formData.name} onChange={handleChange} />
              <Field id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <Field id="subject" label="Subject" type="text" value={formData.subject} onChange={handleChange} />
            <Field id="message" label="Message" multiline rows={5} value={formData.message} onChange={handleChange} />

            <Ripple
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center justify-center gap-2 min-h-[56px] rounded-full bg-primary text-on-primary font-semibold text-lg hover:shadow-lg transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'success' ? (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  Message sent!
                </>
              ) : (
                <>
                  <MailIcon className="w-5 h-5" />
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </>
              )}
            </Ripple>
            {status === 'error' && (
              <p role="alert" className="text-sm text-error">
                Something went wrong. Please email me directly at {profile.email}.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
