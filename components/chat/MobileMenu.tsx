'use client';

import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useSheetStore } from '@/store/sheet';

export function MobileMenu({ children }: { children: React.ReactNode }) {
  const open = useSheetStore((state) => state.open);
  const setOpen = useSheetStore((state) => state.setOpen);
  return (
    <div className='md:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
        <SheetContent side='left' className='p-0'>
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
}
