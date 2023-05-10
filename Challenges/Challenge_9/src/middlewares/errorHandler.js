import { errorDictionary } from '../utils/errorDictionary.js';

const errorHandler = (err, req, res, next) => {

  switch(err.code) {
    case errorDictionary.REQUIRED_FIELDS_ERROR:
      console.log({ status: 'error', error: err.name, message: err.message, cause: err.cause, code: err.code });
      res.redirect('/register');
      break;
    case errorDictionary.DUPLICATED_USER_ERROR:
      console.log({ status: 'error', error: err.name, message: err.message, cause: err.cause, code: err.code });
      res.redirect('/register');
      break;
    case errorDictionary.AUTHENTICATION_ERROR:
      console.log({ status: 'error', error: err.name, message: err.message, cause: err.cause, code: err.code });
      res.redirect('/login');
      break;
    case errorDictionary.AUTHORIZATION_ERROR:
      console.log({ status: 'error', error: err.name, message: err.message, cause: err.cause, code: err.code });
      res.redirect('/home');
      break;
    case errorDictionary.INVALID_USER_ERROR:
      console.log({ status: 'error', error: err.name, message: err.message, cause: err.cause, code: err.code });
      res.redirect('/login');
      break;
    case errorDictionary.WRONG_PASSWORD_ERROR:
      console.log({ status: 'error', error: err.name, message: err.message, cause: err.cause, code: err.code });
      res.redirect('/login');
      break;
    default:
      res.status(500).json({ status: 'error', error: 'Internal Server Error', code: err.code });
  }

  //console.log(err.message);

  //if(err.message === 'Not authenticated') return res.redirect('/login');

  //if(err.message === 'Not authorized') return res.redirect('/home');

  //if(err.message) return res.status(400).json({ Error: err.message, Cause: err.cause });

  //res.status(500).json({ Error: 'Internal Server Error' });
};

export default errorHandler;
