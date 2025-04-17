import { trpc } from '@/lib/trpc';
import { useCallback } from 'react';

export function useAuth() {
  const utils = trpc.useContext();
  const session = trpc.auth.getSession.useQuery();
  const signIn = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      utils.auth.getSession.invalidate();
    },
  });
  const signUp = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      utils.auth.getSession.invalidate();
    },
  });
  const signOut = trpc.auth.signOut.useMutation({
    onSuccess: () => {
      utils.auth.getSession.invalidate();
    },
  });

  const handleSignIn = useCallback(
    async (email: string, password: string) => {
      try {
        await signIn.mutateAsync({ email, password });
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
      }
    },
    [signIn]
  );

  const handleSignUp = useCallback(
    async (email: string, password: string) => {
      try {
        await signUp.mutateAsync({ email, password });
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
      }
    },
    [signUp]
  );

  const handleSignOut = useCallback(async () => {
    try {
      await signOut.mutateAsync();
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'An error occurred' };
    }
  }, [signOut]);

  return {
    session: session.data,
    isLoading: session.isLoading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };
} 