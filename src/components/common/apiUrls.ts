// const baseUrls = {
//   v1: "http://192.168.1.16:8091",
//   v2: "http://109.201.15.164:8091",
// };
// http://192.168.1.163:45455/


type ApiEndpoint = string | ((id: string) => string);

interface ApiEndpoints {
  auth: {
    login: string;
    register: string;
    logout: string;
    ChangePassword: string;
  };
  companies: {
    list: string;
    create: string;
    update: ApiEndpoint;
    delete: ApiEndpoint;
    get: ApiEndpoint;
  };
  employees: {
    list: string;
    create: string;
    update: ApiEndpoint;
    delete: ApiEndpoint;
    get: ApiEndpoint;
  };
  profiles: {
    get: ApiEndpoint;
    update: ApiEndpoint;
  };
  evaluations: {
    create: string;
    list: string;
    get: ApiEndpoint;
  };
}

export const apiEndpoints: ApiEndpoints = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    ChangePassword: '/api/auth/change-password',
  },
  companies: {
    list: '/api/companies',
    create: '/api/companies',
    update: (id: string) => `/api/companies/${id}`,
    delete: (id: string) => `/api/companies/${id}`,
    get: (id: string) => `/api/companies/${id}`,
  },
  employees: {
    list: '/api/employees',
    create: '/api/employees',
    update: (id: string) => `/api/employees/${id}`,
    delete: (id: string) => `/api/employees/${id}`,
    get: (id: string) => `/api/employees/${id}`,
  },
  profiles: {
    get: (id: string) => `/api/profiles/${id}`,
    update: (id: string) => `/api/profiles/${id}`,
  },
  evaluations: {
    create: '/api/evaluations',
    list: '/api/evaluations',
    get: (id: string) => `/api/evaluations/${id}`,
  },
};
