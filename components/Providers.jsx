"use client";

import { CartProvider } from "../lib/CartContext";
import { SITE_ACTIVE } from "../lib/constants";

export default function Providers({ children }) {
  if (!SITE_ACTIVE) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight mb-3">
          P. Corner
        </h1>
        <p className="text-white/60 text-lg">We'll be back soon</p>
        <p className="text-white/60 text-lg">
          Please contact the site admin for more
        </p>
      </div>
    );
  }

  return <CartProvider>{children}</CartProvider>;
}
