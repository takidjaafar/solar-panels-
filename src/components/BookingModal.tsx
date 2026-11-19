import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { generateTicketReference, validateBookingForm } from '../utils/solarLoss';

export interface BookingInitialContext {
  serviceType?: string;
  systemSizeKw?: number;
  efficiencyDropPercent?: number;
}

interface BookingModalProps {
  isOpen: boolean;
  initialContext: BookingInitialContext;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  'Drone & Thermal Micro-Crack Inspection',
  'Hotspot & Junction Box Remediation',
  'String Inverter Diagnostics & Re-commissioning',
  'Hail, Storm & Soiling Yield Recovery',
];

export function BookingModal({ isOpen, initialContext, onClose }: BookingModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState(SERVICE_OPTIONS[0]);
  const [systemSizeKw, setSystemSizeKw] = useState('150');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedTicket, setConfirmedTicket] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setServiceType(initialContext.serviceType || SERVICE_OPTIONS[0]);
    if (initialContext.systemSizeKw) {
      setSystemSizeKw(String(initialContext.systemSizeKw));
    }
    setErrors({});
    setConfirmedTicket(null);
  }, [isOpen, initialContext]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm({
      fullName,
      phone,
      location,
      serviceType,
      systemSizeKw,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setConfirmedTicket(generateTicketReference());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2226]/75"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="w-full max-w-lg bg-[#F7F7F5] border border-[#DCD9D0] rounded-[4px] overflow-hidden"
      >
        <div className="px-6 py-4 bg-[#1C2226] text-white flex items-center justify-between border-b border-[#2E363C]">
          <div>
            <h2 id="booking-modal-title" className="text-base md:text-lg font-bold tracking-tight">
              Schedule Field Audit &amp; Diagnostic Dispatch
            </h2>
            <p className="text-xs text-[#CBD1D6]">
              On-site assignment confirmed within 2 business hours
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            className="w-9 h-9 inline-flex items-center justify-center rounded-[4px] border border-white/20 text-white hover:border-[#D96B27] hover:text-[#D96B27] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {confirmedTicket ? (
            <div data-testid="booking-success-state" className="space-y-5">
              <div className="p-5 bg-[#EFECE6] border border-[#2A5B57] rounded-[4px] space-y-2.5">
                <div className="flex items-center gap-2.5 text-[#2A5B57] font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Field Audit Request Confirmed</span>
                </div>
                <p className="text-sm text-[#1C2226] leading-relaxed">
                  Dispatch Ticket:{' '}
                  <strong className="font-mono-num text-[#D96B27]">{confirmedTicket}</strong>
                </p>
                <div className="pt-2 border-t border-[#DCD9D0] text-xs text-[#4F5961] space-y-1">
                  <div>Service Scope: {serviceType}</div>
                  <div>
                    Array Capacity: <span className="font-mono-num">{systemSizeKw} kW</span> · Site: {location}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-[#1C2226] hover:bg-black text-white text-sm font-semibold rounded-[4px] transition-colors cursor-pointer"
              >
                Close &amp; Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate data-testid="booking-form" className="space-y-4">
              {initialContext.efficiencyDropPercent !== undefined && (
                <div className="px-3.5 py-2.5 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] text-xs text-[#1C2226] flex items-center justify-between">
                  <span>Attached Estimator Telemetry:</span>
                  <span className="font-mono-num font-semibold text-[#D96B27]">
                    {systemSizeKw} kW · -{initialContext.efficiencyDropPercent}% drop
                  </span>
                </div>
              )}

              <div>
                <label htmlFor="booking-service" className="block text-xs font-bold text-[#1C2226] mb-1.5">
                  Engineering Service Scope
                </label>
                <select
                  id="booking-service"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] text-sm text-[#1C2226]"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-bold text-[#1C2226] mb-1.5">
                    Contact / Facility Name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Horizon Logistics Park"
                    className="w-full px-3.5 py-2.5 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] text-sm text-[#1C2226]"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-[#D96B27] mt-1" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-bold text-[#1C2226] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="6025550199"
                    className="w-full px-3.5 py-2.5 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] text-sm font-mono-num text-[#1C2226]"
                  />
                  {errors.phone && (
                    <p className="text-xs text-[#D96B27] mt-1" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-location" className="block text-xs font-bold text-[#1C2226] mb-1.5">
                    Site City / Region
                  </label>
                  <input
                    id="booking-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Phoenix, AZ — Industrial Park"
                    className="w-full px-3.5 py-2.5 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] text-sm text-[#1C2226]"
                  />
                  {errors.location && (
                    <p className="text-xs text-[#D96B27] mt-1" role="alert">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="booking-size" className="block text-xs font-bold text-[#1C2226] mb-1.5">
                    Array Capacity (kW)
                  </label>
                  <input
                    id="booking-size"
                    type="number"
                    min={1}
                    value={systemSizeKw}
                    onChange={(e) => setSystemSizeKw(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] text-sm font-mono-num text-[#1C2226]"
                  />
                  {errors.systemSizeKw && (
                    <p className="text-xs text-[#D96B27] mt-1" role="alert">
                      {errors.systemSizeKw}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-[#EFECE6] border border-[#DCD9D0] hover:border-[#1C2226] text-xs font-semibold text-[#1C2226] rounded-[4px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D96B27] hover:bg-[#BE581A] text-white text-sm font-semibold rounded-[4px] transition-colors cursor-pointer"
                >
                  Confirm Field Audit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
