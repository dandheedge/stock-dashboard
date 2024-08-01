import type React from "react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center min-h-screen bg-gray-100">
      <div className="w-full h-screen bg-white shadow-lg">
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
