import './globals.css';

import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';

export const metadata = {
  title: 'Accounts Dashboard',
  description:
    "A user's account admin dashboard configured with Next.js, Tailwind CSS, TypeScript, ESLint, and Prettier."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Toast />
      </body>
    </html>
  );
}
