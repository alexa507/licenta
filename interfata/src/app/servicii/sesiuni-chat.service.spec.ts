import { TestBed } from '@angular/core/testing';

import { SesiuniChatService } from './sesiuni-chat.service';

describe('SesiuniChatService', () => {
  let service: SesiuniChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesiuniChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
