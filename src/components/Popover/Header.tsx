import { useContext } from 'preact/hooks';
import { usePopoverContext } from './hooks/usePopoverContext';
import { ReactNode } from 'preact/compat';

export const Header = ({ children }: { children?: ReactNode }) => {
  const { close } = usePopoverContext();

  return (
    <div id="header">
      {children}
      <a href="#" className="close" onClick={close} />
    </div>
  );
};
