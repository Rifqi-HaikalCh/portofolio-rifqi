import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rifqi Haikal';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
          background: '#F4F0E8',
          padding: '80px',
        }}
      >
        <div
          style={{
            width: 96,
            height: 4,
            background: '#8C3A2F',
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 84,
            lineHeight: 1,
            color: '#1B1916',
          }}
        >
          Rifqi Haikal
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 28,
            color: '#1B1916',
          }}
        >
          Software Engineer · C# · ASP.NET · SQL Server
        </div>
      </div>
    ),
    { ...size }
  );
}
