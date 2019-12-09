import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, email, password } = authCredentialsDto

    const user = new User()
    user.email = email
    user.password = password
    user.username = username

    await user.save()

    return user
  }
}
