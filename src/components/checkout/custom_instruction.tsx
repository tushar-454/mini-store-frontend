import Gradient from '@/components/ui/gradient';
import { TypographyH4 } from '@/components/ui/typography';
import { updateOrderInstruction } from '@/store/features/order';
import { AppDispatch } from '@/store/store';
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Textarea } from '../ui/textarea';

const CustomInstruction = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleChanage = async (value: string) => {
    dispatch(updateOrderInstruction(value));
  };

  const handleAutoResize = useCallback(() => {
    if (!textareaRef.current) return;

    // Reset height to auto to properly calculate new height
    textareaRef.current.style.height = '36px';
    // Only allow height to grow if content exceeds single line
    const scrollHeight = textareaRef.current.scrollHeight;
    if (scrollHeight > 36) {
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, []);

  return (
    <div>
      <TypographyH4 className='mb-2'>
        <Gradient>Custom Instructions</Gradient>
      </TypographyH4>

      <Textarea
        name='instructions'
        placeholder='describe your instructions . . .'
        className='h-[36px] overflow-hidden'
        ref={textareaRef}
        onChange={handleAutoResize}
        onBlur={(e) => handleChanage(e.target.value)}
      />
    </div>
  );
};

export { CustomInstruction };
