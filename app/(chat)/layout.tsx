import { Header } from '@/components/chat/Header';
import { Sidebar } from '@/components/chat/Sidebar';
import { UserProvider } from '@/components/chat/UserProvider';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className='md:flex min-h-screen'>
        <div className='hidden md:block w-[300px] sticky top-0 left-0 h-screen'>
          <Sidebar />
        </div>
        <div className='flex flex-col flex-1'>
          <Header />
          {children}
        </div>
      </div>
    </UserProvider>
  );
}
