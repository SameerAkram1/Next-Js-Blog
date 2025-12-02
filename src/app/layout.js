"use client";

import { Provider } from "react-redux";
import { store } from "../../redux/store";
import "./globals.css";
import Navbar from "./_component/Navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
           <SessionProvider>    
          <Navbar />
          {children}
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}

