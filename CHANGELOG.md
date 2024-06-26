# @korkt-kim/msw-dev-tool

## 0.1.2

### Patch Changes

- 37676c5: Add url search function

## 0.1.1

### Patch Changes

- 4b71f9f: - msw-dev-tool-enabled 기본값 true로 변경
  - init config 매개변수를 필수값으로 변경
  - init config 내 worker 필드 타입 수정

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
  import { worker } from "./mocks/browser.js";

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
