import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo,useState } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
import dayjs from 'dayjs';
//
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import formatDateToYYYYMMDD from 'src/nextzen/global/GetDateFormat';
import { paths } from 'src/routes/paths';
import AmplifyNewPasswordView from 'src/nextzen/signup/CreatePassword';
import { useRouter } from 'src/routes/hooks';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

// import { da } from 'date-fns/locale';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [OptVerify,setOptVerify]=useState(false);
  const router = useRouter();
  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken ) {
        setSession(accessToken);

        // const response = await axios.get(endpoints.auth.me);

        const { user } = {};

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    // console.log(data, 'data ......');

    //  const response = await axios.post( baseUrl + "loginUser" , data);
    //  const response = await axios.post(endpoints.auth.login, data);
    const response = await axios.post('https://vshhg43l-3001.inc1.devtunnels.ms/erp/loginUser',data)
   const companyID = localStorage.setItem('companyID',response?.data?.companyID);
   const employeeID = localStorage.setItem('employeeID',response?.data?.employeeID);
    const { accessToken, user } = response.data;

    setSession("1");

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });
  }, []);
  const [datesUsed, setDatesUsed] = useState({
    date: dayjs(new Date()),
  });
  // REGISTER
  const register = useCallback(async (cin, companyName, companyRegistrationNo,companyDateOfIncorporation,companyCeoName,companyType,emailId,phoneNo,firstName,middleName,lastName,securityQ1,securityA1,securityQ2,securityA2) => {
    console.log('hiiii')
    const data = {
      cin, 
      companyName, 
      companyRegistrationNo, 
      companyDateOfIncorporation,
      companyCeoName,
      companyType,
      emailId,
      phoneNo,
      firstName,
      middleName,
      lastName,
      securityQ1,
      securityA1,
      securityQ2,
      securityA2
    };
      console.log(data, 'data ......');
     const response = await axios.post(baseUrl+'signup', data);
    // const response = await axios.post(endpoints.auth.register, data);

    console.log(response)
    if(!response?.data?.data?.jwt){
      console.log('failed')
      return
    }
    const  accessToken  = response?.data?.data?.jwt;
    console.log(accessToken,'accessssss')
    localStorage.setItem('jwt_access_token',accessToken);
    // sessionStorage.setItem(STORAGE_KEY, accessToken);
    // dispatch({
    //   type: 'REGISTER',
    //   payload: {
    //     user: {
    //       ...user,
    //       accessToken,
    //     },
    //   },
    // });
    
    <AmplifyNewPasswordView emailId={data.emailId}/>
  }, []);





  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
