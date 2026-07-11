import { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  return (
    <main className="al-page min-h-screen">
      <Nav />

      {children}

      <Footer />
    </main>
  );
}