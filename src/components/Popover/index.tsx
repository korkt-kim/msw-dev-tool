import { useCallback, useMemo, useState } from 'preact/hooks';
import { ReactNode } from 'react';
import { Header } from './Header';
import '../../styles/Popover.css';
import { PopoverContext } from './contexts/Popover';

export interface PopoverProps {
  open?: boolean;
  onChangeOpen?: (open: boolean) => unknown;
  children?: ReactNode;
  header?: ReactNode;
}

export const Popover = (props: PopoverProps) => {
  const [_open, _setOpen] = useState(false);

  const close = useCallback(() => {
    props.onChangeOpen?.(false);
    _setOpen(false);
  }, []);

  const value = useMemo(() => ({ close }), [close]);

  if (!(props.open ?? _open)) {
    return null;
  }

  return (
    <div id="container">
      <PopoverContext.Provider value={value}>
        <Header>{props.header}</Header>
        {props.children}
      </PopoverContext.Provider>
    </div>
  );
};
