enum ResponseMessages {
  NOT_FOUND = 'Not found',
  BAD_REQUEST = 'Bad Request',
  CONFLICT = 'Already exist',
  UNAUTHORIZED = 'User is not authorized',
  INCORRECT_ID = 'Incorrect ID',
  FORBIDDEN = 'Access Denied',
  SERVER_ERROR = 'Internal error',
  AUTH_ERROR = 'Authorization error',
  VALIDATE_ACCESS = 'Access Denied (only available to owner or administrator)',
}

enum Endpoints {
  AUTH = 'auth',
  USERS = 'users',
  PRODUCTS = 'products',
  STATISTIC = 'stats',
  FILES = 'files',
}

const DEFAULT_ENV = {
  port: 5100,
  uploads: 'uploads',
};

export { ResponseMessages, Endpoints, DEFAULT_ENV };
