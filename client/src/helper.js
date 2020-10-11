import AES from 'crypto-js/aes'
import EncUTF8 from 'crypto-js/enc-utf8'

const isEmpty = (obj) => {
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== '') return false
    }
    return true
}

const remove = (array, val) => {
    const index = array.indexOf(val)
    if (index > -1) {
        array.splice(index, 1)
    }
}

const generateImg = (src) => {
    const img = new Image()
    img.src = src
    return img
}

const encrypt = (data, key) => AES.encrypt(JSON.stringify(data), key).toString()

const decrypt = (encryptedData, key) =>
    JSON.parse(AES.decrypt(encryptedData, key).toString(EncUTF8))

const printCard = () => {
    window.print()
}

export { generateImg, isEmpty, remove, encrypt, decrypt, printCard }
