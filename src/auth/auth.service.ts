import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { User } from './user.entity'
import { JwtService } from '@nestjs/jwt'
import { IJwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const userEmail = await this.userRepository.validateUserPassword(authCredentialsDto)

    if (!userEmail) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: IJwtPayload = { userEmail }
    const accessToken = await this.jwtService.sign(payload)

    return { accessToken }
  }
}
