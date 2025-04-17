import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function AuthForm() {
  const { signIn, signUp, signOut, session, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, type: 'signin' | 'signup') => {
    e.preventDefault();
    setError(null);

    const result = await (type === 'signin' 
      ? signIn(email, password)
      : signUp(email, password));

    if (result.error) {
      setError(result.error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="p-4">
        <p>Logged in as: {session.user.email}</p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <form className="space-y-4">
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="space-x-4">
          <button
            onClick={(e) => handleSubmit(e, 'signin')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Sign In
          </button>
          <button
            onClick={(e) => handleSubmit(e, 'signup')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
} 