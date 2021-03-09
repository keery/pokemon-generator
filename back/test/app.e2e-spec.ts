import { Test, TestingModule } from '@nestjs/testing'
import { CanActivate, INestApplication } from '@nestjs/common'
import { AppModule } from '~app.module'
import { AuthGuard } from '~guards/auth.guard'

describe.skip('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const mock_ForceFailGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    }
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_ForceFailGuard)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })
})
