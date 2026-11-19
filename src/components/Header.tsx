import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (service?: string) => void;
}

const NAV_LINKS = [
  { label: 'Thermal Diagnostics', href: '#services' },
  { label: 'Panel Repair', href: '#process' },
  { label: 'Inverter Service', href: '#calculator' },
  { label: 'Case Studies', href: '#case-studies' },
];

export function Header({ onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F7F5]/95 backdrop-blur-sm border-b border-[#DCD9D0]">
      {/* Top Utility Bar - hidden on mobile to stay well within 15% sticky height cap */}
      <div className="hidden md:block bg-[#1C2226] text-[#F7F7F5] border-b border-[#2E363C]">
        <div className="max-w-[1280px] mx-auto px-6 h-8 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 text-[#EFECE6] whitespace-nowrap">
              <span className="inline-block w-2 h-2 bg-[#2A5B57] shrink-0" aria-hidden="true" />
              <span>24/7 Field Dispatch Available</span>
            </span>
            <span className="text-[#9AA3AA]" aria-hidden="true">·</span>
            <span className="text-[#CBD1D6] whitespace-nowrap">
              Field Compliance: <span className="font-mono-num">IEC 62446-1 / NABCEP</span>
            </span>
          </div>

          <a
            href="tel:+18004354634"
            className="inline-flex items-center gap-2 text-[#EFECE6] hover:text-[#D96B27] transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#D96B27]" aria-hidden="true" />
            <span>Emergency Dispatch:</span>
            <span className="font-mono-num font-medium">+1 (800) 435-4634</span>
          </a>
        </div>
      </div>

      {/* Main 3-Zone Swiss Navigation Bar */}
      <div className="max-w-[1280px] mx-auto px-3 sm:px-4 md:px-6 h-14 md:h-16 flex items-center justify-between gap-2 md:gap-8">
        {/* Zone 1: Brand Wordmark + Geometric SVG Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[#1C2226] whitespace-nowrap shrink-0"
          aria-label="HelioFix Engineering Home"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 md:w-7 md:h-7"
            aria-hidden="true"
          >
            <rect x="1" y="1" width="26" height="26" rx="2" stroke="#1C2226" strokeWidth="1.5" />
            <line x1="14" y1="1" x2="14" y2="27" stroke="#DCD9D0" strokeWidth="1" />
            <line x1="1" y1="14" x2="27" y2="14" stroke="#DCD9D0" strokeWidth="1" />
            <rect x="4" y="4" width="7" height="7" fill="#1C2226" />
            <rect x="17" y="4" width="7" height="7" fill="#2A5B57" />
            <rect x="4" y="17" width="7" height="7" fill="#2A5B57" />
            <rect x="17" y="17" width="7" height="7" fill="#D96B27" />
          </svg>
          <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight font-mono-num">
            HelioFix<span className="hidden sm:inline"> Engineering</span>
          </span>
        </a>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#374047] hover:text-[#D96B27] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D96B27]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Sharp-Cornered CTA + Mobile Drawer Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="px-3.5 md:px-4 py-2 bg-[#D96B27] hover:bg-[#BE581A] text-white text-xs md:text-sm font-semibold rounded-[4px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Schedule Audit
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 border border-[#DCD9D0] bg-[#EFECE6] text-[#1C2226] rounded-[4px] hover:border-[#1C2226] transition-colors cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-[#DCD9D0] bg-[#EFECE6] px-4 py-4"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#DCD9D0]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-sm font-medium text-[#1C2226] hover:text-[#D96B27] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-3 border-t border-[#DCD9D0] flex items-center justify-between text-xs text-[#374047]">
            <span>24/7 Field Dispatch Available</span>
            <a href="tel:+18004354634" className="font-mono-num font-semibold text-[#D96B27]">
              +1 (800) 435-4634
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
