import { TestBed } from '@angular/core/testing';

import { TodoServices } from './todo-services';

describe('TodoServices', () => {
  let service: TodoServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
