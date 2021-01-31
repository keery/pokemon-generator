import React, { Suspense } from 'react'
import { ChakraProvider, Container } from '@chakra-ui/react'
import { Generator } from '..'
import {
  Header,
  Loader,
  ErrorBoundary,
  LoaderProvider,
  LoaderConsumer,
  ModalConsumer,
  ModalProvider,
  StoreProvider,
} from '../../components'
import theme from '../../theme'
console.log(theme.components)
const App = () => (
  <Suspense fallback={<Loader />}>
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <LoaderProvider>
          <StoreProvider>
            <ModalProvider>
              <LoaderConsumer />
              <ModalConsumer />
              <Header />
              <Container maxW="1200px">
                <Generator />
              </Container>
            </ModalProvider>
          </StoreProvider>
        </LoaderProvider>
      </ChakraProvider>
    </ErrorBoundary>
  </Suspense>
)

export default App
