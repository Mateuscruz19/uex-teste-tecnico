'use client';

import { useRouter } from 'next/navigation';

export function useAccount() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('authToken');
    router.push('/'); // Redireciona para a página de login
  };

  const deleteAccount = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token não encontrado!');
      return false;
    }

    try {
      const response = await fetch('http://localhost:5160/api/user/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('authToken'); // Remove o token
        router.push('/'); // Redireciona para a página de login
        return true;
      } else {
        console.error('Erro ao excluir a conta:', response.status);
        return false;
      }
    } catch (err) {
      console.error('Erro ao conectar-se à API:', err);
      return false;
    }
  };

  return { logout, deleteAccount };
}
