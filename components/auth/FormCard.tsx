import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface Props {
  title: string;
  footer: { label: string; href: string };
  children: React.ReactNode;
}

export function FormCard({ title, footer, children }: Props) {
  return (
    <Card className='w-[500px]'>
      <CardHeader className='justify-center'>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className='justify-center'>
        <Link className='text-sm text-sky-700' href={footer.href}>
          {footer.label}
        </Link>
      </CardFooter>
    </Card>
  );
}
