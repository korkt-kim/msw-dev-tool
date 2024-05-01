import { RequestHandler } from '../types';
import { MSW_DEVTOOL_OPTION } from '../types';

export function findByUrlAndMethod(
  this: MSW_DEVTOOL_OPTION[],
  url: string,
  method: string,
) {
  return this.find(
    (item) => item.url === url && item.method === method.toLowerCase(),
  );
}

export const parseHandlers = (handlers: readonly RequestHandler[]) => {
  return handlers.reduce(
    (result, item) => {
      // Get app object corresponding to current item from result (or insert if not present)
      var app = (result[item.info.path] = result[item.info.path] || {});

      // Get type array corresponding to current item from app object (or insert if not present)
      var type = (app[item.info.method] = app[item.info.method] || []);

      // Add current item to current type array
      type.push(item);

      // Return the result object for this iteration
      return result;
    },
    {} as Record<string, Record<string, RequestHandler[]>>,
  );
};

export const nthNumber = (index: number) => {
  if (index > 3 && index < 21) return 'th';
  switch (index % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
