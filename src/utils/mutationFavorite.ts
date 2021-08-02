import { api } from "../services/api";
import cloneDeep from 'lodash.clonedeep';

interface Image {
  title: string;
  description: string;
  url: string;
  id: string;
  isFavorite: boolean;
}

interface ImageInData {
  data: Array<Image>;
}

interface Page {
  after: string | null;
  data: Array<Image>;
}

interface QueryResult {
  pages: Array<Page>;
  pageParams: Array<string | undefined>;
}

interface UpdatedImg {
  title: string;
  description: string;
}

const formatFavoriteData = (images: Array<Image>, id: string, pageSize: number) => {
  const copiedImages = cloneDeep(images)
  let formatData: QueryResult = {
    pageParams: [],
    pages: []
  };
  let startVector = 0;
  let endVector = pageSize;
  let eachPage: Page;

  if (copiedImages.length === 0) {
    eachPage = {
      data: [],
      after: null
    }
    formatData.pageParams.push(undefined);
    formatData.pages.push(eachPage);
  } else {
    copiedImages.forEach(img => {
      if (img.id === id) {
        img.isFavorite = !img.isFavorite
      }
    })

    let init = copiedImages.slice(startVector, endVector);
    while (init.length !== 0) {
      startVector = startVector + pageSize;
      endVector = endVector + pageSize;
      const prox = copiedImages.slice(startVector, endVector);

      if (prox.length !== 0) {
        eachPage = {
          data: init,
          after: prox[0].id
        }
      } else {
        eachPage = {
          data: init,
          after: null
        }
      }
      formatData.pages.push(eachPage);

      if (formatData.pages.length === 1) {
        formatData.pageParams.push(undefined);
      } else {
        formatData.pageParams.push(eachPage.data[0].id)
      }

      init = prox;
    }
  }
  return formatData;
}

const formatData = (images: Array<Image>, id: string, pageSize: number) => {
  let formatData: QueryResult = {
    pageParams: [],
    pages: []
  };
  let startVector = 0;
  let endVector = pageSize;
  let eachPage: Page;

  if (images.length === 0) {
    eachPage = {
      data: [],
      after: null
    }
    formatData.pageParams.push(undefined);
    formatData.pages.push(eachPage);
  } else {
    const separateData = images.filter(item => item.id !== id);

    if (separateData.length === 0) {
      eachPage = {
        data: [],
        after: null
      }
      formatData.pageParams.push(undefined);
      formatData.pages.push(eachPage);
    } else {
      let init = separateData.slice(startVector, endVector);
      while (init.length !== 0) {
        startVector = startVector + pageSize;
        endVector = endVector + pageSize;
        const prox = separateData.slice(startVector, endVector);

        if (prox.length !== 0) {
          eachPage = {
            data: init,
            after: prox[0].id
          }
        } else {
          eachPage = {
            data: init,
            after: null
          }
        }
        formatData.pages.push(eachPage);

        if (formatData.pages.length === 1) {
          formatData.pageParams.push(undefined);
        } else {
          formatData.pageParams.push(eachPage.data[0].id)
        }

        init = prox;
      }
    }
  }
  return formatData;
}

const deleteImageFromCache = async (id: string, pageSize: number): Promise<{ normalUpdateQuery: QueryResult, favoriteUpdateQuery: QueryResult }> => {
  const { data } = await api.get<ImageInData>('/api/images', {
    params: {
      get: 'all-images'
    }
  });
  const onlyFavoriteImages = data.data.filter(item => item.isFavorite === true);

  const normalUpdateQuery = formatData(data.data, id, pageSize);
  const favoriteUpdateQuery = formatData(onlyFavoriteImages, id, pageSize);

  return { normalUpdateQuery, favoriteUpdateQuery };
}

const switchToTheSameAmountOfPagesAsBefore = (dataQuery: QueryResult, dataDatabase: QueryResult): QueryResult => {
  const numberOfPagesViewed = dataQuery.pages.length;
  const responsePageParams = dataDatabase.pageParams.slice(0, numberOfPagesViewed);
  const responsePages = dataDatabase.pages.slice(0, numberOfPagesViewed);

  const laterData: QueryResult = {
    pageParams: responsePageParams,
    pages: responsePages
  }

  return laterData
}

const updateInfoImageFromCache = (previousData: QueryResult, newData: UpdatedImg, id: string): Array<Page> => {
  const laterData = cloneDeep(previousData.pages)

  laterData.forEach(page => {
    page.data.forEach(img => {
      if (img.id === id) {
        img.title = newData.title;
        img.description = newData.description;
      }
    })
  })

  return laterData
}

const updateFavoriteImageFromCache = async (id: string, pageSize: number): Promise<{ normalUpdateQuery: QueryResult, favoriteUpdateQuery: QueryResult }> => {
  const { data } = await api.get<ImageInData>('/api/images', {
    params: {
      get: 'all-images'
    }
  });
  const onlyFavoriteImages = data.data.filter(item => item.isFavorite === true);

  const normalUpdateQuery = formatFavoriteData(data.data, id, pageSize);
  const favoriteUpdateQuery = formatData(onlyFavoriteImages, id, pageSize);

  return { normalUpdateQuery, favoriteUpdateQuery };
}

export { deleteImageFromCache, switchToTheSameAmountOfPagesAsBefore, updateInfoImageFromCache, updateFavoriteImageFromCache }