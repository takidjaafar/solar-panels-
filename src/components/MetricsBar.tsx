interface MetricItem {
  value: string;
  label: string;
  detail: string;
  accent?: 'sage' | 'terracotta' | 'default';
}

const METRICS: MetricItem[] = [
  {
    value: '99.4%',
    label: 'Fault Detection Accuracy',
    detail: 'Radiometric aerial & ground thermography per IEC 62446-3',
    accent: 'sage',
  },
  {
    value: '+22%',
    label: 'Avg. Yield Recovered',
    detail: 'Post-remediation output gain after hotspot & string balancing',
    accent: 'terracotta',
  },
  {
    value: '< 24h',
    label: 'Emergency Response',
    detail: 'Equipped mobile field engineering units across active regions',
    accent: 'default',
  },
  {
    value: '1,400+',
    label: 'Arrays Restored',
    detail: 'Commercial rooftops, industrial facilities, and utility sites',
    accent: 'default',
  },
];

export function MetricsBar() {
  return (
    <section aria-label="Key Engineering Metrics" className="bg-[#EFECE6] border-b border-[#DCD9D0]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DCD9D0]">
          {METRICS.map((item) => {
            const valueColor =
              item.accent === 'sage'
                ? 'text-[#2A5B57]'
                : item.accent === 'terracotta'
                  ? 'text-[#D96B27]'
                  : 'text-[#1C2226]';

            return (
              <div key={item.label} className="px-6 py-7 flex flex-col justify-between gap-2">
                <div className={`font-mono-num text-3xl md:text-4xl font-semibold tracking-tight ${valueColor}`}>
                  {item.value}
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-bold text-[#1C2226] tracking-tight">
                    {item.label}
                  </h2>
                  <p className="text-xs text-[#4F5961] mt-1 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
