import React from "react";
import { Link } from "react-router";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
  isLoading?: boolean;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footer,
  isLoading = false,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 to-primary/10">
      <header className="py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-serif text-primary">
            Nova
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center sm:p-6 p-3">
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white shadow-xl rounded-lg p-8 border border-primary/10 text-center mx-auto flex flex-col items-center">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-serif text-gray-900 mb-2">
                {title}
              </h2>
              <p className="text-gray-600 text-sm">{subtitle}</p>
            </div>

            {isLoading ? (
              <div className="w-full space-y-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
                <div className="h-10 bg-primary/20 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mx-auto mt-4"></div>
              </div>
            ) : (
              children
            )}
          </div>

          {footer && (
            <div className="mt-8 text-center text-sm text-gray-600">
              {footer}
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 px-8 text-center text-sm text-gray-100">
        <p>© {new Date().getFullYear()} Nova. All rights reserved.</p>
      </footer>
    </div>
  );
}
