import { Button, Box, useColorMode } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface QueryResult {
  after: string | null;
  data: Image[];
}

export default function Home(): JSX.Element {
  const { colorMode } = useColorMode();
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const { data } = await api.get<QueryResult>('/api/images', {
        params: {
          after: pageParam
        }
      })
      return data
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.after ?? null
      }
    },
  );

  const formattedData = useMemo(() => {
    if (data) {
      const groupPages = data.pages.map((page) => {
        return page.data
      })
      const groupImages = groupPages.flat();
      return groupImages;
    }
  }, [data]);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage &&
          <Box w="100%" h="5rem">
            <Button
              marginTop="40px"
              onClick={() => fetchNextPage()}
              variant="orange-dark/light"
            >
              {isFetchingNextPage
                ? 'Carregando...'
                : 'Carregar mais'}
            </Button>
          </Box>

        }
      </Box>
    </>
  );
}
