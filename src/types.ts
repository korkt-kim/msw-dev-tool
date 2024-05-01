import { RequestHandler as _RequestHandler, ResponseResolver } from 'msw';

export interface MSW_DEVTOOL_OPTION {
  url: string;
  method: string;
  responseIndex: number;
  status: string;
  delay: number;
}

export interface RequestHandler extends Omit<_RequestHandler, 'info'> {
  info: {
    method: string;
    path: string;
  } & _RequestHandler['info'];
  resolver: ResponseResolver;
}
