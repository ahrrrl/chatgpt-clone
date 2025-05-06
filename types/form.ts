export interface TSignUpForm {
  name?: string[];
  email?: string[];
  password?: string[];
}

export type TLoginForm = Omit<TSignUpForm, 'name'>;
