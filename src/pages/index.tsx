import { Box, useColorMode, CircularProgress } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
  isFavorite: boolean;
}

interface QueryResult {
  after: string | null;
  data: Image[];
}

export default function Home(): JSX.Element {
  const { colorMode } = useColorMode();
  let loadMoreButtonRef = useRef<HTMLDivElement>(null);
  const {
    data,
    isLoading,
    isError,
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

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    isLoading: isLoading,
  })

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
              <>
                <Header />

                <Box maxW={1120} px={20} mx="auto" my={20}>
                  <CardList cards={formattedData} />

                  {hasNextPage &&
                    <>
                      <Box
                        marginTop="40px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        ref={loadMoreButtonRef}
                      >
                        <CircularProgress
                          isIndeterminate
                          size="3.25rem"
                          thickness="0.75rem"
                          color={colorMode === "dark" ? "loading.circular-progress-dark" : "loading.circular-progress-light"}
                          trackColor={colorMode === "dark" ? "loading.track-dark" : "loading.track-light"}
                        />
                      </Box>
                    </>
                  }
                </Box>
              </>
            )
          }
        })()
      }
    </>
  );
}
