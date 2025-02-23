import { FormType } from '@/schema/create_product';
import { Trash2 } from 'lucide-react';
import { TextField } from '../generic_form/fields/TextField';
import { Button } from '../ui/button';

type VariantCardProps = {
  index: number;
  onRemove: () => void;
};

const VariantInput = ({ index, onRemove }: VariantCardProps) => {
  return (
    <div className='space-y-6'>
      {/* Variant Cards */}
      <div className='rounded-lg bg-neutral-100 p-2'>
        <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2'>
          <TextField<FormType>
            name={`variants.${index}.name`}
            label='Variant Name'
            placeholder='Enter variant name'
            required
          />
          <TextField<FormType>
            name={`variants.${index}.price`}
            label='Variant Price'
            placeholder='Enter price'
            required
          />
        </div>

        <div className='flex items-center justify-end'>
          <Button
            size='sm'
            variant='ghost'
            onClick={onRemove}
            type='button'
            className='transition-colors hover:text-red-500'
          >
            <Trash2 size={18} className='mr-2' />
            Remove Variant
          </Button>
        </div>
      </div>
    </div>
  );
};

export { VariantInput };
