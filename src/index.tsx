import { render } from 'preact';
import { message } from './consts';
import { Main } from './components/Main';

export interface MSWToolbarConfig {
  container?: Element;
  open?: boolean;
  onChangeOpen?: (open: boolean) => unknown;
}

export class MSWToolbar {
  private container: Element;
  private options: MSWToolbarConfig;

  constructor(config?: MSWToolbarConfig) {
    if (!config) {
      throw new Error(message.noConfig);
    }

    const { container } = config;
    this.container = container;
    const { ...others } = config;

    this.options = {
      open: false,
      container: null,
      onChangeOpen: () => {},
      ...others,
    };

    this.render();
  }

  render() {
    render(<Main />, this.container);
  }

  destroy() {}
}
