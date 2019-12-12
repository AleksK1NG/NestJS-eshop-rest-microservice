import { NestFactory } from '@nestjs/core'
import * as config from 'config'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const serverConfig: any = config.get('server')
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule)

  const port = process.env.PORT || serverConfig.port
  app.setGlobalPrefix('/api/v1')
  await app.listen(port)
  logger.log(`Application listening on port ${port}`)
}
bootstrap()
