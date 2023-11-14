import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import companion from '@uppy/companion'
import session from 'express-session'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  })
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('/api')
  const options = new DocumentBuilder()
    .setTitle('Pokemon Generator API')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api/docs', app, document)

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  )

  const PORT = process.env.PORT || 3002
  console.log(`Port is ${PORT}`)
  const server = await app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`)
  })

  // const server = await app.listen(process.env.PORT || 3002, process.env.HOST)
  companion.socket(server)
}
bootstrap()
