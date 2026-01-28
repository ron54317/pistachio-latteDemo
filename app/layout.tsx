import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "The Ultimate Pistachio Latte | Premium Cold Brew Experience",
    description: "Experience the explosion of flavor. Roasted Sicilian pistachios meet dark roast intensity in this revolutionary cold brew.",
    keywords: ["pistachio latte", "cold brew", "premium coffee", "artisan coffee"],
    openGraph: {
        title: "The Ultimate Pistachio Latte",
        description: "Experience the explosion of flavor.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
