import type { Metadata } from "next";

import "@/styles/global.scss";

export const metadata: Metadata = {
  icons: [
    {
      href: "/favicon.ico",
      rel: "icon",
      url: "/favicon.ico",
    }
  ],
  title: "File Explorer",
  description: "Generated by LSNXUV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
