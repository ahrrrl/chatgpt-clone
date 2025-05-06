'use client';

import { SignUpSchema } from '@/schemas/auth';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormCard } from './FormCard';
import { Submit } from './Submit';
import { useFormValidate } from '@/hooks/useFormVaildate';
import { TSignUpForm } from '@/types/form';
import { FormMessage } from './FormMessage';
import { useActionState, useEffect } from 'react';
import { signUp } from '@/actions/signup';
import toast from 'react-hot-toast';

export function SignUpForm() {
  const [error, action, isPending] = useActionState(signUp, undefined);
  const { errors, validateField } = useFormValidate<TSignUpForm>(SignUpSchema);
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
      footer={{ label: '이미 계정이 있으신가요?', href: '/login' }}
    >
      <form className='space-y-6'>
        <div className='space-y-1'>
          <Label htmlFor='name'>이름</Label>
          <Input
            id='name'
            name='name'
            placeholder='이름을 입력해주세요'
            onChange={handleChange}
            error={!!errors?.name}
          />
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div>
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
          {isPending ? '가입중...' : '가입하기'}
        </Submit>
      </form>
    </FormCard>
  );
}
