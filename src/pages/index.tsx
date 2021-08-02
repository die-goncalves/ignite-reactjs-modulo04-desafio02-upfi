import { useFavoriteImages } from '../contexts/FavoriteImagesContext';
import { useImageAlbum } from '../contexts/ImageAlbumContext';
import { Album } from '../components/Album';

export default function Home(): JSX.Element {
  const {
    formattedData: favoriteFormattedData,
    hasNextPage: favoriteHasNextPage,
    isLoading: favoriteIsLoading,
    isError: favoriteIsError,
    fetchNextPage: favoriteFetchNextPage,
    showFavorites } = useFavoriteImages();
  const {
    formattedData,
    hasNextPage,
    isLoading,
    isError,
    fetchNextPage } = useImageAlbum();

  return (
    <>
      <Album
        isLoading={showFavorites ? favoriteIsLoading : isLoading}
        isError={showFavorites ? favoriteIsError : isError}
        formattedData={showFavorites ? favoriteFormattedData : formattedData}
        hasNextPage={showFavorites ? favoriteHasNextPage : hasNextPage}
        fetchNextPage={showFavorites ? favoriteFetchNextPage : fetchNextPage}
      />
    </>
  );
}
