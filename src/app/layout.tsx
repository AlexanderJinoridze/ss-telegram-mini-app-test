import { useEffect, type PropsWithChildren } from "react";
import type { Metadata } from "next";

import { Root } from "@/components/Root/Root";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";

export const metadata: Metadata = {
  title: "Your Application Title Goes Here",
  description: "Your application description goes here",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=cabin,chair,check,close,home,home_work,hotel,keyboard_arrow_down,keyboard_arrow_left,keyboard_arrow_right,location_on,psychiatry,search,view_cozy"
        />
      </head>
      <body>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
