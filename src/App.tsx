import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MetricsBar } from './components/MetricsBar';
import { ServicesBento } from './components/ServicesBento';
import { LossCalculator } from './components/LossCalculator';
import { AuditProcess } from './components/AuditProcess';
import { FooterDispatch } from './components/FooterDispatch';
import { BookingInitialContext, BookingModal } from './components/BookingModal';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState<BookingInitialContext>({});

  const openBooking = (serviceType?: string) => {
    setBookingContext({ serviceType });
    setBookingOpen(true);
  };

  const openRepairFromCalculator = (systemSizeKw: number, efficiencyDropPercent: number) => {
    setBookingContext({
      serviceType: 'Hotspot & Junction Box Remediation',
      systemSizeKw,
      efficiencyDropPercent,
    });
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#1C2226]">
      <Header onOpenBooking={openBooking} />

      <main className="flex-1">
        <HeroSection onOpenBooking={openBooking} />
        <MetricsBar />
        <ServicesBento onSelectService={openBooking} />
        <LossCalculator onBookRepair={openRepairFromCalculator} />
        <AuditProcess />
      </main>

      <FooterDispatch />

      <BookingModal
        isOpen={bookingOpen}
        initialContext={bookingContext}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
