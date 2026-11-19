import { useRef, useState } from 'react';
import { ArrowRight, Calculator, Pause, Play } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (service?: string) => void;
}

const HERO_VIDEO_URL = 'https://assets.mixkit.co/videos/47094/47094-720.mp4';
const HERO_VIDEO_FALLBACK_URL = 'https://assets.mixkit.co/videos/47097/47097-720.mp4';
const HERO_POSTER_URL = '/assets/hero-solar-poster.jpg';

export function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  const togglePlayback = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="top"
      className="relative bg-[#1C2226] border-b border-[#DCD9D0] overflow-hidden"
    >
      {/* Full-bleed Daylight Solar Video Frame */}
      <div className="relative min-h-[540px] lg:min-h-[620px] flex flex-col justify-between">
        {/* Background Media Layer */}
        <div className="absolute inset-0 z-0 bg-[#1C2226]">
          {!videoFailed ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              poster={HERO_POSTER_URL}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setVideoFailed(true)}
              className="w-full h-full object-cover object-center"
              aria-label="Daylight aerial footage of commercial photovoltaic solar panel arrays"
            >
              <source src={HERO_VIDEO_URL} type="video/mp4" />
              <source src={HERO_VIDEO_FALLBACK_URL} type="video/mp4" />
            </video>
          ) : (
            <img
              src={HERO_POSTER_URL}
              alt="Commercial photovoltaic solar panel rows under natural daylight"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          )}

          {/* Directional dark scrim on left side only so right side of solar video stays clear and bright */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(28,34,38,0.82) 0%, rgba(28,34,38,0.35) 100%)',
            }}
          />
        </div>

        {/* Main Hero Content Container */}
        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 md:px-6 pt-16 pb-12 md:pt-20 md:pb-20 flex-1 flex items-center">
          <div className="max-w-2xl">
            <p className="text-xs md:text-sm font-medium text-[#EFECE6]/90 tracking-tight mb-4 flex items-center gap-2.5">
              <span className="inline-block w-2.5 h-2.5 bg-[#D96B27] shrink-0" aria-hidden="true" />
              <span>PV Diagnostics, Thermal Auditing &amp; Field Remediation</span>
            </p>

            <h1
              className="text-white font-bold leading-[1.08] tracking-tight mb-5"
              style={{
                fontSize: 'clamp(2.25rem, 4.2vw, 3.65rem)',
                textWrap: 'balance',
              }}
            >
              Restoring Peak Output to Underperforming Solar Arrays
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#EFECE6]/90 leading-relaxed max-w-xl mb-8">
              Precision thermal diagnostics, micro-crack restoration, and rapid inverter repair for
              commercial and residential PV systems.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenBooking('Drone & Thermal Micro-Crack Inspection')}
                className="inline-flex items-center gap-2.5 px-5 md:px-6 py-3 md:py-3.5 bg-[#D96B27] hover:bg-[#BE581A] text-white text-sm md:text-base font-semibold rounded-[4px] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Book Thermal Inspection</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#calculator"
                className="inline-flex items-center gap-2.5 px-4 md:px-5 py-3 md:py-3.5 bg-[#1C2226]/75 hover:bg-[#1C2226] text-[#F7F7F5] border border-white/35 text-sm md:text-base font-medium rounded-[4px] transition-colors whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 text-[#D96B27]" aria-hidden="true" />
                <span>Calculate Energy Loss</span>
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Play/Pause Toggle in bottom-right corner on desktop, top-right on mobile */}
        {!videoFailed && (
          <button
            type="button"
            onClick={togglePlayback}
            data-testid="hero-video-toggle"
            aria-pressed={!isPlaying}
            aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
            className="absolute top-4 right-4 md:top-auto md:bottom-16 md:right-6 z-20 inline-flex items-center gap-2 px-3 py-1.5 md:py-2 bg-[#1C2226]/85 hover:bg-[#1C2226] text-[#F7F7F5] border border-white/25 rounded-[4px] text-xs font-medium transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#D96B27]" aria-hidden="true" />
                <span>Pause Feed</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#D96B27]" aria-hidden="true" />
                <span>Play Feed</span>
              </>
            )}
          </button>
        )}

        {/* Bottom Technical Status Bar */}
        <div className="relative z-10 border-t border-white/15 bg-[#1C2226]/90">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-3 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 text-xs text-[#CBD1D6]">
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <span className="text-[#9AA3AA]">Service Scope:</span>
              <span className="text-white font-medium">Commercial, Industrial &amp; Residential PV</span>
            </div>
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <span className="text-[#9AA3AA]">IR Sensor Spec:</span>
              <span className="font-mono-num text-white">640 × 512 px · ΔT 0.03°C</span>
            </div>
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <span className="text-[#9AA3AA]">Dispatch SLA:</span>
              <span className="text-[#78B6AF] font-medium">&lt;24h On-Site Mobilization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
