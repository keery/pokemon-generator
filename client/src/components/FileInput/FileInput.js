import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Dashboard } from '@uppy/react'
import { withTranslation } from 'react-i18next'
import { Box, Text, Icon } from '@chakra-ui/react'
import { ModalContext } from '../../context'
import { FaCloudUploadAlt } from 'react-icons/fa'

const EMPTY_STATE = {
  isUploaded: false,
  uploadLabel: '',
}

class FileInput extends Component {
  static contextType = ModalContext

  constructor(props) {
    super(props)

    if (props.value) {
      this.state = {
        isUploaded: true,
        uploadLabel: props.value.name,
      }
    } else {
      this.state = EMPTY_STATE
    }
  }

  // componentDidMount() {
  //   const { onChange, name, uppy } = this.props;
  //   uppy.on("transloadit:result", (stepName, result) => {
  //     const file = uppy.getFile(result.localId);

  //     this.setState({
  //       uploadLabel: file.name,
  //       isUploaded: true,
  //     });

  //     onChange({
  //       target: {
  //         name,
  //         value: {
  //           src: file.response.uploadURL,
  //           name: file.name,
  //         },
  //         getAttribute: () => false,
  //       },
  //     });
  //     uppy.reset();
  //     this.context.closeModal();
  //   });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.value !== this.props.value && !this.props.value) {
  //     this.setState(EMPTY_STATE);
  //   }
  // }

  // componentWillUnmount() {
  //   this.props.uppy.off("upload-success");
  //   this.props.uppy.close();
  // }

  handleFile = (event) => {
    const { isUploaded } = this.state
    console.log(isUploaded)
    this.setState({
      // uploadLabel: file.name,
      isUploaded: !isUploaded,
    })
    // this.context.openModalWith(
    //   <Dashboard
    //     uppy={this.props.uppy}
    //     plugins={['Instagram', 'Webcam', 'Url']}
    //     proudlyDisplayPoweredByUppy={false}
    //     metaFields={[{ id: 'name', name: 'Name', placeholder: 'File name' }]}
    //     browserBackButtonClose
    //   />,
    // )
  }

  render() {
    const { name } = this.props
    const { uploadLabel, isUploaded } = this.state
    return (
      <Box w="100%" color="#8a8484" onClick={this.handleFile}>
        <div className="file-input" name={name} />
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

FileInput.defaultProps = {
  onChange: () => null,
  value: false,
}

FileInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  uppy: PropTypes.object.isRequired,
  value: PropTypes.shape({
    src: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default withTranslation('fileInput')(FileInput)
