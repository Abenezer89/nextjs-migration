import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/user';

interface UserContextType {
  user: User;
  setRole: (role: UserRole) => void;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    // Try to get the role from localStorage, default to JOB_SEEKER
    const savedRole = localStorage.getItem('userRole') as UserRole;
    return {
      role: savedRole || 'JOB_SEEKER',
      isLoggedIn: false,
    };
  });

  const setRole = (role: UserRole) => {
    setUser(prev => ({ ...prev, role }));
    localStorage.setItem('userRole', role);
  };

  const login = () => {
    setUser(prev => ({ ...prev, isLoggedIn: true }));
  };

  const logout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
  };

  return (
    <UserContext.Provider value={{ user, setRole, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 