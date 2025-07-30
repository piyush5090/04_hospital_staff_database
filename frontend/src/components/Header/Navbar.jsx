import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // ✅ clear PASSKEY and other data
    navigate("/");        // ✅ redirect to login page
  };

  return (
    <div className="h-[60px] px-4 w-full bg-gray-700 flex justify-between items-center">
      {/* Logo and hospital name */}
      <div className="flex items-center gap-2">
        <img
          src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
          alt="Hospital logo"
          className="h-12 w-12 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h3 className="text-xl font-poppins text-slate-200">We Care Hospital</h3>
      </div>

      {/* Nav Links */}
      <div className="flex gap-4 items-center">
        <NavLink
          to={localStorage.getItem("PASSKEY") ? "/home" : "/"}
          end
          className={({ isActive }) =>
            `text-md font-poppins ${isActive ? "text-blue-300 font-bold" : "text-slate-200"}`
          }
        >
          Home
        </NavLink>


        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-md font-poppins ${isActive ? "text-blue-300 font-bold" : "text-slate-200"}`
          }
        >
          About
        </NavLink>

        {localStorage.getItem("PASSKEY") && (
          <button
            onClick={handleLogout}
            className="text-red-400 underline text-sm hover:text-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
