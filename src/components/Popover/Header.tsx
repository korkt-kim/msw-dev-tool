import { useContext } from 'preact/hooks';
import { usePopoverContext } from './hooks/usePopoverContext';
import { ReactNode } from 'preact/compat';

export const Header = ({ children }: { children?: ReactNode }) => {
  const { close } = usePopoverContext();

  return (
    <div id="header">
      {children}
      <a href="#" class="close" onClick={close} />
    </div>
  );
};
