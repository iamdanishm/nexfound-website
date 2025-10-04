export const metadata = {
  title: "Nexfound Studio",
  robots: {
    index: false, // Don't let search engines index the Studio
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
