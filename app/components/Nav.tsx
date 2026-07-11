"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";

const navItems = [
  {
    label: "Shadow Loops",
    href: "/loops",
  },
  {
    label: "Find My Loop",
    href: "/assessment",
  },
  {
    label: "Integration",
    href: "/integration",
  },
];

export default function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      setLoggedIn(!!session);

      const {
        data: { subscription },
      } = supabaseClient.auth.onAuthStateChange((_event, session) => {
        setLoggedIn(!!session);
      });

      return () => subscription.unsubscribe();
    }

    checkUser();
  }, []);

  return (
    <header className="al-site-header sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="al-brand-name">
          ArcheLoop
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="al-nav-link"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {loggedIn ? (
            <Link
              href="/account"
              className="al-nav-link"
            >
              My Account
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="al-nav-link"
              >
                Log In
              </Link>

              <Link
                href="/auth/signup"
                className="al-button-secondary hidden px-5 py-2 text-sm md:inline-flex"
              >
                Create Account
              </Link>
            </>
          )}

          <Link
            href="/triggered"
            className="al-button-primary px-6 py-3 text-sm"
          >
            I Am Triggered
          </Link>
        </div>
      </nav>
    </header>
  );
}