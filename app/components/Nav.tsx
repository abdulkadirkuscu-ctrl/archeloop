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
    <header className="sticky top-0 z-50 border-b border-yellow-300/10 bg-[#030712]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-stone-100 transition duration-300 hover:text-yellow-300"
        >
          ArcheLoop
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-stone-300 transition duration-300 hover:text-yellow-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {loggedIn ? (
            <Link
              href="/account"
              className="text-sm font-medium text-stone-300 transition duration-300 hover:text-yellow-300"
            >
              My Account
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-stone-300 transition duration-300 hover:text-yellow-300"
              >
                Log In
              </Link>

              <Link
                href="/auth/signup"
                className="hidden rounded-full border border-yellow-300/20 px-5 py-2 text-sm font-semibold text-yellow-200 transition duration-300 hover:border-yellow-300/60 md:block"
              >
                Create Account
              </Link>
            </>
          )}

          <Link
            href="/triggered"
            className="rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-yellow-200"
          >
            I Am Triggered
          </Link>
        </div>
      </nav>
    </header>
  );
}