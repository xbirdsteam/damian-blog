"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import CountryList from 'country-list-with-dial-code-and-flag';
import { cn } from "@/lib/utils";

interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function PhoneInput({
  value = "",
  onChange,
  defaultCountry = "IT",
  name,
  id,
  placeholder = "Enter phone number",
  disabled,
  className
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    CountryList.findOneByCountryCode(defaultCountry) || CountryList.getAll()[0]
  );

  const phoneNumber = value.replace(selectedCountry.dial_code, "");

  const handleCountryChange = (code: string) => {
    const newCountry = CountryList.findOneByCountryCode(code);
    if (newCountry) {
      setSelectedCountry(newCountry);
      onChange(newCountry.dial_code + phoneNumber);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/[^0-9]/g, "");
    onChange(selectedCountry.dial_code + newNumber);
  };

  const uniqueCountries = Array.from(
    new Map(
      CountryList.getAll()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(country => [`${country.code}-${country.dial_code}`, country])
    ).values()
  );

  return (
    <div 
      className={cn(
        "group relative flex h-[50px] w-full rounded-[4px] border border-neutral-border bg-white",
        "hover:border-neutral-text-disable focus-within:border-neutral-primary-text",
        disabled && "bg-neutral-background cursor-not-allowed",
        className
      )}
    >
      <div className="flex h-full items-center border-r border-neutral-border">
        <Select
          value={selectedCountry.code}
          onValueChange={handleCountryChange}
          disabled={disabled}
        >
          <SelectTrigger 
            className={cn(
              "h-full px-[14px] min-w-max",
              "text-base bg-transparent flex items-center justify-between",
              "focus:outline-none",
              disabled && "cursor-not-allowed"
            )}
          >
            <SelectValue>
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.dial_code}</span>
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent 
            className="max-h-[300px] overflow-y-auto rounded-[4px] border border-neutral-border bg-white"
          >
            {uniqueCountries.map((country: Country) => (
              <SelectItem 
                key={`${country.code}-${country.dial_code}`} 
                value={country.code}
                className={cn(
                  "py-[13px] px-[14px]",
                  "hover:bg-neutral-background focus:bg-neutral-background",
                  "cursor-pointer"
                )}
              >
                <span className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span className="text-neutral-text-secondary">
                    {country.dial_code}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <input
        type="tel"
        value={phoneNumber}
        onChange={handleNumberChange}
        placeholder={placeholder}
        name={name}
        id={id}
        disabled={disabled}
        className={cn(
          "flex-1 bg-transparent px-[14px] text-base text-neutral-primary-text",
          "placeholder:text-[#C5C2C5] focus:outline-none",
          disabled && "cursor-not-allowed"
        )}
      />
    </div>
  );
} 