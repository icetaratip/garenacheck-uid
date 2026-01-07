import { Prompt } from 'next/font/google';
import './globals.css';

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'UID Checker - Freefire & ROV',
  description: 'ตรวจสอบ UID ผู้เล่นเกม Freefire และ ROV',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={prompt.className}>{children}</body>
    </html>
  );
}
