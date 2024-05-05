import { Switch } from './components/Switch';
import useLocalStorageState from './hooks/useLocalStorageState';

export interface HeaderProps {
  onChangeMswDevToolEnabeld: (enabled: boolean) => void;
}

export const Header = ({ onChangeMswDevToolEnabeld }: HeaderProps) => {
  const [mswEnabled, setMswEnabled] = useLocalStorageState<boolean>(
    'msw-enabled',
    true,
  );

  return (
    <div style="display:flex; align:center;padding-left:1rem; gap:0.3rem;">
      <Switch
        checked={mswEnabled}
        onChange={(e) => {
          const checked = (e.target as HTMLInputElement).checked;

          onChangeMswDevToolEnabeld((e.target as HTMLInputElement).checked);
          setMswEnabled(checked);
        }}
      />
      <label>Enable MSW</label>
    </div>
  );
};
