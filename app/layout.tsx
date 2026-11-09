import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "./globals.css";
import PortfolioEntrance from "@/components/PortfolioEntrance";
export const metadata: Metadata = { title: "Hana Humaira — Software Quality Assurance Engineer", description: "Software Quality Assurance Engineer with a developer’s understanding and a user-centered approach to quality. Explore Hana Humaira’s experience, projects, and skills." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><PortfolioEntrance>{children}</PortfolioEntrance></body></html>; }
