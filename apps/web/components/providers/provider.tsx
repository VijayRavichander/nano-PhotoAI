"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/themeprovider"

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider appearance={{ layout: { logoPlacement: "inside" } }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}