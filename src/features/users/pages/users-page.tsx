import { useUsers } from '../hooks/use-users';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card/card';
import { Badge } from '../../../components/ui/badge/badge';

export const UsersPage = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-8">Error loading users.</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">Manage system users.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user: import('../types/user.types').User) => (
          <Card key={user.id} className="flex flex-col group animate-fade-in-up hover:-translate-y-1.5 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <CardTitle className="line-clamp-1 text-xl font-bold tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors">{user.name}</CardTitle>
                  <p className="text-sm font-semibold text-gray-500">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>{user.role}</Badge>
            </CardContent>
          </Card>
        ))}
        {users?.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
