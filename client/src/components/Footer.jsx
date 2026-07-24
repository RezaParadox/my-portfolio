import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className='relative z-10 px-4 sm:px-6 lg:px-8 pb-8 pt-4'>
      <div
        className='max-w-6xl mx-auto rounded-3xl overflow-hidden transition-colors duration-300'
        style={{
          background: 'var(--footer-bg)',
          border: '1px solid var(--footer-border)',
          boxShadow: 'var(--footer-shadow)',
        }}
      >
        <div className='p-8 sm:p-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-12'>
            {/* Left Side */}
            <div>
              <h3 className='text-2xl font-bold mb-3' style={{ color: 'var(--footer-title)' }}>PORTFOLIO</h3>
              <p className='text-sm mb-6 max-w-xs' style={{ color: 'var(--footer-text)' }}>
                Building modern web applications with cutting-edge technologies. Let's create something amazing together.
              </p>
              <div className='flex items-center gap-3'>
                {[
                  { icon: FiGithub, href: 'https://github.com' },
                  { icon: FiLinkedin, href: 'https://linkedin.com' },
                  { icon: FiTwitter, href: 'https://twitter.com' },
                  { icon: FiInstagram, href: 'https://instagram.com' },
                  { icon: FiMail, href: 'mailto:hello@example.com' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300'
                    style={{
                      background: 'var(--footer-social-bg)',
                      border: '1px solid var(--footer-social-border)',
                      color: 'var(--footer-social-text)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.background = 'rgba(var(--primary), 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--footer-social-text)';
                      e.currentTarget.style.borderColor = 'var(--footer-social-border)';
                      e.currentTarget.style.background = 'var(--footer-social-bg)';
                    }}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Link Columns */}
            <div className='grid grid-cols-3 gap-8'>
              <div>
                <h4 className='font-semibold mb-4' style={{ color: 'var(--footer-heading)' }}>Navigation</h4>
                <ul className='space-y-2.5'>
                  {[
                    { label: 'About Me', to: '/', hash: '#about' },
                    { label: 'Projects', to: '/', hash: '#projects' },
                    { label: 'Contact Me', to: '/contact' },
                  ].map((link, i) => (
                    <li key={i}>
                      {link.hash ? (
                        <Link
                          to={link.to}
                          className='text-sm hover:text-[var(--primary)] transition-colors'
                          style={{ color: 'var(--footer-text)' }}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          to={link.to}
                          className='text-sm hover:text-[var(--primary)] transition-colors'
                          style={{ color: 'var(--footer-text)' }}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className='font-semibold mb-4' style={{ color: 'var(--footer-heading)' }}>Skills</h4>
                <ul className='space-y-2.5'>
                  {['Frontend', 'Backend', 'Full Stack'].map((item, i) => (
                    <li key={i}>
                      <span className='text-sm' style={{ color: 'var(--footer-text)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className='font-semibold mb-4' style={{ color: 'var(--footer-heading)' }}>Social</h4>
                <ul className='space-y-2.5'>
                  {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((item, i) => (
                    <li key={i}>
                      <span className='text-sm' style={{ color: 'var(--footer-text)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='w-full h-px mb-8' style={{ background: 'var(--footer-divider)' }} />

          {/* Big Text */}
          <div className='text-center overflow-hidden'>
            <h1
              className='text-6xl sm:text-8xl md:text-9xl font-black uppercase select-none'
              style={{
                background: 'linear-gradient(180deg, var(--footer-big-text) 0%, transparent 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                filter: 'blur(0.5px)',
              }}
            >
              RH PARADOX
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
