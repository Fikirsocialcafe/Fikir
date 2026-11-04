import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterPopup from "@/components/ui/NewsletterPopup";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fikircafe.com"),
  title: {
    default: "Fikir Coffee | Café de especialidad con impacto social",
    template: "%s | Fikir Coffee",
  },
  description:
    "Café de especialidad etíope y keniano con impacto social. Cada compra financia proyectos para la infancia en comunidades cafeteras de Etiopía.",
  keywords: [
    "café de especialidad",
    "café etiopía",
    "café kenia",
    "impacto social",
    "café con propósito",
    "specialty coffee",
    "fikir coffee",
    "café sin ánimo de lucro",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Fikir Coffee | Café con impacto en su origen",
    description:
      "Café de especialidad sin ánimo de lucro. Todo el beneficio se reinvierte en proyectos para la infancia en Etiopía y Kenia.",
    type: "website",
    locale: "es_ES",
    siteName: "Fikir Coffee",
    images: [{ url: "/images/etiopia-lifestyle.jpg", width: 1200, height: 630, alt: "Fikir Coffee - Café de especialidad con impacto social" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fikir Coffee | Café con impacto en su origen",
    description: "Café de especialidad sin ánimo de lucro. Todo el beneficio se reinvierte en proyectos para la infancia.",
    images: ["/images/etiopia-lifestyle.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        {/* Google Analytics placeholder */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        {/* Meta Pixel placeholder */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fikir Coffee",
              url: "https://www.fikircafe.com",
              description: "Café de especialidad etíope y keniano con impacto social",
              founder: { "@type": "Person", name: "Pablo Esteve Rozas" },
              sameAs: [],
            }),
          }}
        />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
        </CartProvider>
        <Footer />
        <NewsletterPopup />
      </body>
    </html>
  );
}
