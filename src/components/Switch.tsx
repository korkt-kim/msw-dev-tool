import { ComponentProps } from 'preact';
import '../styles/Switch.css';
import { ReactNode } from 'preact/compat';

export interface SwitchProps extends Omit<ComponentProps<'input'>, 'value'> {}

export const Switch = (props: SwitchProps) => {
  return (
    <span class="onoff-switch-container">
      <input type="checkbox" id="onoff-switch" {...props} />
      <label for="onoff-switch"></label>
    </span>
  );
};
