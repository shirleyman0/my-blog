import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)',
          color: 'white',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.85, marginBottom: 18 }}>Mike Blog</div>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.1 }}>我的博客</div>
        <div style={{ marginTop: 24, fontSize: 36, opacity: 0.9 }}>分享技术、思考和生活</div>
      </div>
    ),
    {
      ...size,
    }
  )
}
