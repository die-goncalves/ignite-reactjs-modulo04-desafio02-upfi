import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FavoriteImagesProvider } from '../contexts/FavoriteImagesContext';
import { ImageAlbumProvider } from '../contexts/ImageAlbumContext';
import { Header } from '../components/Header';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ImageAlbumProvider>
          <FavoriteImagesProvider>
            <Header />
            <Component {...pageProps} />
          </FavoriteImagesProvider>
        </ImageAlbumProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
