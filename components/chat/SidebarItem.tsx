'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Ellipsis, Pencil, Trash } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useSheetStore } from '@/store/sheet';
import { deleteConversation, updateConversation } from '@/actions/conversation';
import toast from 'react-hot-toast';
import { useModalStore } from '@/store/modal';
import { ModalFooter } from '../modal/ModalFooter';

interface Props {
  item: {
    id: string;
    href: string;
    icon: React.ReactNode;
    label: string;
  };
}

export function SidebarItem({ item }: Props) {
  const { id, href, icon, label } = item;
  const pathname = usePathname();
  const params = useParams<{ conversationId: string }>();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEdieMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(label);
  const setOpen = useSheetStore((state) => state.setOpen);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleBlur = async () => {
    setIsEditMode(false);
    if (value !== label) {
      try {
        await updateConversation(id, value);
      } catch (error) {
        console.error(error);
        toast.error('이름 수정에 실패하였습니다.');
      }
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      await handleBlur();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteConversation(id);
      toast.success('삭제되었습니다.');

      if (params.conversationId === id) {
        router.push('/chat');
      }

      closeModal();
    } catch (error) {
      console.error(error);
      toast.error('삭제에 실패했습니다.');
    }
  };

  const clickDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    openModal({
      title: '정말 삭제하겠습니까?',
      description: '삭제된 데이터는 복구할 수 없습니다.',
      footer: <ModalFooter onCancel={closeModal} onConfirm={handleDelete} />,
    });
  };

  const clickEdit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    setIsEditMode(true);
  };

  useEffect(() => {
    if (isEdieMode && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 200);
    }
  }, [isEdieMode]);

  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={cn(
        'flex items-center justify-between text-sm p-3 group hover:text-white hover:bg-white/10 rounded-lg',
        isMenuOpen || pathname === href
          ? 'text-white bg-white/10'
          : 'text-zinc-400'
      )}
    >
      <div className='flex items-center gap-2'>
        {icon}{' '}
        {isEdieMode ? (
          <input
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onClick={(e) => e.preventDefault()}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className='bg-transparent border border-zinc-400 rounded-lg px-2 py-1'
          />
        ) : (
          <div className='w-[180px] truncate'>{label}</div>
        )}
      </div>
      <div className=''>
        {id !== 'new' && (
          <DropdownMenu open={isMenuOpen} onOpenChange={handleMenuToggle}>
            <DropdownMenuTrigger asChild>
              <div onClick={handleMenuToggle}>
                <Ellipsis
                  className={cn(
                    'group-hover:block text-gray-400 hover:text-white',
                    isMenuOpen ? 'block text-white' : 'md:hidden text-gray-400'
                  )}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={clickEdit}>
                <Pencil />
                수정하기
              </DropdownMenuItem>
              <DropdownMenuItem onClick={clickDelete}>
                <Trash />
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </Link>
  );
}
