import { useContext } from 'preact/hooks';
import { PopoverContext } from '../contexts/Popover';

export const usePopoverContext = () => {
  const ctx = useContext(PopoverContext);

  if (!ctx) {
    throw new Error(
      'usePopoverContext must be used within a PopoverContext.Provider',
    );
  }

  return ctx;
};
