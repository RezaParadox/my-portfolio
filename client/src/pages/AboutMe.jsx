import { useTranslation } from "react-i18next";
import { FiUser, FiMail, FiMapPin, FiCalendar } from "react-icons/fi";

const About = () => {
  const { t } = useTranslation();

  const personalInfo = [
    {
      icon: <FiUser />,
      label: t("about.info_name"),
      value: t("about.info_value_name"),
    },
    {
      icon: <FiMail />,
      label: t("about.info_email"),
      value: "reza.paradox@example.com",
      isLink: true,
    },
    { icon: <FiCalendar />, label: t("about.info_age"), value: "24 Years" },
    {
      icon: <FiMapPin />,
      label: t("about.info_location"),
      value: t("about.info_value_location"),
    },
  ];

  return (
    <section id='about' className='py-20 px-4'>
      <div className='container mx-auto max-w-5xl'>
        <h2 className='text-4xl font-bold mb-10 text-center'>
          {t("about.title")}
        </h2>

        <div className='grid md:grid-cols-3 gap-8'>
          {/* Left Side: Bio Text */}
          <div className='md:col-span-2 glass3d p-8 rounded-3xl'>
            <h3 className='text-2xl font-semibold mb-4 text-purple-400'>
              Who am I?
            </h3>
            <p className='text-gray-300 leading-relaxed text-lg'>
              {t("about.description")}
            </p>
            <div className='mt-6'>
              <a
                href='/My-CV.pdf'
                download
                className='inline-flex px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-all'
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Right Side: Resume Info Card */}
          <div className='glass3d p-8 rounded-3xl flex flex-col gap-6'>
            {personalInfo.map((item, index) => (
              <div key={index} className='flex items-start gap-4'>
                <div className='p-3 bg-white/5 rounded-xl text-purple-400'>
                  {item.icon}
                </div>
                <div>
                  <p className='text-xs text-gray-400 uppercase tracking-wider'>
                    {item.label}
                  </p>
                  {item.isLink ? (
                    <a
                      href={`mailto:${item.value}`}
                      className='text-sm font-medium hover:text-purple-400 transition-colors'
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className='text-sm font-medium text-white'>
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
