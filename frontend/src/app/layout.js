import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "AI Career Roadmap Generator | PathCraft AI",
  description: "Generate beautiful, structured, and customized career roadmaps powered by intelligent guidance, tailored to your experience and skills.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "PathCraft AI - Career Roadmap Generator",
    description: "Generate structured, professional career development timelines instantly.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${outfit.variable} font-outfit antialiased bg-brand-bg text-brand-primary`}
      >
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FCFBF8',
              color: '#111111',
              border: '1px solid rgba(232, 226, 216, 0.8)',
              fontFamily: 'var(--font-outfit)',
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            },
            success: {
              iconTheme: {
                primary: '#111111',
                secondary: '#FCFBF8',
              },
            },
          }}
        />
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
