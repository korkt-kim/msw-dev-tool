import { render } from 'preact';
import { message } from './consts';
import { Main } from './components/Main';

import { SetupWorker } from 'msw/lib/browser';

export interface MSWToolbarConfig {
  worker: SetupWorker;
  isEnabled?: boolean;
}

export class MSWToolbar {
  private container: Element;
  private options: MSWToolbarConfig;

  constructor(config?: MSWToolbarConfig) {
    if (!config) {
      throw new Error(message.noConfig);
    }

    const defaultContainer = document.createElement('div');
    defaultContainer.setAttribute(
      'style',
      `position:fixed;bottom:20px;right:20px;width:50px;height:50px;`,
    );
    document.body.append(defaultContainer);
    this.container = defaultContainer;

    const { ...others } = config;

    this.options = {
      isEnabled: true,
      ...others,
    };

    this.render();
  }

  render() {
    render(<Main options={this.options} />, this.container);
  }

  destroy() {}
}
