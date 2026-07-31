import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English", short: "EN" },
  { code: "fa", label: "Persian", short: "FA" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLanguage =
    languages.find((language) => language.code === i18n.language) ??
    languages[0];

  return (
    <div className='relative ' ref={menuRef}>
      <Button
        type='button'
        variant='outline'
        size='sm'
        onClick={() => setOpen((current) => !current)}
        className='h-9 rounded-full border border-border/70 bg-background/80 px-3 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm hover:bg-muted/80'
        aria-haspopup='menu'
        aria-expanded={open}
      >
        <span className='flex items-center gap-2'>
          <span className='flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground'>
            <Globe className='h-3.5 w-3.5' />
          </span>
          <span>{activeLanguage.short}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {open && (
        <div className='absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border/70 bg-popover text-popover-foreground shadow-lg backdrop-blur-xl'>
          {languages.map((language) => {
            const selected = language.code === i18n.language;

            return (
              <button
                key={language.code}
                type='button'
                onClick={() => changeLanguage(language.code)}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors ${
                  selected ? "bg-muted/70 text-foreground" : "hover:bg-muted/60"
                }`}
              >
                <span>{language.label}</span>
                {selected && <Check className='h-4 w-4 text-primary' />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
