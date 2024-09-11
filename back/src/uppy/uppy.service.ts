import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import companion = require('@uppy/companion')
import fs from 'fs'

@Injectable()
export class UppyService implements OnModuleInit {
  private logger = new Logger('UppyService')
  private companionServer

  onModuleInit() {
    this.initializeCompanionServer()
  }

  async handleCompanion(req, res) {
    return this.companionServer.app.handle(req, res)
  }

  private initializeCompanionServer() {
    const dir = './tmp'

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    this.logger.verbose(`Initializing Companion Server.`)
    const options = {
      providerOptions: {
        instagram: {
          key: process.env.INSTAGRAM_KEY,
          secret: process.env.INSTAGRAM_SECRET,
        },
        drive: {
          key: process.env.GOOGLE_DRIVE_KEY,
          secret: process.env.GOOGLE_DRIVE_SECRET,
        },
        facebook: {
          key: process.env.FACEBOOK_KEY,
          secret: process.env.FACEBOOK_SECRET,
        },
        dropbox: {
          key: process.env.DROPBOX_KEY,
          secret: process.env.DROPBOX_SECRET,
        },
      },
      server: {
        host: process.env.HOST,
        protocol: process.env.PROTOCOL,
        // path: '/api/image/companion',
      },
      uploadUrls: ['/api/image/upload'],
      filePath:
        '/Users/guillaumeesnault/Documents/Projects/pokemon-generator/back/tmp',
      secret: process.env.SESSION_SECRET,
      debug: true,
      corsOrigins: true,
      allowLocalUrls: true,
      // Required to use URL file upload
      enableUrlEndpoint: true,
    }

    this.companionServer = companion.app(options)
  }
}
