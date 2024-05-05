import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import Logo from './public/msw-logo.svg';
import './styles/Main.css';
import { Popover } from './components/Popover/index';
import { MSWDevToolConfig } from '.';
import { delay, http, HttpResponse } from 'msw';
import useLocalStorageState from './hooks/useLocalStorageState';
import { MSW_DEVTOOL_OPTION, RequestHandler } from './types';
import { findByUrlAndMethod, nthNumber, parseHandlers } from './utils/util';
import { Switch } from './components/Switch';
import { SetupWorker } from 'msw/lib/browser';
import { Header } from './Header';

export const Main = <T extends SetupWorker>({
  options,
}: {
  options?: MSWDevToolConfig<T>;
}) => {
  const { worker, isEnabled: isMswDevToolEnabled } = options;
  const [openPopover, setOpenPopover] = useState(false);
  const [mswDevToolOptions, setMswDevToolOptions] = useLocalStorageState<
    MSW_DEVTOOL_OPTION[] & { findByUrlAndMethod?: typeof findByUrlAndMethod }
  >('msw-dev-tool-option', []);

  mswDevToolOptions.findByUrlAndMethod = findByUrlAndMethod;

  const originalHandlers = useMemo(
    () => worker.listHandlers(),
    [],
  ) as unknown as RequestHandler[];

  useEffect(() => {
    originalHandlers.forEach((originalHandler) => {
      if (
        mswDevToolOptions.some(
          (item) =>
            item.url === originalHandler.info.path &&
            item.method === originalHandler.info.method.toLowerCase(),
        )
      ) {
        return;
      }

      setMswDevToolOptions((prev) => {
        return [
          ...prev,
          {
            url: originalHandler.info.path,
            method: originalHandler.info.method.toLowerCase(),
            responseIndex: 0,
            status: '200',
            delay: 0,
          },
        ];
      });
    });
  }, [originalHandlers]);

  useEffect(() => {
    if (!isMswDevToolEnabled) {
      worker.resetHandlers();
    }
  }, [isMswDevToolEnabled]);

  const applyHandler = useCallback(() => {
    worker.resetHandlers();

    if (!isMswDevToolEnabled) {
      return;
    }

    worker.use(
      ...mswDevToolOptions.map((mswDevToolOption) => {
        return http[mswDevToolOption.method as keyof typeof http](
          mswDevToolOption.url,
          async (info) => {
            await delay(mswDevToolOption.delay);

            if (!mswDevToolOption.status.startsWith('2')) {
              return new HttpResponse(null, {
                status: Number(mswDevToolOption.status),
              });
            }

            return originalHandlers
              .filter(
                (handler) =>
                  handler.info.method.toLowerCase() ===
                    mswDevToolOption.method &&
                  handler.info.path === mswDevToolOption.url,
              )
              [mswDevToolOption.responseIndex].resolver(info);
          },
        );
      }),
    );
  }, [mswDevToolOptions, originalHandlers]);

  const onChangeDelay = useCallback(
    (url: string, method: string, value: number) => {
      setMswDevToolOptions((prev) => {
        prev[
          prev.findIndex(
            (handler) => handler.url === url && handler.method === method,
          )
        ].delay = value;

        return [...prev];
      });

      applyHandler();
    },
    [],
  );

  const onChangeStatus = useCallback(
    (url: string, method: string, value: string) => {
      setMswDevToolOptions((prev) => {
        prev[
          prev.findIndex(
            (handler) => handler.url === url && handler.method === method,
          )
        ].status = value;

        return [...prev];
      });

      applyHandler();
    },
    [],
  );

  const onChangeResponseOption = useCallback(
    (url: string, method: string, value: number) => {
      setMswDevToolOptions((prev) => {
        prev[
          prev.findIndex(
            (handler) => handler.url === url && handler.method === method,
          )
        ].responseIndex = value;

        return [...prev];
      });

      applyHandler();
    },
    [],
  );

  const onChangeMswDevToolEnabeld = useCallback(
    (enabled: boolean) => {
      if (enabled) {
        worker.start();
        applyHandler();
      } else {
        worker.stop();
      }
    },
    [worker, applyHandler],
  );

  return (
    <div>
      <Popover
        header={
          <Header onChangeMswDevToolEnabeld={onChangeMswDevToolEnabeld} />
        }
        open={openPopover}
        onChangeOpen={(open) => setOpenPopover(open)}
      >
        <ul class="content">
          <div class="mock-handler-header">
            <span>Method</span>
            <span>Mock Response</span>
            <span>Status Code</span>
            <span>Delay</span>
          </div>
          {Object.entries(parseHandlers(originalHandlers)).map(
            ([url, handler]) => {
              return (
                <>
                  <li class="url" key={url}>
                    {url}
                  </li>
                  <li class="mock-handler-wrapper">
                    {Object.entries(handler).map(([method, options]) => {
                      return (
                        <div class="mock-handler" key={`${url}-${method}`}>
                          <span class="method">{method}</span>
                          <span class="response-select-wrapper">
                            <select
                              class="response"
                              value={
                                mswDevToolOptions.findByUrlAndMethod(
                                  url,
                                  method.toLocaleLowerCase(),
                                )?.responseIndex
                              }
                              onChange={(e) => {
                                onChangeResponseOption(
                                  url,
                                  method.toLocaleLowerCase(),
                                  Number((e.target as HTMLInputElement).value),
                                );
                              }}
                            >
                              {options.map((_: unknown, index: number) => {
                                return (
                                  <option value={index} key={index}>
                                    {index + 1 + nthNumber(index + 1)} option
                                  </option>
                                );
                              })}
                            </select>
                          </span>
                          <span class="status-input-wrapper">
                            <input
                              class="status"
                              type="text"
                              value={
                                mswDevToolOptions.findByUrlAndMethod(
                                  url,
                                  method.toLocaleLowerCase(),
                                )?.status ?? '200'
                              }
                              onChange={(e) => {
                                onChangeStatus(
                                  url,
                                  method.toLocaleLowerCase(),
                                  (e.target as HTMLInputElement).value,
                                );
                              }}
                            />
                          </span>
                          <span class="delay-input-wrapper">
                            <input
                              class="delay"
                              type="number"
                              value={
                                mswDevToolOptions.findByUrlAndMethod(
                                  url,
                                  method.toLocaleLowerCase(),
                                )?.delay ?? 0
                              }
                              onChange={(e) => {
                                const value = Number(
                                  (e.target as HTMLInputElement).value,
                                );

                                if (isNaN(value)) {
                                  console.warn('Number only allowed');
                                  return;
                                }

                                onChangeDelay(url, method.toLowerCase(), value);
                              }}
                            />
                            <span style={{ fontSize: '0.8rem' }}>ms</span>
                          </span>
                        </div>
                      );
                    })}
                  </li>
                </>
              );
            },
          )}
        </ul>
      </Popover>
      <a href="#" class="logo-button" onClick={() => setOpenPopover(true)}>
        <Logo />
      </a>
    </div>
  );
};
