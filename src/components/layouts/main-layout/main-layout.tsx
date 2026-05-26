import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BookOpen, User,  UserPlus, LogOut } from 'lucide-react';
import { Button } from '../../common/button/button';

export const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('is_authenticated') === 'true');
    };
    
    checkAuth();
    
    window.addEventListener('auth_change', checkAuth);
    return () => window.removeEventListener('auth_change', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('is_authenticated');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="sticky top-4 z-30 w-full max-w-7xl mx-auto px-4">
        <div className="rounded-2xl border border-white/60 bg-white/70 shadow-lg shadow-brand-500/5 backdrop-blur-xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group transition-all">
              <div className="bg-gradient-to-br from-brand-500 to-brand-600 p-2 rounded-xl text-white shadow-md group-hover:scale-105 transition-transform duration-300 group-hover:shadow-brand-500/30">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">BookManager</span>
            </Link>
            <nav className="flex items-center gap-4">
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-brand-600 transition-colors">
                  Login
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 animate-fade-in">
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="text-gray-700 border-gray-200 hover:bg-gray-50">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50" title="Logout">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
      
      <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 max-w-7xl">
          <p>&copy; {new Date().getFullYear()} Book Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
