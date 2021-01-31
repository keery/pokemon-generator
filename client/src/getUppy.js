import Url from '@uppy/url'
import Uppy from '@uppy/core'
import Webcam from '@uppy/webcam'
import Instagram from '@uppy/instagram'
import Transloadit from '@uppy/transloadit'
import { getUppyTranslations } from './setupTransloadit'

export default (id, transloaditParams, language) => {
  return new Uppy({
    id,
    autoProceed: true,
    locale: getUppyTranslations(language),
    debug: true,
    allowMultipleUploads: false,
    restrictions: {
      maxFileSize: 1000000,
      maxNumberOfFiles: 1,
      allowedFileTypes: ['image/*'],
    },
  })
    .use(Webcam)
    .use(Instagram, {
      companionUrl: process.env.REACT_APP_SERVER_URL,
    })
    .use(Url, {
      companionUrl: process.env.REACT_APP_SERVER_URL,
    })
    .use(Transloadit, transloaditParams)
}
