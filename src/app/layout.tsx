import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@fontsource/vazir';
import Script from 'next/script';

// [مهم] ThemeProvider را از فایلی که می‌سازیم وارد کنید
import { ThemeProvider } from './providers'; 
import AxiosProvider from './providers/AxiosProvider';
import ReactQueryProvider from './providers/ReactQueryProvider';
import Snackbar from '@/components/shared/Snackbar';
import InitialDataLoader from '@/components/InitialDataLoader';
import { ConfirmProvider } from '@/components/shared/ConfirmContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const vazirFont = 'font-vazir';

export const metadata: Metadata = {
  title: 'Pronet',
  description: 'مرکز خرید محصولات کامپیوتری استوک',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'next14', 'pwa', 'next-pwa'],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // [مهم] این پراپرتی برای جلوگیری از خطای hydration در next-themes ضروری است
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirFont} antialiased`}
      >
        {/* ThemeProvider باید تمام Provider های دیگر را در بر بگیرد */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <AxiosProvider>
              <ConfirmProvider>
                {children}
                <InitialDataLoader />
              </ConfirmProvider>
              <Snackbar />
            </AxiosProvider>
          </ReactQueryProvider>
        </ThemeProvider>

        {/* Goftino Script */}
        <Script
          id="goftino-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(){
                var i="DvTYQb",a=window,d=document;
                function g(){
                  var g=d.createElement("script"),
                      s="https://www.goftino.com/widget/"+i,
                      l=localStorage.getItem("goftino_"+i);
                  g.async=!0;
                  g.src=l?s+"?o="+l:s;
                  d.getElementsByTagName("head")[0].appendChild(g);
                }
                "complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);
              }();
            `,
          }}
        />
      </body>
    </html>
  );
}
