import server from '../../http.config';
import HttpStatus from 'http-status-codes';

const to = async (p) => {
  try {
    return await p;
  } catch (err) {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err
    };
  }
};

// Methods
export const populateTodosRequest = async () => {
  const res = await to(server.get('/posts'));

  if (res.status === HttpStatus.OK) {
    localStorage.setItem('todos', JSON.stringify(res.data));
  }
};