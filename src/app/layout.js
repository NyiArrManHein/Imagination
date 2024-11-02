import NavBar from "./components/NavBar";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
