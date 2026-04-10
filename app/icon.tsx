import { ImageResponse } from 'next/og'

export const size = {
  width: 1024,
  height: 1024,
}

export const contentType = 'image/png'

function ShieldMark() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#7b1830',
      }}
    >
      <div
        style={{
          width: '84%',
          height: '84%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <svg
          viewBox="0 0 512 512"
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <path
            d="M256 42 L420 62 L420 236 C420 346 356 436 256 486 C156 436 92 346 92 236 L92 62 Z"
            fill="#cfb77b"
          />
        </svg>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#7b1830',
            fontFamily: 'Georgia, Times New Roman, serif',
            fontSize: 300,
            lineHeight: 1,
            transform: 'translateY(-6px)',
            position: 'relative',
            fontWeight: 700,
          }}
        >
          L
        </div>
      </div>
    </div>
  )
}

export default function Icon() {
  return new ImageResponse(<ShieldMark />, size)
}
