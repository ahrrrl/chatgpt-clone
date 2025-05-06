import { Button } from '../ui/button';

export function Submit({ children, ...props }: React.ComponentProps<'button'>) {
  return (
    <Button type='submit' {...props}>
      {children}
    </Button>
  );
}
