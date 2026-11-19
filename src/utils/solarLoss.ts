export interface TariffPreset {
  id: 'residential' | 'commercial' | 'industrial';
  label: string;
  ratePerKwh: number;
  currencySymbol: string;
}

export const TARIFF_PRESETS: TariffPreset[] = [
  {
    id: 'residential',
    label: 'Residential ($0.16/kWh)',
    ratePerKwh: 0.16,
    currencySymbol: '$',
  },
  {
    id: 'commercial',
    label: 'Commercial ($0.13/kWh)',
    ratePerKwh: 0.13,
    currencySymbol: '$',
  },
  {
    id: 'industrial',
    label: 'Industrial ($0.09/kWh)',
    ratePerKwh: 0.09,
    currencySymbol: '$',
  },
];

export interface SolarLossInput {
  systemSizeKw: number;
  efficiencyDropPercent: number;
  peakSunHoursPerDay?: number;
  ratePerKwh?: number;
}

export interface SolarLossResult {
  dailyBaselineKwh: number;
  dailyLostKwh: number;
  monthlyLostKwh: number;
  annualLostKwh: number;
  annualRevenueLoss: number;
  recoverableAnnualKwh: number;
  severity: 'normal' | 'moderate' | 'critical';
  severityLabel: string;
}

const DEFAULT_PEAK_SUN_HOURS = 5.2;
const PERFORMANCE_RATIO = 0.84;
const DEFAULT_RATE_PER_KWH = 0.13;
const RECOVERY_FACTOR = 0.88;

export function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function calculateSolarLoss(input: SolarLossInput): SolarLossResult {
  const sizeKw = clampNumber(input.systemSizeKw, 1, 50000);
  const dropPct = clampNumber(input.efficiencyDropPercent, 0, 95);
  const sunHours = clampNumber(input.peakSunHoursPerDay ?? DEFAULT_PEAK_SUN_HOURS, 1, 10);
  const rate = clampNumber(input.ratePerKwh ?? DEFAULT_RATE_PER_KWH, 0.02, 5);

  const dailyBaselineKwh = sizeKw * sunHours * PERFORMANCE_RATIO;
  const dailyLostKwh = dailyBaselineKwh * (dropPct / 100);
  const monthlyLostKwh = dailyLostKwh * 30;
  const annualLostKwh = dailyLostKwh * 365;
  const annualRevenueLoss = annualLostKwh * rate;
  const recoverableAnnualKwh = annualLostKwh * RECOVERY_FACTOR;

  let severity: SolarLossResult['severity'] = 'normal';
  let severityLabel = 'Normal — Routine preventive inspection';

  if (dropPct >= 15) {
    severity = 'critical';
    severityLabel = 'Critical — Immediate field intervention required';
  } else if (dropPct >= 7) {
    severity = 'moderate';
    severityLabel = 'Moderate — Thermal & IV-curve audit recommended';
  }

  return {
    dailyBaselineKwh: Math.round(dailyBaselineKwh),
    dailyLostKwh: Math.round(dailyLostKwh),
    monthlyLostKwh: Math.round(monthlyLostKwh),
    annualLostKwh: Math.round(annualLostKwh),
    annualRevenueLoss: Math.round(annualRevenueLoss),
    recoverableAnnualKwh: Math.round(recoverableAnnualKwh),
    severity,
    severityLabel,
  };
}

export interface BookingPayload {
  fullName: string;
  phone: string;
  location: string;
  serviceType: string;
  systemSizeKw: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateBookingForm(payload: BookingPayload): ValidationResult {
  const errors: Record<string, string> = {};

  if (!payload.fullName || payload.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name or facility name.';
  }

  const normalizedPhone = (payload.phone || '').replace(/[\s\-()]/g, '');
  if (!/^\+?[0-9]{8,15}$/.test(normalizedPhone)) {
    errors.phone = 'Enter a valid dispatch phone number (8–15 digits).';
  }

  if (!payload.location || payload.location.trim().length < 2) {
    errors.location = 'Please specify the site city or facility address.';
  }

  const parsedSize = Number(payload.systemSizeKw);
  if (!payload.systemSizeKw || !Number.isFinite(parsedSize) || parsedSize <= 0) {
    errors.systemSizeKw = 'Enter a valid array capacity in kW (> 0).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface QuickDispatchPayload {
  name: string;
  phone: string;
  notes: string;
}

export function validateQuickDispatch(payload: QuickDispatchPayload): ValidationResult {
  const errors: Record<string, string> = {};

  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = 'Please enter a contact name.';
  }

  const normalizedPhone = (payload.phone || '').replace(/[\s\-()]/g, '');
  if (!/^\+?[0-9]{8,15}$/.test(normalizedPhone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!payload.notes || payload.notes.trim().length < 5) {
    errors.notes = 'Provide a brief fault description or array size.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateTicketReference(seed = Date.now()): string {
  const suffix = String((Math.abs(seed) % 9000) + 1000);
  return `HF-2026-${suffix}`;
}
