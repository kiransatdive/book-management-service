import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card/card';
import { Button } from '../../../components/common/button/button';
import { User, Mail, LogOut, Shield } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
}

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('is_authenticated');
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Read the mocked user from localStorage
    const savedUser = localStorage.getItem('mock_user');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // Fallback to a default dummy user
        setUser({ name: 'Guest User', email: 'guest@example.com' });
      }
    } else {
      // Fallback to a default dummy user if they haven't registered
      setUser({ name: 'Guest User', email: 'guest@example.com' });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('is_authenticated');
    // We can dispatch a custom event so the layout can update its state
    window.dispatchEvent(new Event('auth_change'));
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-12 animate-fade-in-up">
      <Card className="shadow-lg border-white/60 bg-white/70 backdrop-blur-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-brand-500 to-brand-600"></div>
        <CardHeader className="relative pb-0 pt-0">
          <div className="absolute -top-12 left-6 bg-white p-2 rounded-2xl shadow-md border border-gray-100">
            <div className="bg-brand-50 rounded-xl w-20 h-20 flex items-center justify-center text-brand-600">
              <User className="w-10 h-10" />
            </div>
          </div>
          <div className="flex justify-end pt-4 pr-2">
            <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-8 space-y-6">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">{user.name}</CardTitle>
            <p className="text-gray-500 font-medium flex items-center mt-1">
              <Shield className="w-4 h-4 mr-1.5 text-brand-500" />
              Registered User
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-4">
            <div className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-3 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <Mail className="w-5 h-5 mr-3 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Email Address</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
