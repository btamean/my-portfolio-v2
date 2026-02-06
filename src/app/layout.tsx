// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {/* 필요한 경우 여기에 Framer Motion 전역 설정을 추가하세요 */}
        {children}
      </body>
    </html>
  );
}