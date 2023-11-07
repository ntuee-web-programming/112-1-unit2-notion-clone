type Props = {
  children: React.ReactNode;
  ssr: React.ReactNode;
  csr: React.ReactNode;
};

function Layout({ children, ssr, csr }: Props) {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex h-1/2 w-full">
        <div className="w-1/2 border">{ssr}</div>
        <div className="w-1/2 border">{csr}</div>
      </div>

      {children}
    </div>
  );
}

export default Layout;
