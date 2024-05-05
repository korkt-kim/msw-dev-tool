import { render } from 'preact';
import { message } from './consts';
import { Main } from './Main';

import { SetupWorker, SetupWorkerApi } from 'msw/lib/browser';

export interface MSWDevToolConfig<T> {
  worker: T;
  isEnabled?: boolean;
}

export class MSWDevTool<T> {
  private container: Element;
  private options: MSWDevToolConfig<T>;

  constructor(config: MSWDevToolConfig<T>) {
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
    render(
      <Main options={this.options as MSWDevToolConfig<SetupWorker>} />,
      this.container,
    );
  }

  destroy() {}
}
