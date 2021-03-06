import axios from 'axios'
import French from '@uppy/locales/lib/fr_FR'
import Spanish from '@uppy/locales/lib/es_ES'

export const getUppyTranslations = (locale) => {
  switch (locale) {
    case 'fr':
      return French
    case 'es':
      return Spanish
    default:
      return false
  }
}

export default async () => {
  const {
    data: { params, signature },
  } = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/transloadit/signature`,
  )

  return {
    params,
    signature,
    waitForEncoding: true,
  }
}
