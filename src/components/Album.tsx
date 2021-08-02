import React, { useEffect } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import { Loading } from './Loading';
import { Error } from './Error';
import { CardList } from './CardList';
import { Loader } from './Loader';
import { useInView } from 'react-intersection-observer';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';

interface Image {
  id: string;
  title: string;
  description: string;
  url: string;
  isFavorite: boolean;
  date: string;
}

interface AlbumProps {
  formattedData: Array<Image>;
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<any, unknown>>;
  hasNextPage: boolean;
}

export const Album = ({ isLoading, isError, formattedData, hasNextPage, fetchNextPage }: AlbumProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView])

  return (
    <>
      {
        (() => {
          if (isLoading) {
            return <Loading />
          } else if (isError) {
            return <Error />
          } else {
            return (
              <Box overflow="overlay" maxH="87.5vh" sx={{
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: colorMode === 'dark' ? 'header.background-light' : 'header.background-dark',
                  transition: '10s'
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: colorMode === 'dark' ? '#D5D5D5' : '#4D4B47',
                },
              }}>
                <Box maxW={1120} px={20} mx="auto" my="40px">
                  <CardList cards={formattedData} />

                  <Loader hasNextPage={hasNextPage} ref={ref} />
                </Box>
              </Box>
            )
          }
        })()
      }
    </>
  )
}
