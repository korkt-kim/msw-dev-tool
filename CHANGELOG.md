# @korkt-kim/msw-dev-tool

## 0.1.0

### Major Changes

- 222c6af: # MSW Dev Toolbar

  A simple GUI to make your MSW experience a little bit better.
  ![mswDevTool screenshot](../.preview/scrn-01.png)

  ## Install

  `npm install @korkt-kim/msw-dev-tool`

  `yarn add @korkt-kim/msw-dev-tool`

  `pnpm add @korkt-kim/msw-dev-tool`

  ## Usage

  ```js
  import { worker } from './mocks/browser.js';

  worker.start();

  new MSWToolbar({
    worker,
    isEnabled: true,
  });
  ```

  ## Props

  | Name      | Type    | Default | Description                      |
  | --------- | ------- | ------- | -------------------------------- |
  | isEnabled | boolean | true    | whether to enable "msw dev tool" |
