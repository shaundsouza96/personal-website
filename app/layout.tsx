import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shaun D'Souza | Product Data Science",
  description:
    "Interactive explainers about experimentation, causal inference, and product data science.",
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
