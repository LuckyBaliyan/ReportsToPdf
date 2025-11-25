import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

      <Navbar />

      <main className="flex-1 px-6 py-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
