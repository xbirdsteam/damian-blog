"use client";

import { cn } from "@/lib/utils";
import CountryList from 'country-list-with-dial-code-and-flag';
import { Search } from "lucide-react";
import { useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [uniqueCountries, setUniqueCountries] = useState(Array.from(
    new Map(
      CountryList.getAll().map(country => [`${country.code}-${country.dial_code}`, country])
    ).values()
  ));

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

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = CountryList.getAll()
      .filter(country => 
        country.name.toLowerCase().includes(query.toLowerCase()) ||
        country.dial_code.includes(query) ||
        country.code.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    const newUniqueCountries = Array.from(
      new Map(
        filtered.map(country => [`${country.code}-${country.dial_code}`, country])
      ).values()
    );
    
    setUniqueCountries(newUniqueCountries);
  }, []);

  return (
    <div 
      className={cn(
        "group relative flex w-[300px] h-[50px] w-full rounded-[4px] border border-neutral-border bg-white",
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
              "h-full px-[14px] min-w-max !border-none",
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
            className={cn(
              "min-w-[var(--radix-select-trigger-width)] w-max rounded-[4px] border border-neutral-border bg-white",
              "max-h-[300px]"
            )}
          >
            <div className="sticky top-0 z-10 bg-white p-2 border-b border-neutral-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-text-secondary" />
                <input
                  className="w-full pl-9 pr-4 py-2 text-sm border border-neutral-border rounded-[4px] focus:outline-none focus:border-neutral-primary-text"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  spellCheck="false"  
                  autoFocus={true}
                  onBlur={(e) => e.target.focus()} // Keep focus on blur
                />
              </div>
            </div>
            <div 
              className="overflow-y-auto"
              id="country-list"
              role="listbox"
            >
              {uniqueCountries.map((country: Country) => (
                <SelectItem 
                  key={`${country.code}-${country.dial_code}`} 
                  value={country.code}
                  className={cn(
                    "py-[13px] px-[14px] whitespace-nowrap",
                    "hover:bg-neutral-background focus:bg-neutral-background",
                    "cursor-pointer"
                  )}
                  role="option"
                  aria-selected={selectedCountry.code === country.code}
                >
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span className="flex-1">{country.name}</span>
                    <span className="text-neutral-text-secondary">
                      {country.dial_code}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </div>
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