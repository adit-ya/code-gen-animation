import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Code Generation Animation Tool',
    description: 'Simple tool for creating code generation videos.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
