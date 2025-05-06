'use client';

import { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { Textarea } from '../ui/textarea';

export function AutoResizingTextarea({
  value,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  return (
    <Textarea
      className='min-h-[60px] max-h-[200px] resize-none'
      value={value}
      ref={textareaRef}
      {...props}
    />
  );
}
