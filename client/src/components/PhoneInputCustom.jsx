import React from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";

// We use the standard 'en' labels as a fallback to prevent the 'ZZ' error
const CountrySelect = ({ value, onChange, labels = en, ...rest }) => {
  return (
    <div className='relative flex items-center bg-transparent px-3 border-r border-border'>
      {/* This is the invisible native select that handles the logic */}
      <select
        {...rest}
        value={value}
        onChange={(event) => onChange(event.target.value || undefined)}
        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
      >
        <option value=''>{labels.ZZ}</option>
        {getCountries().map((country) => (
          <option key={country} value={country}>
            {labels[country]} +{getCountryCallingCode(country)}
          </option>
        ))}
      </select>

      {/* This is the visible part that looks like your image */}
      <div className='flex items-center gap-2 pointer-events-none'>
        {value ? (
          <img
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value}.svg`}
            alt={value}
            className='w-5 h-3.5 rounded-sm object-cover'
          />
        ) : (
          <span className='text-xs text-muted-foreground'>?</span>
        )}
        <span className='text-xs text-muted-foreground opacity-50'>▼</span>
      </div>
    </div>
  );
};

export default CountrySelect;
