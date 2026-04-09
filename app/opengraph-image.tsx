import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'London Language Academy'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#70212c',
          position: 'relative',
        }}
      >
        {/* Gold accent top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: '#c3ab73',
          }}
        />

        {/* Gold badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(195,171,115,0.5)',
            borderRadius: 999,
            padding: '8px 24px',
            marginBottom: 32,
          }}
        >
          <span style={{ color: '#c3ab73', fontSize: 18, fontWeight: 600, letterSpacing: 4 }}>
            LONDON LANGUAGE ACADEMY
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.1,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Expert Language Courses
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 28,
            textAlign: 'center',
            maxWidth: 700,
            marginBottom: 40,
          }}
        >
          Central London · Bursa · Istanbul
        </div>

        {/* Language chips */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['🇬🇧 English', '🇩🇪 German', '🇪🇸 Spanish', '🇫🇷 French', '🇮🇹 Italian'].map((lang) => (
            <div
              key={lang}
              style={{
                backgroundColor: 'rgba(195,171,115,0.15)',
                border: '1px solid rgba(195,171,115,0.4)',
                borderRadius: 8,
                padding: '8px 16px',
                color: '#c3ab73',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {lang}
            </div>
          ))}
        </div>

        {/* Gold accent bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: '#c3ab73',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
