import { Outlet, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="sticky top-4 z-30 w-full max-w-7xl mx-auto px-4">
        <div className="rounded-2xl border border-white/60 bg-white/70 shadow-lg shadow-brand-500/5 backdrop-blur-xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group transition-all">
            <div className="bg-gradient-to-br from-brand-500 to-brand-600 p-2 rounded-xl text-white shadow-md group-hover:scale-105 transition-transform duration-300 group-hover:shadow-brand-500/30">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">BookManager</span>
          </Link>
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
