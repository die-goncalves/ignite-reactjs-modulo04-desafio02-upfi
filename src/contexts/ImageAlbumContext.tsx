import { createContext, ReactNode, useContext, useMemo } from "react";
import { FetchNextPageOptions, InfiniteQueryObserverResult, useInfiniteQuery } from "react-query";
import { api } from "../services/api";

interface Image {
  id: string;
  title: string;
  description: string;
  url: string;
  isFavorite: boolean;
  date: string;
}

interface Page {
  after: string | null;
  data: Array<Image>;
}

interface ImageAlbumContextData {
  formattedData: Array<Image>;
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<any, unknown>>;
  hasNextPage: boolean;
}

interface ImageAlbumContextProviderProps {
  children: ReactNode;
}

const ImageAlbumContext = createContext({} as ImageAlbumContextData);

export function ImageAlbumProvider({ children }: ImageAlbumContextProviderProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const { data } = await api.get<Page>('/api/images', {
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

  return (
    <ImageAlbumContext.Provider value={{
      formattedData,
      isLoading,
      isError,
      fetchNextPage,
      hasNextPage,
    }}>
      {children}
    </ImageAlbumContext.Provider>
  )
}

export const useImageAlbum = () => useContext(ImageAlbumContext)