import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { Redis } from 'ioredis'

@Injectable()
export class SessionService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  getSession() {
    try {
      const cookies = this.request.headers.get['cookies']
      const email = cookies['email']
      const session = this.redis.get(email)
      return session
    } catch (error) {
      return {}
    }
  }

  async setSession(email: string, id: number) {
    try {
      const isOk = await this.redis.set(email, id)
      return isOk === 'OK'
    } catch (error) {
      return false
    }
  }
}
