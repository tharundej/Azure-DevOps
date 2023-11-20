import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { GuestGuard } from 'src/auth/guard';
// layouts
import CompactLayout from 'src/layouts/compact';
import AuthClassicLayout from 'src/layouts/auth/classic';

// components
import { SplashScreen } from 'src/components/loading-screen';

import { JwtRegisterView } from 'src/nextzen/signup/Index';

// ----------------------------------------------------------------------

// AMPLIFY
const AmplifyLoginPage = lazy(() => import('src/pages/auth/amplify/login'));
const AmplifyRegisterPage = lazy(() => import('src/pages/auth/amplify/register'));
const AmplifyVerifyPage = lazy(() => import('src/pages/auth/amplify/verify'));
const AmplifyNewPasswordPage = lazy(() => import('src/pages/auth/amplify/new-password'));
const AmplifyForgotPasswordPage = lazy(() => import('src/pages/auth/amplify/forgot-password'));

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const Signup = lazy(() => import('src/nextzen/signup/JwtRegisterView'));
const General = lazy(() => import('src/nextzen/signup/JwtLoginView'));
const VerifyOtp=lazy(()=>import('src/nextzen/signup/VerifyOtp'));
const CreatePassword = lazy(()=>import('src/nextzen/signup/CreatePassword'));
const ForgotPassword = lazy(()=>import('src/nextzen/signup/ForgotPassword'));
const SetPassword = lazy(()=>import('src/nextzen/signup/SetPassword'));
const ChangePassword = lazy(()=>import('../../nextzen/signup/ChangePassword'));
const Otpforgotpassword= lazy(()=>import('src/nextzen/signup/Otp-forgotpassword'));
// FIREBASE
const FirebaseLoginPage = lazy(() => import('src/pages/auth/firebase/login'));
const FirebaseRegisterPage = lazy(() => import('src/pages/auth/firebase/register'));
const FirebaseVerifyPage = lazy(() => import('src/pages/auth/firebase/verify'));
const FirebaseForgotPasswordPage = lazy(() => import('src/pages/auth/firebase/forgot-password'));

// AUTH0
const Auth0LoginPage = lazy(() => import('src/pages/auth/auth0/login'));
const Auth0Callback = lazy(() => import('src/pages/auth/auth0/callback'));

// ----------------------------------------------------------------------

const authAmplify = {
  path: 'amplify',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <AmplifyLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Manage the job more effectively with Minimal">
          <AmplifyRegisterPage />
        </AuthClassicLayout>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'verify', element: <AmplifyVerifyPage /> },
        { path: 'new-password', element: <AmplifyNewPasswordPage /> },
        { path: 'forgot-password', element: <AmplifyForgotPasswordPage /> },
      ],
    },
  ],
};

const authJwt = {
  path: 'jwt',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <JwtLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        // <AuthClassicLayout title="Manage the job more effectively with Next.Zen">
          <JwtRegisterView />
        // </AuthClassicLayout>
      ),
    },
    {
      path: 'verifyotp',
      element:(
        <VerifyOtp/>
      )
    },
    {
      path:'otpverification',
      element:(
        <Otpforgotpassword/>
      )
    },
    {
      path: 'createpassword',
      element:(
        <CreatePassword/>
      )
    },
    {path: 'forgotpassword',
     element:(
      <ForgotPassword/>
     )
    },
    {path:'setpassword',
      element:(
       
        <SetPassword/>

      )
    },
    {
      path:'changepassword',
      element:(
        <ChangePassword/>
      )
    },
    {
      path: 'signup',
      element: (
        // <AuthClassicLayout title="Manage the job more effectively with Next.Zen">
        <Signup />
        // </AuthClassicLayout>
      ),
    },
    {
      path: 'general',
      element: (
        // <AuthClassicLayout title="Manage the job more effectively with Next.Zen">
        <Signup />
        // </AuthClassicLayout>
      ),
    },
  ],
};

const authFirebase = {
  path: 'firebase',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <FirebaseLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Manage the job more effectively with Minimal">
          <FirebaseRegisterPage />
        </AuthClassicLayout>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'verify', element: <FirebaseVerifyPage /> },
        { path: 'forgot-password', element: <FirebaseForgotPasswordPage /> },
      ],
    },
  ],
};

const authAuth0 = {
  path: 'auth0',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <Auth0LoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'callback',
      element: <Auth0Callback />,
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authAmplify, authJwt, authFirebase, authAuth0],
  },
];
