import io from 'socket.io-client';

export const socket = io('http://localhost:4000', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});