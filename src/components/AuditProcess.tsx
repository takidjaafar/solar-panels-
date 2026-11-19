interface AuditStep {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
}

const AUDIT_STEPS: AuditStep[] = [
  {
    code: '01 / Thermal & IV-Curve Scan',
    title: 'Thermal & IV-Curve Scan',
    subtitle: 'Non-Invasive Field Telemetry',
    description:
      'Certified engineers execute radiometric IR drone flyovers alongside handheld string IV-curve tracing, insulation resistance checks, and open-circuit voltage profiling.',
    deliverable: 'Deliverable: Raw radiometric thermograms + DC/AC logs',
  },
  {
    code: '02 / Root-Cause Engineering Report',
    title: 'Root-Cause Engineering Report',
    subtitle: 'Module-Level Fault Matrix',
    description:
      'Receive a pinpointed string-map locating every underperforming module, failed bypass diode, or degraded splice with delta-T severity ratings and kWh loss attribution.',
    deliverable: 'Deliverable: IEC 62446-1 fault matrix + remediation scope',
  },
  {
    code: '03 / On-Site Repair & Verification',
    title: 'On-Site Repair & Verification',
    subtitle: 'Remediation & Post-Fix Sign-Off',
    description:
      'Field technicians replace damaged junction boxes, re-terminate MC4 connectors, recalibrate MPPT inverter channels, and issue a post-repair yield verification report.',
    deliverable: 'Deliverable: Signed commissioning & output verification',
  },
];

export function AuditProcess() {
  return (
    <section id="process" className="py-16 md:py-24 bg-[#F7F7F5] border-b border-[#DCD9D0]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#DCD9D0] mb-10">
          <div>
            <p className="text-xs font-semibold text-[#2A5B57] mb-2">Field Engineering Methodology</p>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1C2226] tracking-tight">
              3-Step Field Audit &amp; Remediation Process
            </h2>
          </div>
          <p className="text-sm text-[#4F5961] max-w-md leading-relaxed">
            Disciplined engineering workflow built on empirical telemetry—zero guesswork from initial scan to final commissioning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {AUDIT_STEPS.map((step) => (
            <article
              key={step.code}
              className="bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] p-6 md:p-7 flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-[#DCD9D0]">
                  <span className="font-mono-num text-xs font-semibold text-[#D96B27]">
                    {step.code.split(' / ')[0]}
                  </span>
                  <span className="text-xs font-medium text-[#2A5B57]">{step.subtitle}</span>
                </div>

                <h3 className="text-xl font-bold text-[#1C2226] tracking-tight mb-3">{step.code}</h3>
                <p className="text-sm text-[#4F5961] leading-relaxed">{step.description}</p>
              </div>

              <div className="pt-4 border-t border-[#DCD9D0] text-xs font-medium text-[#1C2226]">
                {step.deliverable}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
