import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { SessionService } from 'src/infra/session/session.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly session: SessionService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
      },
    })
    return user
  }

  findAll() {
    return `This action returns all user`
  }

  async signIn(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })
    console.log(user)

    this.session.setSession(user.email, user.id)
    return user
  }

  async findOne(email: string) {
    if (this.session.getSession()) {
      console.log('ok')

      const user = await this.prisma.user.findUnique({
        where: { email },
      })
      console.log('user')
      console.log(user)

      return user
    } else {
      return {}
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
