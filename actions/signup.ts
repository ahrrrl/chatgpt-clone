'use server';

import { getUserByEmail } from '@/data/user';
import db from '@/db';
import { usersTable } from '@/db/schema';
import { SignUpSchema } from '@/schemas/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export const signUp = async (_: unknown, formData: FormData) => {
  // 1. 유효성검사
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errorMessage: '잘못된 입력값이 있습니다.',
    };
  }

  // 2 존재하는 사용자인지 체크
  // 3. insert db
  // 4. 성공/실패 처리
  const { email, name, password } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        errorMessage: '이미 존재하는 사용자 입니다.',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .insert(usersTable)
      .values({ name, email, password: hashedPassword });
  } catch (error) {
    console.error('error', error);
    return { errorMessage: '문제가 발생했습니다.' };
  }
  redirect('/auth/signin');
};
