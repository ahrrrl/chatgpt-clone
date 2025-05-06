import { Button } from '../ui/button';

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
}

export function ModalFooter({ onCancel, onConfirm }: Props) {
  return (
    <>
      <Button variant={'destructive'} onClick={onConfirm}>
        삭제
      </Button>
      <Button onClick={onCancel}>취소</Button>
    </>
  );
}
