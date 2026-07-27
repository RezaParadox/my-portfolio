import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  return (
    <div className='flex gap-2'>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-lg transition-colors ${
          i18n.language === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400'
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('fa')}
        className={`px-3 py-1 rounded-lg transition-colors ${
          i18n.language === 'fa'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400'
        }`}
      >
        فارسی
      </button>
    </div>
  );
};

export default LanguageSwitcher;
