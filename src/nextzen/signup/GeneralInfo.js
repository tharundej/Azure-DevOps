import React from 'react';

import { Button } from '@mui/base';
import Link from '@mui/material/Link';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';

export default function GeneralInfo() {
  return (
    <div>
      <Link href={paths.auth.jwt.register} component={RouterLink} variant="subtitle2">
        <Button variant="contained">back</Button>
      </Link>
    </div>
  );
}
