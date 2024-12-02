import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Target, 
  Calculator,
  LogOut,
  User,
  Shield,
  Menu,
  X,
  Building2,
  Users
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = user?.email === 'jacob.sannon@worldclasscfos.com';
  const isFirmUser = user?.role === 'firm';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ...(isFirmUser ? [{ id: 'clients', label: 'Clients', icon: Users }] : []),
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'opportunities', label: 'Opportunities', icon: Target },
    { id: 'estate', label: 'Entity Estate', icon: Building2 },
    { id: 'tax-planning', label: 'Tax Planning', icon: Calculator },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Shield }] : []),
  ];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleTabChange = (id: string) => {
    onTabChange(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md md:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:w-16 lg:w-64
      `}>
        <div className="flex flex-col h-full py-6">
          <div className="flex justify-center mb-8">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
          
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="relative group px-2">
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center p-3 rounded-md transition-colors
                      ${activeTab === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                      }
                      md:justify-center lg:justify-start
                    `}
                  >
                    <Icon className="w-6 h-6 flex-shrink-0" />
                    <span className="ml-3 hidden lg:block">{item.label}</span>
                  </button>
                  
                  {/* Desktop Tooltip */}
                  <div className="hidden md:group-hover:block lg:hidden absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50">
                    <div className="bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="px-2">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-full flex items-center p-3 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 md:justify-center lg:justify-start"
              >
                <User className="w-6 h-6 flex-shrink-0" />
                <span className="ml-3 hidden lg:block">Profile</span>
              </button>

              {/* User Menu */}
              {showUserMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.displayName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};