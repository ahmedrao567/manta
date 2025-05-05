'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from '../Authentication/Firebase'; // adjust if needed

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/'); // Prevents back navigation to protected pages
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p className="text-center mt-10 text-white">Loading...</p>;
  }

  return children;
};

export default ProtectedRoute;
