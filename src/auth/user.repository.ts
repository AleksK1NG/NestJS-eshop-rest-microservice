import * as bcrypt from 'bcrypt'
import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, email, password } = authCredentialsDto

    const user = new User()
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, user.salt)
    user.email = email
    user.username = username

    try {
      await user.save()
      return user
    } catch (error) {
      // error code comes as string
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
