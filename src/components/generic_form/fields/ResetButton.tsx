import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

type Props = {
  cFunc?: () => void;
  resetLabel?: string;
  disabled?: boolean;
  className?: string;
};

/**
 * ResetButton component
 *
 * @param resetLabel - The label for the reset button.
 * @param disabled - Whether the button is disabled.
 * @param className - The class name for the button.
 * @param cFunc - This is custom function. User can pass for additional functionality.
 * @returns The ResetButton component.
 */

export const ResetButton = ({
  cFunc,
  resetLabel = 'Reset',
  disabled = false,
  className,
}: Props) => {
  const form = useFormContext();
  return (
    <Button
      type='reset'
      variant={'outline'}
      size={'default'}
      disabled={disabled}
      className={cn(className)}
      onClick={() => {
        if (cFunc) {
          cFunc();
        }
        form.reset();
      }}
    >
      {resetLabel}
    </Button>
  );
};

ResetButton.displayName = 'ResetButton';
