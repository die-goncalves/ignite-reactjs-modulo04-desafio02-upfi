import { createContext, ReactNode, useContext, useMemo, useState } from "react";
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

interface FavoriteImagesContextData {
  setShowFavorites: (state: boolean) => void;
  showFavorites: boolean;
  formattedData: Array<Image>;
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<any, unknown>>;
  hasNextPage: boolean;
}

interface FavoriteImagesProviderProps {
  children: ReactNode;
}

const FavoriteImagesContext = createContext({} as FavoriteImagesContextData);

export function FavoriteImagesProvider({ children }: FavoriteImagesProviderProps) {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'favorites',
    async ({ pageParam = null }) => {
      const { data } = await api.get<Page>('/api/favorites', {
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

  const formattedData = useMemo<Array<Image>>(() => {
    if (data) {
      const groupPages = data.pages.map((page) => {
        return page.data
      })
      const groupImages = groupPages.flat();
      return groupImages;
    }
  }, [data]);

  return (
    <FavoriteImagesContext.Provider value={{
      showFavorites,
      setShowFavorites,
      formattedData,
      isLoading,
      isError,
      fetchNextPage,
      hasNextPage,
    }}>
      {children}
    </FavoriteImagesContext.Provider>
  )
}

export const useFavoriteImages = () => useContext(FavoriteImagesContext)