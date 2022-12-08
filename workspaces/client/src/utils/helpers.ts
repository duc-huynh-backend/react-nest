interface IUserSearchData {
  user_name?: string;
  authority?: string;
  page?: number;
  limit?: number;
}

export const getQueryObject = (queryString: string) => {
  const searchObject: IUserSearchData = {};

  const JsonSearchObject =
    queryString.trim() !== '' &&
    '{"' +
      decodeURI(queryString)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}';

  try {
    if (JsonSearchObject)
      Object.assign(searchObject, JSON.parse(JsonSearchObject));
  } catch (error) {}
  return searchObject;
};

export const generateSearchParamsUrlString = (
  pathUrl: string,
  searchObject: any = {},
) => {
  const searchParamsString = new URLSearchParams(searchObject);

  return `${pathUrl}?${searchParamsString.toString()}`;
};
