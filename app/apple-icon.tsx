import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#cfb77b',
            clipPath: 'polygon(50% 4%, 92% 9%, 92% 46%, 84% 67%, 72% 81%, 50% 96%, 28% 81%, 16% 67%, 8% 46%, 8% 9%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#7b1830',
            fontFamily: 'Georgia, Times New Roman, serif',
            fontSize: 52,
            lineHeight: 1,
            transform: 'translateY(-2px)',
            position: 'relative',
          }}
        >
          L
        </div>
      </div>
    </div>
  )
}

export default function AppleIcon() {
  return new ImageResponse(<ShieldMark />, size)
}
