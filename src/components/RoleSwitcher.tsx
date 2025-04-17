import React from 'react';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/user';

const RoleSwitcher: React.FC = () => {
  const { user, setRole, login, logout } = useUser();

  const roles: UserRole[] = ['JOB_SEEKER', 'EMPLOYER', 'ADMIN'];

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
      <div className="space-y-2">
        <div className="text-sm font-medium">Current Role: {user.role}</div>
        <div className="flex gap-2">
          {roles.map((role) => (
            <Button
              key={role}
              variant={user.role === role ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRole(role)}
            >
              {role}
            </Button>
          ))}
        </div>
        <Button
          variant={user.isLoggedIn ? 'destructive' : 'default'}
          size="sm"
          onClick={user.isLoggedIn ? logout : login}
        >
          {user.isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </div>
    </div>
  );
};

export default RoleSwitcher; 