"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";

export default function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasIntegrationAccess, setHasIntegrationAccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAccess(session: { access_token: string } | null) {
      if (!mounted) return;

      setLoggedIn(!!session);

      if (!session?.access_token) {
        setHasIntegrationAccess(false);
        return;
      }

      try {
        const res = await fetch("/api/checkout/access", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        const data = await res.json();

        if (mounted) {
          setHasIntegrationAccess(Boolean(data.hasIntegrationAccess));
        }
      } catch {
        if (mounted) {
          setHasIntegrationAccess(false);
        }
      }
    }

    async function init() {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      await checkAccess(session);
    }

    init();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      checkAccess(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const navItems = [
    {
      label: "Shadow Loops",
      href: "/loops",
    },
    {
      label: "Find My Loop",
      href: "/assessment",
    },
    hasIntegrationAccess
      ? { label: "My Integration", href: "/integration-home" }
      : { label: "Integration", href: "/integration" },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="al-site-header sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 py-3 md:px-6 md:py-5">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="al-brand-name shrink-0" onClick={closeMenu}>
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

          <div className="hidden items-center gap-4 md:flex">
            {loggedIn ? (
              <Link href="/account" className="al-nav-link">
                My Account
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="al-nav-link">
                  Log In
                </Link>

                <Link
                  href="/auth/signup"
                  className="al-button-secondary px-5 py-2 text-sm"
                >
                  Create Account
                </Link>
              </>
            )}

            <Link
              href={hasIntegrationAccess ? "/triggered-intelligence" : "/triggered"}
              className="al-button-primary px-6 py-3 text-sm"
            >
              {hasIntegrationAccess ? "Triggered Pro" : "I Am Triggered"}
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--al-border)] bg-[var(--al-surface)] md:hidden"
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>

            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`block h-0.5 w-full rounded-full bg-[var(--al-text)] transition ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-full rounded-full bg-[var(--al-text)] transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-full rounded-full bg-[var(--al-text)] transition ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="mt-3 rounded-2xl border border-[var(--al-border)] bg-[var(--al-surface)] p-4 shadow-xl md:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="al-nav-link rounded-xl px-3 py-3"
                >
                  {item.label}
                </Link>
              ))}

              {loggedIn ? (
                <Link
                  href="/account"
                  onClick={closeMenu}
                  className="al-nav-link rounded-xl px-3 py-3"
                >
                  My Account
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={closeMenu}
                  className="al-nav-link rounded-xl px-3 py-3"
                >
                  Log In
                </Link>
              )}
            </div>

            <div className="mt-4 grid gap-2 border-t border-[var(--al-border)] pt-4">
              {!loggedIn && (
                <Link
                  href="/auth/signup"
                  onClick={closeMenu}
                  className="al-button-secondary w-full px-4 py-2.5 text-sm"
                >
                  Create Account
                </Link>
              )}

              <Link
                href={hasIntegrationAccess ? "/triggered-intelligence" : "/triggered"}
                onClick={closeMenu}
                className="al-button-primary w-full px-4 py-2.5 text-sm"
              >
                {hasIntegrationAccess ? "Triggered Pro" : "I Am Triggered"}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}