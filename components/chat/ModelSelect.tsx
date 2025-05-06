'use client';

import { useModelStore } from '@/store/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const MODELS = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4o'];

export function ModelSelect() {
  const currentModel = useModelStore((state) => state.model);
  const updateModel = useModelStore((state) => state.updateModel);
  const handleModelChange = (model: string) => {
    updateModel(model);
  };
  return (
    <Select value={currentModel} onValueChange={handleModelChange}>
      <SelectTrigger className='w-[180px] border-none text-xl focus-visible:ring-0'>
        <SelectValue placeholder='모델 선택' />
      </SelectTrigger>
      <SelectContent>
        {MODELS.map((model) => (
          <SelectItem
            key={model}
            value={model}
            disabled={model === currentModel}
          >
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
