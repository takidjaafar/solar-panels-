import { FormEvent, useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { generateTicketReference, validateQuickDispatch } from '../utils/solarLoss';

export function FooterDispatch() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateQuickDispatch({ name, phone, notes });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setTicketId(generateTicketReference());
    setName('');
    setPhone('');
    setNotes('');
  };

  return (
    <footer className="bg-[#1C2226] text-[#F7F7F5]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Brand & Certifications Column */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="1" y="1" width="26" height="26" rx="2" stroke="#F7F7F5" strokeWidth="1.5" />
                  <line x1="14" y1="1" x2="14" y2="27" stroke="#4D575E" strokeWidth="1" />
                  <line x1="1" y1="14" x2="27" y2="14" stroke="#4D575E" strokeWidth="1" />
                  <rect x="4" y="4" width="7" height="7" fill="#F7F7F5" />
                  <rect x="17" y="4" width="7" height="7" fill="#2A5B57" />
                  <rect x="4" y="17" width="7" height="7" fill="#2A5B57" />
                  <rect x="17" y="17" width="7" height="7" fill="#D96B27" />
                </svg>
                <span className="font-mono-num text-xl font-bold text-white">HelioFix Engineering</span>
              </div>
              <p className="text-sm text-[#CBD1D6] max-w-md leading-relaxed">
                Specialized photovoltaic diagnostics, thermal remediation, and inverter service engineering for commercial, industrial, and residential solar assets.
              </p>
            </div>

            {/* Direct Engineering Contact Details */}
            <div className="space-y-3 text-sm text-[#EFECE6]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D96B27] shrink-0" aria-hidden="true" />
                <span>24/7 Emergency Dispatch:</span>
                <a
                  href="tel:+18004354634"
                  className="font-mono-num font-semibold text-white hover:text-[#D96B27]"
                >
                  +1 (800) 435-4634
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D96B27] shrink-0" aria-hidden="true" />
                <span>Engineering Desk:</span>
                <a
                  href="mailto:dispatch@heliofix-eng.com"
                  className="font-mono-num text-white hover:text-[#D96B27]"
                >
                  dispatch@heliofix-eng.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#D96B27] shrink-0" aria-hidden="true" />
                <span>Field Operations: Southwest · West Coast · Gulf Industrial Corridor</span>
              </div>
            </div>

            {/* Compliance & Certifications */}
            <div className="pt-4 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs text-[#9AA3AA] mb-3">
                <ShieldCheck className="w-4 h-4 text-[#78B6AF]" aria-hidden="true" />
                <span>Standards &amp; Compliance Accreditations</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono-num text-[#EFECE6]">
                <span>IEC 62446-1</span>
                <span className="text-[#5E676E]" aria-hidden="true">/</span>
                <span>IEC 61215</span>
                <span className="text-[#5E676E]" aria-hidden="true">/</span>
                <span>NABCEP PVIP Certified</span>
                <span className="text-[#5E676E]" aria-hidden="true">/</span>
                <span>ISO 9001:2015</span>
              </div>
            </div>
          </div>

          {/* Quick Dispatch Contact Form */}
          <div className="lg:col-span-6 bg-[#252D32] border border-white/15 rounded-[4px] p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-1.5">Quick Field Dispatch Request</h3>
            <p className="text-xs text-[#CBD1D6] mb-6">
              For inverter faults, isolation alarms, or sudden string drops — an on-call PV engineer responds within 2 hours.
            </p>

            {ticketId ? (
              <div
                data-testid="quick-dispatch-success"
                className="p-5 bg-[#2A5B57]/25 border border-[#78B6AF] rounded-[4px] space-y-3"
              >
                <div className="flex items-center gap-2.5 text-white font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#78B6AF] shrink-0" aria-hidden="true" />
                  <span>Emergency Dispatch Ticket Logged</span>
                </div>
                <p className="text-xs text-[#EFECE6] leading-relaxed">
                  Dispatch Reference:{' '}
                  <strong className="font-mono-num text-white">{ticketId}</strong>. Your fault report
                  has been routed to the nearest mobile diagnostics unit.
                </p>
                <button
                  type="button"
                  onClick={() => setTicketId(null)}
                  className="px-4 py-2 bg-[#1C2226] hover:bg-black text-xs font-semibold text-white border border-white/20 rounded-[4px] cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate data-testid="quick-dispatch-form" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dispatch-name" className="block text-xs font-medium text-[#EFECE6] mb-1.5">
                      Contact / Facility Name
                    </label>
                    <input
                      id="dispatch-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer — Facility Ops"
                      className="w-full px-3.5 py-2.5 bg-[#1C2226] border border-white/20 rounded-[4px] text-sm text-white placeholder:text-[#7E8890]"
                    />
                    {errors.name && (
                      <p className="text-xs text-[#F29D6B] mt-1" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dispatch-phone" className="block text-xs font-medium text-[#EFECE6] mb-1.5">
                      Direct Phone
                    </label>
                    <input
                      id="dispatch-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="6025550144"
                      className="w-full px-3.5 py-2.5 bg-[#1C2226] border border-white/20 rounded-[4px] text-sm font-mono-num text-white placeholder:text-[#7E8890]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#F29D6B] mt-1" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="dispatch-notes" className="block text-xs font-medium text-[#EFECE6] mb-1.5">
                    Fault Symptoms &amp; Array Capacity
                  </label>
                  <textarea
                    id="dispatch-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g., Inverter #2 isolation fault or 20% output drop on 250 kW commercial rooftop..."
                    className="w-full px-3.5 py-2.5 bg-[#1C2226] border border-white/20 rounded-[4px] text-sm text-white placeholder:text-[#7E8890]"
                  />
                  {errors.notes && (
                    <p className="text-xs text-[#F29D6B] mt-1" role="alert">
                      {errors.notes}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#D96B27] hover:bg-[#BE581A] text-white text-sm font-semibold rounded-[4px] transition-colors cursor-pointer"
                >
                  Dispatch Field Engineer
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Copyright Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9AA3AA]">
          <p>© 2026 HelioFix Engineering. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#services" className="hover:text-white transition-colors">
              Thermal Diagnostics
            </a>
            <a href="#calculator" className="hover:text-white transition-colors">
              Yield Loss Calculator
            </a>
            <a href="#process" className="hover:text-white transition-colors">
              Field Audit Process
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
