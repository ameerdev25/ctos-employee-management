import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"]
});

export const metadata: Metadata = {
  title: "CTOS Employee Management",
  description: "CTOS Assignment",
};

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string}
}>) {

  const messages = await getMessages()

  return (
    <html lang="en">
      <body className={`${kanit.className} text-neutral-700 bg-neutral-200`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <TabNavigation />
          {children}  
        </NextIntlClientProvider>        
      </body>
    </html>
  );
}
