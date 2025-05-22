// const baseUrls = {
//   v1: "http://192.168.1.16:9020/",
//   v2: "http://109.201.15.164:8091",
// };
// http://192.168.1.163:45455/

type ApiEndpoints = {
  [key: string]: string;
};

const apiEndpoints: { [version: string]: ApiEndpoints } = {
  v1: {
   
    GetCategoryShop: "/GetCategoryShop",
    login: "/login",
    FirstRegister: "/FirstRegister",
    GetBestSellGood: "/GetBestSellGood",
    
  },
};

const getApiUrl = (version: string, endpoint: string): string => {
  const versionEndpoints = apiEndpoints[version];
  if (!versionEndpoints) {
    throw new Error(`Version "${version}" not found`);
  }

  const url = versionEndpoints[endpoint];
  if (!url) {
    throw new Error(`Endpoint "${endpoint}" not found in version "${version}"`);
  }

  return url;
};

export { getApiUrl };
