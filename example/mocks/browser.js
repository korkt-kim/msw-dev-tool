// import { setupWorker } from 'msw/browser';
// import { http,HttpResponse } from 'msw';
// import { APP_NAME } from '../consts';
const { setupWorker, http, HttpResponse } = MockServiceWorker;

// console.dir(MockServiceWorker);

export const worker = setupWorker(
  ...[
    http.get('http://www.example.com/user', () => {
      return HttpResponse.json({
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        firstName: 'John',
        lastName: 'Maverick',
      });
    }),
    http.post('http://www.example.com/user', () => {
      return HttpResponse.json({
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        firstName: 'John',
        lastName: 'Maverick',
      });
    }),
    http.get('http://www.example.com/user2', () => {
      return HttpResponse.json({
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        firstName: 'John',
        lastName: 'Maverick',
      });
    }),
    http.delete('http://www.example.com/user2', () => {
      return HttpResponse.json({
        id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        firstName: 'John',
        lastName: 'Maverick',
      });
    }),
  ],
);
