import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prometeo Web",
  description: "Información importante de vehículos",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isAuthed = await isAuthenticated();

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex justify-between items-center py-8 px-24">
          <h1 className="font-bold text-2xl">Prometeo</h1>

          {isAuthed ? (
            <Button variant={"secondary"}>
              <LogoutLink> Logout </LogoutLink>
            </Button>
          ) : (
            <div className="flex gap-2">
              <LoginLink>
                <Button variant={"secondary"}>Login</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Register</Button>
              </RegisterLink>
            </div>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
