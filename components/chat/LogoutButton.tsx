'use client';
import { deleteSession } from '@/actions/sessions';
import { Button } from '../ui/button';

export function LogoutButton() {
  return (
    <Button onClick={() => deleteSession()} className='w-[80%] bg-blue-900'>
      로그아웃
    </Button>
  );
}
