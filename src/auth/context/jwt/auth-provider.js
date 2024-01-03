import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo, useState, useContext } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
import dayjs from 'dayjs';
//
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import { paths } from 'src/routes/paths';
import AmplifyNewPasswordView from 'src/nextzen/signup/CreatePassword';
import { useRouter } from 'src/routes/hooks';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
import { Alert, Snackbar } from '@mui/material';
import UserContext from 'src/nextzen/context/user/UserConext';
import ScrollTopButton from './scroll-top';
import { useSnackbar } from 'notistack';
import { PATH_TO_REST_PASSWORD } from 'src/config-global';

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
  const {enqueueSnackbar} = useSnackbar()
  const permission = {
    claims: {
      claimApprove: true,
      compoffApprove: true,
      mainHeading: true,
      myClaims: true,
      myCompoff: true,
    },
    configurations: {
      appraisalConfigurations: true,
      compoffConfigurations: true,
      expenseClaimConfigurations: true,
      leaveConfigurations: true,
      mainHeading: true,
      roleConfigurations: true,
      shiftConfigurations: true,
    },
    employeeManagement: {
      employeeTable: true,
      mainHeading: true,
      salaryStructure: true,
      statutory: true,
    },
    itDeclaration: {
      declarationDetails: true,
      houseProperty: true,
      licPremium: true,
      mainHeading: false,
      materDetails: true,
      medicalInsurancePremium: true,
      rentDetails: true,
    },
    leaveManagement: {
      approveLeave: true,
      leaveCalendar: true,
      mainHeading: false,
    },
    monthlyAdditionalDeductions: {
      loans: true,
      mainHeading: false,
      myDeductions: true,
      salaryAdvance: true,
    },
    payroll: {
      mainHeading: false,
      payRun: true,
      paySchedule: true,
      payScheduleHistory: true,
    },
    organizationchart: {
      // mainHeading: false,
      OrganizationChart: true,
    },
    shiftManagement: {
      assignShift: true,
      mainHeading: false,
      myShiftDetails: true,
      shiftRoaster: true,
      shiftSwap: true,
    },
    timeSheetManagement: {
      approvals: true,
      mainHeading: false,
      myTimesheet: true,
      projects: true,
    },
  };
  const { setUser } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [OptVerify, setOptVerify] = useState(false);
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const [open, setOpen] = useState(false);

  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State to control Snackbar visibility

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken) {
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

  const login = useCallback(async (companyEmail, password) => {
    const data = {
      companyEmail,
      password,
    };

    // console.log(data, 'data ......');
    try {
      const response = await axios.post(baseUrl + '/loginUser', data);
      // const obj = response?.data;
      // obj.permission=permission
      localStorage.setItem('userDetails', JSON.stringify(response?.data));
      setUser(response?.data);
      const companyEmail = localStorage.setItem('companyEmail', data?.companyEmail);
      //  const response = await axios.post(endpoints.auth.login, data);
      // const response = await axios.post('https://vshhg43l-3001.inc1.devtunnels.ms/erp/loginUser',data)
      const companyID = localStorage.setItem('companyID', response?.data?.companyID);
      const employeeID = localStorage.setItem('employeeID', response?.data?.employeeID);
      const departmentID = localStorage.setItem('departmentID', response?.data?.departmentID);
      const designationGradeID = localStorage.setItem(
        'designationGradeID',
        response?.data?.designationGradeID
      );
      const designationID = localStorage.setItem('designationID', response?.data?.designationID);
      const locationID = localStorage.setItem('locationID', response?.data?.locationID);
      const reportingManagerID = localStorage.setItem(
        'reportingManagerID',
        response?.data?.reportingManagerID
      );
      const roleID = localStorage.setItem('roleID', response?.data?.roleID);
      const userName = localStorage.setItem('userName', response?.data?.userName);

      const { accessToken, user } = response.data;
      console.log(response?.data.statusCode, 'response');
      if (response?.data?.statusCode === 200) {
        setSession(accessToken);
        //  setSession("1")
        if(response?.data?.firstLogin===false){
          router.push(paths.auth.jwt.resetpassword);
        }else{
          dispatch({
          type: 'LOGIN',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
        }
        
      } else if (response?.data?.statusCode === 400 || 401) {
        console.log(response?.data?.message, 'diapley error');
        setSnackbarSeverity('error');
        setSnackbarMessage(response?.data?.message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('An unexpected error occurred');
      setSnackbarOpen(true);
      
    }
  }, []);
  const [datesUsed, setDatesUsed] = useState({
    date: dayjs(new Date()),
  });
  // REGISTER
  const register = useCallback(
    async (
      cin,
      companyName,
      companyRegistrationNo,
      companyDateOfIncorporation,
      companyCeoName,
      companyType,
      industryType,
      emailId,
      phoneNo,
      firstName,
      middleName,
      lastName,
      companyAddressLine1,
      companyAddressLine2,
      companyCountry,
      companyCity,
      companyState,
      companyPincode,
      empIdPrefix,
      logoName,
      modules,
      companyLogo,
      // modules,
      
    ) => {
      console.log('hiiii');
      const data = {
        cin,
        companyName,
        companyRegistrationNo,
        // companyDateOfIncorporation,
        companyCeoName,
        companyType,
        industryType,
        emailId,
        phoneNo,
        firstName,
        // middleName,
        // selectedCheckboxNames,
        lastName,
        companyAddressLine1,
        companyAddressLine2,
        companyCountry,
        companyCity,
        companyState,
        companyPincode,
        empIdPrefix,
        logoName,
        modules,
        companyLogo,
      };
      if (companyDateOfIncorporation != 'NaN-NaN-NaN') {
        data.companyDateOfIncorporation = companyDateOfIncorporation;
      }
      if (middleName != '') {
        data.middleName = middleName;
      }
      console.log(data, 'data ......');
    //  if(modules){
         data.modules =modules
    //   }
    console.log(data,'FUN')
      const response = await axios.post(baseUrl + '/signup', data);
      // const response = await axios.post(endpoints.auth.register, data);
      if(response?.data.code === 200){
        console.log(response);
        enqueueSnackbar(response?.data?.message,{variant:'success'})
        const accessToken = response?.data?.data?.jwt;
        console.log(accessToken, 'accessssss');
        console.log(response?.data?.data?.email)
        localStorage.setItem('jwt_access_token', accessToken);
        localStorage.setItem('email',response?.data?.data?.email);
  
        <AmplifyNewPasswordView emailId={data.emailId} />;
      }
      else if(response?.data.code === 400 || 409){
        enqueueSnackbar(response?.data?.message,{variant:'error'})
      }
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    localStorage.removeItem('accessToken');
    localStorage.clear();
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
  const snackBarAlertHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={snackBarAlertHandleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={snackBarAlertHandleClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
        <ScrollTopButton/>
      <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>{' '}
    </>
  );
}
export { reducer }; // Exporting only the reducer function

AuthProvider.propTypes = {
  children: PropTypes.node,
};
