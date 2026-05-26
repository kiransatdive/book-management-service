import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card/card';
import { Button } from '../../../components/common/button/button';
import { Input } from '../../../components/common/input/input';
import { UserPlus } from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    
    // Simulate API call and save to local storage
    setTimeout(() => {
      localStorage.setItem('mock_user', JSON.stringify({ name, email }));
      setIsLoading(false);
      navigate('/login');
    }, 800);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] items-center justify-center animate-fade-in-up">
      <Card className="w-full max-w-md shadow-xl border-white/60 bg-white/70 backdrop-blur-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-brand-100 p-3 rounded-full w-12 h-12 flex items-center justify-center text-brand-600 mb-2">
            <UserPlus className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">Create an Account</CardTitle>
          <p className="text-sm text-gray-500">Join us to manage your favorite books</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              label="Full Name"
              type="text"
              required
              placeholder="John Doe"
            />
            <Input
              name="email"
              label="Email Address"
              type="email"
              required
              placeholder="you@example.com"
            />
            <Input
              name="password"
              label="Password"
              type="password"
              required
              placeholder="••••••••"
            />
            <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100 pt-4 mt-2">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700 hover:underline transition-colors">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
