import {
  AfterCallback,
  AuthError,
  GetLoginState,
  handleAuth,
  handleCallback,
  handleLogin,
} from '@auth0/nextjs-auth0';

const getLoginState: GetLoginState = (req, loginOptions) => {
  console.log('******* REFERRER RETURN TO: ', {
    returnTo: req.headers.referrer,
    loginOptions,
  });
  return {
    returnTo: req.headers.referrer,
  };
};

const afterCallback: AfterCallback = (req, res, session, state) => {
  console.log('***** STATE: ', {state});
  console.log('***** SESSION: ', {session});
  if (session.user) {
    return session;
  } else {
    res.status(401).end('User is not admin');
  }
};

export default handleAuth({
  login: async (req, res) => {
    try {
      await handleLogin(req, res, {
        getLoginState,
        authorizationParams: {custom_login_code: 'test-MS-login'},
      });
    } catch (err: any) {
      res.status(err.status ?? 500).end(err.message);
    }
  },
  callback: async (req, res) => {
    try {
      await handleCallback(req, res, {
        authorizationParams: {custom_callback_code: 'test-MS-callback'},
        afterCallback,
      });
    } catch (err: any) {
      res.status(err.status ?? 500).end(err.message);
    }
  },
});
