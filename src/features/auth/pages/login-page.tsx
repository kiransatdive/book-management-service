import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card/card';
import { Button } from '../../../components/common/button/button';
import { Input } from '../../../components/common/input/input';
import { LogIn } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('is_authenticated', 'true');
      setIsLoading(false);
      // We can dispatch a custom event so the layout can update its state
      window.dispatchEvent(new Event('auth_change'));
      // Redirect to the profile page
      navigate('/profile');
    }, 800);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] items-center justify-center animate-fade-in-up">
      <Card className="w-full max-w-md shadow-xl border-white/60 bg-white/70 backdrop-blur-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-brand-100 p-3 rounded-full w-12 h-12 flex items-center justify-center text-brand-600 mb-2">
            <LogIn className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">Welcome Back</CardTitle>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="you@example.com"
            />
            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                required
                placeholder="••••••••"
              />
              <div className="flex justify-end pt-1">
                <a href="#" className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100 pt-4 mt-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-brand-600 hover:text-brand-700 hover:underline transition-colors">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
