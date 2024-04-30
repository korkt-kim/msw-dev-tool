import { useMemo, useState } from 'preact/hooks';
import Logo from '../public/msw-logo.svg';
import '../styles/Main.css';
import { Popover } from './Popover/index';
import { MSWToolbarConfig } from '..';
import { RequestHandler } from 'msw';
import { uniq } from '../utils/util';

// @TODO: any 제거
const parseHandlers = (handlers: readonly RequestHandler[]) => {
  const url = uniq(handlers.map((handler) => (handler.info as any).path));

  return url.map((item) => {
    const filteredHandlers = handlers
      .filter((handler) => (handler.info as any).path === item)
      .sort((a, b) =>
        (a.info as any).method.localeCompare((b.info as any).method),
      );
    return [item, filteredHandlers] as const;
  });
};

export const Main = ({ options }: { options?: MSWToolbarConfig }) => {
  const [open, setOpen] = useState(false);

  const handlers = useMemo(
    () => parseHandlers(options.worker.listHandlers()),
    [options],
  );

  return (
    <div>
      <Popover open={open} onChangeOpen={(open) => setOpen(open)}>
        {handlers.map((handler) => {
          return (
            <div key={handler.join(' ')}>
              <div
                style={{
                  background: 'black',
                  color: 'white',
                  fontSize: '20px',
                }}
              >
                {handler[0]}
              </div>
              {handler[1].map((item) => {
                return <div>{(item.info as any).method}</div>;
              })}
            </div>
          );
        })}
      </Popover>
      <a href="#" class="logo-button" onClick={() => setOpen(true)}>
        <Logo />
      </a>
    </div>
  );
};
