import { Helmet } from 'react-helmet-async';
// sections
import { Auth0LoginView } from 'src/sections/auth/auth0';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Auth0: LoginF</title>
      </Helmet>

      <Auth0LoginView />
    </>
  );
}
