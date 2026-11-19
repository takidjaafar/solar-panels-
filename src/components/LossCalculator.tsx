import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import {
  TARIFF_PRESETS,
  TariffPreset,
  calculateSolarLoss,
  clampNumber,
} from '../utils/solarLoss';

interface LossCalculatorProps {
  onBookRepair: (systemSizeKw: number, efficiencyDropPercent: number) => void;
}

export function LossCalculator({ onBookRepair }: LossCalculatorProps) {
  const [systemSizeKw, setSystemSizeKw] = useState<number>(150);
  const [efficiencyDrop, setEfficiencyDrop] = useState<number>(18);
  const [selectedTariffId, setSelectedTariffId] = useState<TariffPreset['id']>('commercial');

  const activeTariff =
    TARIFF_PRESETS.find((t) => t.id === selectedTariffId) ?? TARIFF_PRESETS[1];

  const result = useMemo(
    () =>
      calculateSolarLoss({
        systemSizeKw,
        efficiencyDropPercent: efficiencyDrop,
        ratePerKwh: activeTariff.ratePerKwh,
      }),
    [systemSizeKw, efficiencyDrop, activeTariff.ratePerKwh],
  );

  const handleSizeInput = (raw: string) => {
    if (raw === '') {
      setSystemSizeKw(1);
      return;
    }
    const parsed = Number(raw);
    if (Number.isFinite(parsed)) {
      setSystemSizeKw(clampNumber(parsed, 1, 10000));
    }
  };

  const handleDropInput = (raw: string) => {
    if (raw === '') {
      setEfficiencyDrop(0);
      return;
    }
    const parsed = Number(raw);
    if (Number.isFinite(parsed)) {
      setEfficiencyDrop(clampNumber(parsed, 0, 95));
    }
  };

  const formatNumber = (n: number) => n.toLocaleString('en-US');

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#EFECE6] border-b border-[#DCD9D0]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#DCD9D0] mb-10">
          <div>
            <p className="text-xs font-semibold text-[#D96B27] mb-2">Interactive Diagnostic Estimator</p>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1C2226] tracking-tight">
              Solar Yield Loss Calculator
            </h2>
          </div>
          <p className="text-sm text-[#4F5961] max-w-md leading-relaxed">
            Enter your nameplate system capacity and observed performance drop to quantify annual kWh forfeiture and unrecovered revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Inputs Panel */}
          <div className="lg:col-span-6 bg-[#F7F7F5] border border-[#DCD9D0] rounded-[4px] p-6 md:p-8 flex flex-col justify-between gap-7">
            <div className="space-y-6">
              {/* System Size Input */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-2.5">
                  <label htmlFor="calc-size-input" className="text-sm font-bold text-[#1C2226]">
                    System Size (kW)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="calc-size-input"
                      data-testid="calc-size-input"
                      type="number"
                      min={1}
                      max={10000}
                      value={systemSizeKw}
                      onChange={(e) => handleSizeInput(e.target.value)}
                      className="w-28 px-3 py-1.5 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] font-mono-num text-sm font-semibold text-[#1C2226] text-center"
                    />
                    <span className="font-mono-num text-xs text-[#4F5961]">kW</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={10}
                  max={2000}
                  step={10}
                  value={Math.min(2000, systemSizeKw)}
                  onChange={(e) => setSystemSizeKw(Number(e.target.value))}
                  aria-label="System size slider in kW"
                  className="w-full accent-[#D96B27] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono-num text-[#5E676E] mt-1">
                  <span>10 kW</span>
                  <span>1,000 kW</span>
                  <span>2,000+ kW</span>
                </div>
              </div>

              {/* Efficiency Drop Input */}
              <div className="pt-5 border-t border-[#DCD9D0]">
                <div className="flex items-center justify-between gap-4 mb-2.5">
                  <label htmlFor="calc-drop-input" className="text-sm font-bold text-[#1C2226]">
                    Estimated Efficiency Drop (%)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="calc-drop-input"
                      data-testid="calc-drop-input"
                      type="number"
                      min={0}
                      max={95}
                      value={efficiencyDrop}
                      onChange={(e) => handleDropInput(e.target.value)}
                      className="w-28 px-3 py-1.5 bg-[#EFECE6] border border-[#DCD9D0] rounded-[4px] font-mono-num text-sm font-semibold text-[#1C2226] text-center"
                    />
                    <span className="font-mono-num text-xs text-[#4F5961]">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={65}
                  step={1}
                  value={Math.min(65, efficiencyDrop)}
                  onChange={(e) => setEfficiencyDrop(Number(e.target.value))}
                  aria-label="Efficiency drop slider in percent"
                  className="w-full accent-[#D96B27] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono-num text-[#5E676E] mt-1">
                  <span>1%</span>
                  <span>30%</span>
                  <span>65%</span>
                </div>
              </div>

              {/* Tariff Selector */}
              <div className="pt-5 border-t border-[#DCD9D0]">
                <span className="block text-sm font-bold text-[#1C2226] mb-3">
                  Utility Rate Tier
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {TARIFF_PRESETS.map((preset) => {
                    const active = preset.id === selectedTariffId;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setSelectedTariffId(preset.id)}
                        aria-pressed={active}
                        className={`px-3 py-2.5 text-xs font-semibold rounded-[4px] border transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#1C2226] text-white border-[#1C2226]'
                            : 'bg-[#EFECE6] text-[#1C2226] border-[#DCD9D0] hover:border-[#1C2226]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5E676E] pt-4 border-t border-[#DCD9D0] leading-relaxed">
              Modeled against standard <span className="font-mono-num">5.2 PSH/day</span> solar insolation and <span className="font-mono-num">PR = 0.84</span> baseline performance ratio.
            </p>
          </div>

          {/* Results Output Panel */}
          <div className="lg:col-span-6 bg-[#1C2226] text-[#F7F7F5] border border-[#1C2226] rounded-[4px] p-6 md:p-8 flex flex-col justify-between gap-7">
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/15 mb-6">
                <span className="text-xs font-medium text-[#CBD1D6]">Annualized Loss Projection</span>
                <span className="font-mono-num text-xs text-[#78B6AF]">
                  {formatNumber(systemSizeKw)} kWp · -{efficiencyDrop}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="p-5 bg-[#252D32] border border-white/10 rounded-[4px]">
                  <div className="text-xs text-[#CBD1D6] mb-2">Annual Lost Energy</div>
                  <div
                    data-testid="calc-annual-kwh"
                    className="font-mono-num text-3xl md:text-4xl font-semibold text-white tracking-tight"
                  >
                    {formatNumber(result.annualLostKwh)}
                  </div>
                  <div className="font-mono-num text-xs text-[#78B6AF] mt-1">kWh / year</div>
                </div>

                <div className="p-5 bg-[#252D32] border border-white/10 rounded-[4px]">
                  <div className="text-xs text-[#CBD1D6] mb-2">Estimated Annual Revenue Loss</div>
                  <div
                    data-testid="calc-annual-loss"
                    className="font-mono-num text-3xl md:text-4xl font-semibold text-[#D96B27] tracking-tight"
                  >
                    ${formatNumber(result.annualRevenueLoss)}
                  </div>
                  <div className="font-mono-num text-xs text-[#EFECE6]/80 mt-1">USD / year</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/15 text-xs mb-6">
                <div>
                  <span className="text-[#9AA3AA] block mb-1">Daily Generation Deficit</span>
                  <span className="font-mono-num text-base font-semibold text-white">
                    {formatNumber(result.dailyLostKwh)} kWh / day
                  </span>
                </div>
                <div>
                  <span className="text-[#9AA3AA] block mb-1">Est. Recoverable Yield</span>
                  <span className="font-mono-num text-base font-semibold text-[#78B6AF]">
                    +{formatNumber(result.recoverableAnnualKwh)} kWh
                  </span>
                </div>
              </div>

              {/* Priority Classification with explicit icon + text */}
              <div
                className={`p-3.5 rounded-[4px] border flex items-center gap-3 text-xs md:text-sm ${
                  result.severity === 'critical'
                    ? 'bg-[#D96B27]/15 border-[#D96B27]/60 text-[#F7F7F5]'
                    : result.severity === 'moderate'
                      ? 'bg-[#2A5B57]/25 border-[#2A5B57] text-[#F7F7F5]'
                      : 'bg-white/5 border-white/20 text-[#EFECE6]'
                }`}
              >
                {result.severity === 'critical' ? (
                  <AlertTriangle className="w-4 h-4 text-[#D96B27] shrink-0" aria-hidden="true" />
                ) : result.severity === 'moderate' ? (
                  <Info className="w-4 h-4 text-[#78B6AF] shrink-0" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#78B6AF] shrink-0" aria-hidden="true" />
                )}
                <span>
                  Triage Classification: <strong>{result.severityLabel}</strong>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onBookRepair(systemSizeKw, efficiencyDrop)}
              className="w-full py-3.5 px-6 bg-[#D96B27] hover:bg-[#BE581A] text-white text-sm md:text-base font-semibold rounded-[4px] transition-colors inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Request Diagnostic Quote</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
