export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <main>
        Sidebar
        {children}
    </main>
  );
}
