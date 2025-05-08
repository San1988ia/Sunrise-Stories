import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-background">
      <Navbar />

      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
