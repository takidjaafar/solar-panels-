import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSolarLoss,
  validateBookingForm,
  validateQuickDispatch,
  generateTicketReference,
} from './solarLoss';

test('calculateSolarLoss computes deterministic annual kWh and USD revenue loss', () => {
  const res = calculateSolarLoss({
    systemSizeKw: 100,
    efficiencyDropPercent: 20,
    peakSunHoursPerDay: 5.2,
    ratePerKwh: 0.13,
  });

  // 100 * 5.2 * 0.84 = 436.8 kWh/day -> 20% = 87.36 kWh/day -> * 365 = 31886.4 -> 31886
  assert.equal(res.dailyBaselineKwh, 437);
  assert.equal(res.dailyLostKwh, 87);
  assert.equal(res.annualLostKwh, 31886);
  assert.equal(res.annualRevenueLoss, 4145);
  assert.equal(res.severity, 'critical');
});

test('calculateSolarLoss classifies moderate and normal drop severities accurately', () => {
  const normal = calculateSolarLoss({ systemSizeKw: 50, efficiencyDropPercent: 4 });
  assert.equal(normal.severity, 'normal');

  const moderate = calculateSolarLoss({ systemSizeKw: 50, efficiencyDropPercent: 10 });
  assert.equal(moderate.severity, 'moderate');
});

test('validateBookingForm catches missing or malformed fields without silent fallbacks', () => {
  const invalid = validateBookingForm({
    fullName: '',
    phone: '123',
    location: '',
    serviceType: 'Drone & Thermal Micro-Crack Inspection',
    systemSizeKw: '-5',
  });

  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.location);
  assert.ok(invalid.errors.systemSizeKw);

  const valid = validateBookingForm({
    fullName: 'Meridian Logistics Park',
    phone: '+1 800 555 0199',
    location: 'Phoenix, AZ',
    serviceType: 'Drone & Thermal Micro-Crack Inspection',
    systemSizeKw: '250',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('validateQuickDispatch validates footer quick dispatch inputs', () => {
  const invalid = validateQuickDispatch({ name: 'A', phone: 'abc', notes: 'help' });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.notes);

  const valid = validateQuickDispatch({
    name: 'Elena Rostova',
    phone: '6025550144',
    notes: 'Inverter #3 isolation fault on 180 kW rooftop array',
  });
  assert.equal(valid.valid, true);
});

test('generateTicketReference returns formatted deterministic dispatch code', () => {
  const code = generateTicketReference(12345);
  assert.match(code, /^HF-2026-\d{4}$/);
});
