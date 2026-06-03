import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const alt = 'Adam Pukaluk full-stack developer portfolio preview';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: '#030303',
          color: '#ffffff',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -120,
            top: 70,
            width: 760,
            height: 160,
            transform: 'rotate(58deg)',
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)',
            opacity: 0.9,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -180,
            bottom: 70,
            width: 860,
            height: 150,
            transform: 'rotate(-28deg)',
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 980,
            height: 420,
            border: '1px solid rgba(255,255,255,0.13)',
            borderRadius: 34,
            background: 'rgba(255,255,255,0.045)',
            boxShadow: '0 42px 120px rgba(0,0,0,0.65)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '10px 18px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.13)',
              background: 'rgba(0,0,0,0.45)',
              color: 'rgba(255,255,255,0.68)',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: '#ffffff',
              }}
            />
            Portfolio
          </div>

          <div
            style={{
              marginTop: 38,
              fontSize: 94,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            Adam Pukaluk
          </div>

          <div
            style={{
              marginTop: 24,
              fontSize: 36,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.74)',
            }}
          >
            Full-Stack Developer
          </div>

          <div
            style={{
              marginTop: 34,
              display: 'flex',
              gap: 14,
              color: 'rgba(255,255,255,0.62)',
              fontSize: 24,
              fontFamily: 'monospace',
            }}
          >
            <span>Next.js</span>
            <span>/</span>
            <span>AI</span>
            <span>/</span>
            <span>Automation</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
