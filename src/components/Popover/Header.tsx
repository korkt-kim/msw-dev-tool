import { useContext } from 'preact/hooks';
import { usePopoverContext } from './hooks/usePopoverContext';

export const Header = () => {
  const { close } = usePopoverContext();

  return (
    <div id="header">
      <a href="#" class="close" onClick={close} />{' '}
    </div>
  );
};
