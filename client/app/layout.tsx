import { Footer, Navbar } from '@/components';
import './globals.css';
import Providers from '@/redux/provider';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata: Metadata = {
    title: 'Antique Auction',
    description: 'A website which will take you back to the 16th century',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="relative overflow-x-hidden">
                <Providers>
                    {/* <Navbar /> */}
                    {children}
                    {/* <Footer /> */}
                </Providers>
                <ToastContainer />
            </body>
        </html>
    );
}
