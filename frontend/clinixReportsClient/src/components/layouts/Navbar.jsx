import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png"; 

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition 
     ${isActive ? "text-indigo-600 font-semibold" : "text-gray-700 hover:text-indigo-500"}`;

  return (
    <nav className="w-full fixed top-0 left-0 px-4 py-4 bg-white z-50 border-b-2 border-gray-300 shadow-sm ">
      <div className="w-full h-14 px-2 sm:px-6 lg:px-2 py-4  flex items-center justify-between">

        <Link to="/" className="flex items-center  justify-center gap-1">
          <img
            src={logo}
            alt="logo"
            className="md:w-30 md:h-30 w-20 h-20 mt-2 object-cover"
          />
          <h1 className="text-2xl font-bold md:text-3xl  text-gray-900">Clinix Reports</h1>
        </Link>

        <div className="hidden md:flex items-center space-x-2 ">
          <NavLink to="/reports" className={navLinkClass}>Reports</NavLink>
          <NavLink to="/myreports" className={navLinkClass}>MyReports</NavLink>
          <NavLink to="/download-center" className={navLinkClass}>Downloads</NavLink>
        </div>

  
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/reports/create"
            className="px-4 py-2 bg-[#36E278] font-bold text-black rounded-md text-sm  hover:bg-[#36e278e7] transition"
          >
            + Create Report
          </Link>
        </div>

        <button
          className={`md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition`}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>


      {open && (
        <div className={`md:hidden border-t bg-white py-3 px-4 space-y-2 transition-transform duration-150 ease-in-out ${open?'translate-y-0':'-translate-y-50'}`}>
          <NavLink to="/reports" className={navLinkClass}>Reports</NavLink>
          <NavLink to="/myreports" className={navLinkClass}>MyReports</NavLink>
          <NavLink to="/download-center" className={navLinkClass}>Downloads</NavLink>

          <Link
            to="/reports/create"
            className="block w-full text-center px-4 py-2 mt-2 bg-[#36E278]   text-black font-bold rounded-md text-sm hover:bg-[#36e278e7]  transition"
          >
            + Create Report
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
