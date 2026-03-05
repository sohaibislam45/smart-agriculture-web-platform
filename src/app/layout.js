import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD

import { Providers } from "./Providers";
=======

import { AuthProvider } from "@/contexts/AuthProvider";

import { Providers } from "./Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

>>>>>>> 972f96042db38cf9db8356a79e457133b9d42a58
import Header from "@/components/shared/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
<<<<<<< HEAD
  title: "SmartAgri",
  description: "Smart Agriculture Platform",
=======

 
  title: "Smart Agriculture Platform",
  description: "Smart agriculture solution",

>>>>>>> 972f96042db38cf9db8356a79e457133b9d42a58
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>

          {/* Header */}
          <Header />

          {/* Page content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Toast notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />

        </Providers>
      </body>
    </html>
  );
}