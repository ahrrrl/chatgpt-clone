'use client';

import { useFormValidate } from '@/hooks/useFormVaildate';
import { useActionState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FormCard } from './FormCard';
import { Label } from '@radix-ui/react-label';
import { FormMessage } from './FormMessage';
import { Input } from '../ui/input';
import { Submit } from './Submit';
import { TSignUpForm } from '@/types/form';
import { LoginSchema } from '@/schemas/auth';
import { login } from '@/actions/login';

export function LoginForm() {
  const [error, action, isPending] = useActionState(login, undefined);
  const { errors, validateField } = useFormValidate<TSignUpForm>(LoginSchema);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title='회원가입'
      footer={{ label: '아직 계정이 없으신가요?', href: '/signup' }}
    >
      <form className='space-y-6'>
        <div className='space-y-1'>
          <Label htmlFor='email'>이메일</Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='example@example.com'
            onChange={handleChange}
            error={!!errors?.name}
          />
          {errors?.email && <FormMessage message={errors.email[0]} />}
        </div>
        <div className='space-y-1'>
          <Label htmlFor='password'>비밀번호</Label>
          <Input
            id='password'
            name='password'
            type='password'
            placeholder='********'
            onChange={handleChange}
            error={!!errors?.name}
          />
          {errors?.password && <FormMessage message={errors.password[0]} />}
        </div>
        <Submit className='w-full' formAction={action} disabled={isPending}>
          {isPending ? '로그인중...' : '로그인'}
        </Submit>
      </form>
    </FormCard>
  );
}
