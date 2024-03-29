import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { IJwtPayload } from './jwt-payload.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { User } from './user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret555',
    })
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const { userEmail } = payload

    const user = await this.userRepository.findOne({ email: userEmail })
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
