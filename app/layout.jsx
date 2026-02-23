import "./globals.css";
import 'tailwind-scrollbar-hide'
export const metadata = {
  title: "CineScope",
  description: "Movie App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex w-screen h-screen bg-[#1F1E24]">
        {children}
      </body>
    </html>
  );
}
