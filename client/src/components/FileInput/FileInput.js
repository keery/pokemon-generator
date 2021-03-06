import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Dashboard } from '@uppy/react'
import { withTranslation, getI18n } from 'react-i18next'
import { Box, Text, Icon } from '@chakra-ui/react'
import Uppy from '@uppy/core'
import Url from '@uppy/url'
import Webcam from '@uppy/webcam'
import Instagram from '@uppy/instagram'
import Transloadit from '@uppy/transloadit'
import XHRUpload from '@uppy/xhr-upload'
import French from '@uppy/locales/lib/fr_FR'
import Spanish from '@uppy/locales/lib/es_ES'
import { FaCloudUploadAlt } from 'react-icons/fa'

const EMPTY_STATE = {
  isUploaded: false,
  uploadLabel: '',
}

const getUppyTranslations = (locale) => {
  switch (locale) {
    case 'fr':
      return French
    case 'es':
      return Spanish
    default:
      return false
  }
}

const TRANSLOADIT_KEY = 'be3e863775b14553a504aaa98ca3c32c'
const TRANSLOADIT_SECRET = 'bf39fb91c830d0a63f1e7880508d4f79c4bc1075'
const TRANSLOADIT_TEMPLATE_ID = '2451e3544cfd4eb29688983b6c7e8956'

class FileInput extends Component {
  constructor(props) {
    super(props)

    this.uppy = new Uppy({
      id: props.name,
      autoProceed: true,
      // locale: getUppyTranslations(language),
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
      .use(Transloadit, {
        debug: true,
        // signature: TRANSLOADIT_SECRET,
        params: {
          auth: {
            // expires: dayjs().add(6, 'hour').format('YYYY/MM/DD HH:mm:ss+00:00'),
            key: TRANSLOADIT_KEY,
          },
          template_id: TRANSLOADIT_TEMPLATE_ID,
        },
      })

    if (props.value) {
      this.state = {
        isUploaded: true,
        uploadLabel: props.value.name,
      }
    } else {
      this.state = EMPTY_STATE
    }
  }

  componentDidMount() {
    const { onChange, name } = this.props
    this.uppy.on('transloadit:result', (stepName, result) => {
      const file = this.uppy.getFile(result.localId)
      this.setState({
        uploadLabel: file.name,
        isUploaded: true,
      })
      onChange({
        target: {
          name,
          value: {
            src: file.response.uploadURL,
            name: file.name,
          },
          getAttribute: () => false,
        },
      })
      this.uppy.reset()
      // this.context.closeModal()
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.value !== this.props.value && !this.props.value) {
  //     this.setState(EMPTY_STATE);
  //   }
  // }

  // componentWillUnmount() {
  //   this.props.uppy.off("upload-success");
  //   this.props.uppy.close();
  // }

  // handleFile = (event) => {
  //   const { isUploaded } = this.state
  //   console.log(isUploaded)
  //   this.setState({
  //     // uploadLabel: file.name,
  //     isUploaded: !isUploaded,
  //   })
  //   // this.context.openModalWith(
  //     <Dashboard
  //       uppy={this.props.uppy}
  //       plugins={['Instagram', 'Webcam', 'Url']}
  //       proudlyDisplayPoweredByUppy={false}
  //       metaFields={[{ id: 'name', name: 'Name', placeholder: 'File name' }]}
  //       browserBackButtonClose
  //     />
  //   )
  // }

  render() {
    const { name } = this.props
    const { uploadLabel, isUploaded } = this.state
    return (
      <Box w="100%" color="#8a8484" onClick={this.handleFile}>
        <div className="file-input" name={name} />
        <Dashboard
          uppy={this.uppy}
          plugins={['Instagram', 'Webcam', 'Url']}
          proudlyDisplayPoweredByUppy={false}
          metaFields={[{ id: 'name', name: 'Name', placeholder: 'File name' }]}
          browserBackButtonClose
        />
        <Box
          width="100%"
          padding="8px"
          borderRadius="20px"
          border="1px solid"
          transition="border-color ease-in-out 0.5s"
          overflow="hidden"
          pos="relative"
          bg="grey.100"
          borderColor={isUploaded ? 'orange.900' : '#ededed'}
        >
          <Text color="grey.500" fontSize=".9rem" fontWeight="600" pl="10px">
            Choose a picture
          </Text>
          <Icon
            as={FaCloudUploadAlt}
            position="absolute"
            left={isUploaded ? 0 : 'calc(100% - 38px)'}
            top="50%"
            transform="translateY(-50%)"
            bg="linear-gradient(to left, #ff9349 0%, #ffc27b 100%)"
            borderRadius="100%"
            h="38px"
            w="38px"
            color="#fff"
            transition="left ease-in-out 0.5s"
            zIndex="1"
            p=".7rem"
          />
          <Box
            position="absolute"
            top="0px"
            bottom="0px"
            w="100%"
            left={isUploaded ? '19px' : 'calc(100% - 19px)'}
            transition="left ease-in-out 0.5s"
            backgroundColor="orange.500"
            pl="3rem"
            color="white"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            _hover={{
              backgroundColor: isUploaded ? 'orange.400' : 'orange.500',
            }}
          >
            <Text textOverflow="ellipsis" w="80%" overflow="hidden">
              {uploadLabel}
            </Text>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default withTranslation('fileInput')(FileInput)
