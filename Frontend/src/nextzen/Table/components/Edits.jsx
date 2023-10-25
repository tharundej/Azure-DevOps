import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// import { UserEditView } from 'src/sections/user/view';

// sections
// import { UserEditView } from 'src/sections/user/view';

import UserEditViews  from "./UserEditViews";



// ----------------------------------------------------------------------

export default function UserEdit() {
  const params = useParams();

  const { id } = params;
  // const { id } = "22";


  return (
    <>
      <Helmet>
        <title> Dashboard: User Edit</title>
      </Helmet>
      <h1>hello</h1>

      <UserEditViews id={`${id}`} />
      
    </>
  );
}
