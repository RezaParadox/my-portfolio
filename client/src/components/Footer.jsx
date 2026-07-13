import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className='relative z-10 px-4 sm:px-6 lg:px-8 pb-8 pt-4'>
      <div
        className='max-w-6xl mx-auto rounded-3xl overflow-hidden'
        style={{
          background: '#0d0d1a',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.2), 0 0 80px rgba(168, 85, 247, 0.08)',
        }}
      >
        <div className='p-8 sm:p-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-12'>
            {/* Left Side */}
            <div>
              <h3 className='text-2xl font-bold text-white mb-3'>PORTFOLIO</h3>
              <p className='text-gray-400 text-sm mb-6 max-w-xs'>
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
                    className='w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300'
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Link Columns */}
            <div className='grid grid-cols-3 gap-8'>
              <div>
                <h4 className='text-white font-semibold mb-4'>Navigation</h4>
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
                          className='text-gray-400 text-sm hover:text-purple-400 transition-colors'
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          to={link.to}
                          className='text-gray-400 text-sm hover:text-purple-400 transition-colors'
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className='text-white font-semibold mb-4'>Skills</h4>
                <ul className='space-y-2.5'>
                  {['Frontend', 'Backend', 'Full Stack'].map((item, i) => (
                    <li key={i}>
                      <span className='text-gray-400 text-sm'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className='text-white font-semibold mb-4'>Social</h4>
                <ul className='space-y-2.5'>
                  {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((item, i) => (
                    <li key={i}>
                      <span className='text-gray-400 text-sm'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='w-full h-px bg-white/10 mb-8' />

          {/* Big Text */}
          <div className='text-center overflow-hidden'>
            <h1
              className='text-6xl sm:text-8xl md:text-9xl font-black uppercase select-none'
              style={{
                background: 'linear-gradient(180deg, rgba(168,85,247,0.5) 0%, rgba(168,85,247,0.15) 100%)',
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
