import { TodoPipePipe } from './todo-pipe-pipe';

describe('TodoPipePipe', () => {
  it('create an instance', () => {
    const pipe = new TodoPipePipe();
    expect(pipe).toBeTruthy();
  });
});
