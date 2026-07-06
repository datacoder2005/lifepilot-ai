import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifePilot AI - Your Autonomous Life Co-Pilot",
  description: "Leverage advanced AI agents to plan schedules, track goals, analyze decisions, write emails, generate roadmap research, manage wellness, and adapt to emergencies.",
  metadataBase: new URL("https://lifepilot-ai.vercel.app"),
  openGraph: {
    title: "LifePilot AI - Your Autonomous Life Co-Pilot",
    description: "An autonomous AI agent platform for personal productivity and wellness optimization, built for the Kaggle AI Agents Intensive Capstone.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#030014] text-gray-100 selection:bg-brand-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
