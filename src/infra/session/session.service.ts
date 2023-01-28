import { Inject, Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class SessionService {
  constructor(
    private readonly redis: Redis,
    @Inject('Request') private readonly request: Request,
  ) {}

  getSesstion() {
    const cookies = this.request.headers.get('cookies')
    const user_no = cookies['user_no']
    const session = this.redis.get(user_no)
    return session
  }
}
