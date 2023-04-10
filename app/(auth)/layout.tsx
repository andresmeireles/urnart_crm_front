import Nav from "./Nav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
