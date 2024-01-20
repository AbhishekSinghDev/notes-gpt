import NavBar from "@/components/shared/NavBar";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "NotesGPT - Notes",
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="p-4 max-w-7xl m-auto">{children}</main>
    </>
  );
};

export default Layout;
