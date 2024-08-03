import type React from "react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-800 gap-4">
      <div className="max-w-[1280px] w-full max-h-screen overflow-auto bg-neutral-950 shadow-lg rounded-lg">
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
