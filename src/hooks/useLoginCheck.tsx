import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function useLoginCheck() {
  const router = useRouter();
  useEffect(() => {
    try {
      const { exp } = jwtDecode(localStorage.getItem('token'));
      if (exp < Date.now() / 1000) {
        throw Error('JWT token has expired');
      }
    } catch {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);
}
