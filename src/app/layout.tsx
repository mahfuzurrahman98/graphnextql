'use client';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient';

// const geistSans = localFont({
//     src: './fonts/GeistVF.woff',
//     variable: '--font-geist-sans',
//     weight: '100 900',
// });
// const geistMono = localFont({
//     src: './fonts/GeistMonoVF.woff',
//     variable: '--font-geist-mono',
//     weight: '100 900',
// });

// export const metadata: Metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ApolloProvider client={client}>{children}</ApolloProvider>
            </body>
        </html>
    );
}

// 'use client';

// import { ApolloProvider } from '@apollo/client';
// import client from '@/lib/apolloClient';

// export default function RootLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return <ApolloProvider client={client}>

//       {children}
//     </ApolloProvider>;
// }
