import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "AI Career Roadmap Generator | Margdarshak AI Style",
  description: "Generate beautiful, structured, and customized career roadmaps powered by intelligent guidance, tailored to your experience and skills.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "AI Career Roadmap Generator",
    description: "Generate structured, professional career development timelines instantly.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} font-outfit antialiased bg-brand-cream text-brand-slate`}
      >
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#F5F2EB',
              color: '#1E201E',
              border: '1px solid rgba(216, 210, 196, 0.8)',
              fontFamily: 'var(--font-outfit)',
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            },
            success: {
              iconTheme: {
                primary: '#1E201E',
                secondary: '#F5F2EB',
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
