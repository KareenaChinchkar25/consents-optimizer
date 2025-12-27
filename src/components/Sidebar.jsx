import { Home, User, Clock, Settings, ShieldAlert } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "History", icon: Clock, path: "/history" },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Risk Insights", icon: ShieldAlert, path: "/risk-insights" },
];

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Title */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-lg font-bold text-gray-900">
          Consent Manager
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `
              w-full flex items-center gap-3 px-4 py-2.5 rounded-md
              text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }
            `
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
