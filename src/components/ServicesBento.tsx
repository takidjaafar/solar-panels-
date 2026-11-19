import { ArrowUpRight } from 'lucide-react';

interface ServicesBentoProps {
  onSelectService: (serviceTitle: string) => void;
}

const CASE_STUDIES = [
  {
    id: 'case-1',
    title: 'Pacific Cold Storage Facility — Industrial Rooftop',
    capacity: '480 kWp',
    beforePct: '68.0%',
    afterPct: '96.5%',
    recovered: '134,200 kWh / yr',
    image: '/assets/field-technicians.jpg',
    imageAlt: 'HelioFix field engineers replacing a damaged photovoltaic module on site',
    summary:
      'Identified 27 thermal hotspots exceeding 88°C and failed bypass diodes across 4 strings. Replaced degraded junction boxes and re-balanced string voltage within 18 hours.',
  },
  {
    id: 'case-2',
    title: 'Mesa Logistics Distribution Hub — Ground Mount',
    capacity: '1.2 MWp',
    beforePct: '74.5%',
    afterPct: '98.1%',
    recovered: '286,400 kWh / yr',
    image: '/assets/hero-solar-poster.jpg',
    imageAlt: 'Commercial photovoltaic solar panel rows after post-storm rehabilitation',
    summary:
      'Executed full post-storm rehabilitation, MC4 connector re-termination, and MPPT calibration, dropping peak junction temperatures from 94°C to 41°C.',
  },
];

export function ServicesBento({ onSelectService }: ServicesBentoProps) {
  return (
    <section id="services" className="py-16 md:py-24 bg-[#F7F7F5] border-b border-[#DCD9D0]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#DCD9D0] mb-10">
          <div>
            <p className="text-xs font-semibold text-[#2A5B57] mb-2">Specialized Engineering Services</p>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1C2226] tracking-tight">
              Comprehensive PV Diagnostics &amp; Remediation
            </h2>
          </div>
          <p className="text-sm text-[#4F5961] max-w-md leading-relaxed">
            Sub-surface electrical and thermal interventions engineered to isolate hidden losses and restore nameplate generation.
          </p>
        </div>

        {/* 12-Column Swiss Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Card 1: Featured Drone & Thermal Micro-Crack Inspection (7 cols, Dark Charcoal) */}
          <article className="lg:col-span-7 bg-[#1C2226] text-[#F7F7F5] border border-[#1C2226] rounded-[4px] p-6 md:p-8 flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="36" height="36" rx="2" stroke="#4D575E" strokeWidth="1.25" />
                  <path d="M11 15V11H15M25 11H29V15M29 25V29H25M15 29H11V25" stroke="#D96B27" strokeWidth="1.5" />
                  <circle cx="20" cy="20" r="4.5" stroke="#F7F7F5" strokeWidth="1.5" />
                  <line x1="20" y1="9" x2="20" y2="13" stroke="#78B6AF" strokeWidth="1.25" />
                  <line x1="20" y1="27" x2="20" y2="31" stroke="#78B6AF" strokeWidth="1.25" />
                </svg>
                <span className="font-mono-num text-xs text-[#9AA3AA]">01 · IEC 62446-3</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
                Drone &amp; Thermal Micro-Crack Inspection
              </h3>
              <p className="text-sm md:text-base text-[#CBD1D6] leading-relaxed max-w-xl">
                High-resolution radiometric drone mapping paired with electroluminescence testing to pinpoint micro-fractured cells, PID degradation, and high-resistance interconnects without array shutdown.
              </p>
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs text-[#CBD1D6]">
                <span>
                  Sensitivity: <strong className="font-mono-num text-white">±0.03°C</strong>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  Throughput: <strong className="font-mono-num text-white">5 MW / day</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => onSelectService('Drone & Thermal Micro-Crack Inspection')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D96B27] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Schedule Thermal Scan</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Card 2: Hotspot & Junction Box Remediation (5 cols) */}
          <article className="lg:col-span-5 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] p-6 md:p-8 flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="36" height="36" rx="2" stroke="#DCD9D0" strokeWidth="1.25" fill="#F7F7F5" />
                  <rect x="10" y="10" width="20" height="20" stroke="#1C2226" strokeWidth="1.5" />
                  <rect x="21" y="12" width="7" height="7" fill="#D96B27" />
                  <line x1="10" y1="20" x2="30" y2="20" stroke="#1C2226" strokeWidth="1.25" />
                  <line x1="20" y1="10" x2="20" y2="30" stroke="#1C2226" strokeWidth="1.25" />
                </svg>
                <span className="font-mono-num text-xs text-[#5E676E]">02 · HOTSPOTS</span>
              </div>

              <h3 className="text-xl font-bold text-[#1C2226] tracking-tight mb-3">
                Hotspot &amp; Junction Box Remediation
              </h3>
              <p className="text-sm text-[#4F5961] leading-relaxed">
                Targeted bypass diode replacement, melted backsheet junction box rebuilds, and certified MC4 connector re-crimping to eliminate thermal runaway and DC arc-fault hazards.
              </p>
            </div>

            <div className="pt-5 border-t border-[#DCD9D0] flex items-center justify-between gap-3">
              <span className="text-xs text-[#2A5B57] font-semibold">UL / IEC Certified Components</span>
              <button
                type="button"
                onClick={() => onSelectService('Hotspot & Junction Box Remediation')}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#1C2226] hover:text-[#D96B27] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Request Repair</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Card 3: String Inverter Diagnostics & Re-commissioning (5 cols) */}
          <article className="lg:col-span-5 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] p-6 md:p-8 flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="36" height="36" rx="2" stroke="#DCD9D0" strokeWidth="1.25" fill="#F7F7F5" />
                  <path d="M9 24H14L17 14L22 27L25 18H31" stroke="#2A5B57" strokeWidth="1.75" strokeLinecap="square" />
                </svg>
                <span className="font-mono-num text-xs text-[#5E676E]">03 · MPPT / I-V</span>
              </div>

              <h3 className="text-xl font-bold text-[#1C2226] tracking-tight mb-3">
                String Inverter Diagnostics &amp; Re-commissioning
              </h3>
              <p className="text-sm text-[#4F5961] leading-relaxed">
                Root-cause isolation fault tracing, MPPT voltage window calibration, IGBT board servicing, firmware updates, and multi-string current balancing under load.
              </p>
            </div>

            <div className="pt-5 border-t border-[#DCD9D0] flex items-center justify-between gap-3">
              <span className="text-xs text-[#4F5961] font-mono-num">1000V / 1500V DC</span>
              <button
                type="button"
                onClick={() => onSelectService('String Inverter Diagnostics & Re-commissioning')}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#1C2226] hover:text-[#D96B27] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Inverter Service</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Card 4: Hail, Storm & Soiling Yield Recovery (7 cols) */}
          <article className="lg:col-span-7 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] p-6 md:p-8 flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="36" height="36" rx="2" stroke="#DCD9D0" strokeWidth="1.25" fill="#F7F7F5" />
                  <path d="M9 14H28M9 20H31M9 26H24" stroke="#1C2226" strokeWidth="1.5" />
                  <path d="M27 23L31 27L27 31" stroke="#D96B27" strokeWidth="1.5" />
                </svg>
                <span className="font-mono-num text-xs text-[#5E676E]">04 · RECOVERY</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-[#1C2226] tracking-tight mb-3">
                Hail, Storm &amp; Soiling Yield Recovery
              </h3>
              <p className="text-sm md:text-base text-[#4F5961] leading-relaxed max-w-2xl">
                Post-storm structural racking re-torque, shattered module replacement with voltage-matched spares, deionized mineralized-soiling removal, and grounding continuity verification.
              </p>
            </div>

            <div className="pt-5 border-t border-[#DCD9D0] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs text-[#4F5961]">
                <span>Structural Torque Audit</span>
                <span aria-hidden="true">·</span>
                <span>
                  Ground Resistance &lt; <span className="font-mono-num">4 Ω</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => onSelectService('Hail, Storm & Soiling Yield Recovery')}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#1C2226] hover:text-[#D96B27] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Request Array Recovery</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </article>
        </div>

        {/* Adjacent Proof Section: Case Studies */}
        <div id="case-studies" className="mt-16 pt-14 border-t border-[#DCD9D0]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-[#D96B27] mb-1.5">Verified Field Case Studies</p>
              <h3 className="text-xl md:text-2xl font-bold text-[#1C2226] tracking-tight">
                Measured Yield Recovery in Production Arrays
              </h3>
            </div>
            <span className="text-xs text-[#4F5961]">Pre- and post-remediation SCADA telemetry benchmarks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CASE_STUDIES.map((cs) => (
              <article
                key={cs.id}
                className="bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/9] bg-[#1C2226] relative overflow-hidden border-b border-[#DCD9D0]">
                  <img
                    src={cs.image}
                    alt={cs.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#4F5961] mb-2">
                      <span>
                        Array Capacity: <strong className="font-mono-num text-[#1C2226]">{cs.capacity}</strong>
                      </span>
                      <span className="font-mono-num text-[#2A5B57] font-semibold">{cs.recovered}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#1C2226] tracking-tight mb-2">{cs.title}</h4>
                    <p className="text-sm text-[#4F5961] leading-relaxed">{cs.summary}</p>
                  </div>

                  <div className="grid grid-cols-3 border border-[#DCD9D0] bg-[#F7F7F5] rounded-[4px] divide-x divide-[#DCD9D0] text-center">
                    <div className="p-3">
                      <div className="text-[11px] text-[#5E676E] mb-0.5">Before PR</div>
                      <div className="font-mono-num text-sm font-semibold text-[#1C2226]">{cs.beforePct}</div>
                    </div>
                    <div className="p-3">
                      <div className="text-[11px] text-[#5E676E] mb-0.5">After PR</div>
                      <div className="font-mono-num text-sm font-semibold text-[#2A5B57]">{cs.afterPct}</div>
                    </div>
                    <div className="p-3">
                      <div className="text-[11px] text-[#5E676E] mb-0.5">Restored Output</div>
                      <div className="font-mono-num text-xs font-semibold text-[#D96B27]">
                        {cs.recovered.split(' ')[0]} kWh
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
