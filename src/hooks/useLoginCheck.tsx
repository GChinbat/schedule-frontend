import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function useLoginCheck() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }
  }, [router]);
}
