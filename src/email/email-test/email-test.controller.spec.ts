import { Test, TestingModule } from '@nestjs/testing';
import { EmailTestController } from './email-test.controller';

describe('EmailTestController', () => {
  let controller: EmailTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailTestController],
    }).compile();

    controller = module.get<EmailTestController>(EmailTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
