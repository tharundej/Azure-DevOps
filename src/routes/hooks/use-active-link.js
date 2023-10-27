import { useLocation, matchPath } from 'react-router-dom';

// ----------------------------------------------------------------------

export function useActiveLink(path, deep = true) {
  const { pathname } = useLocation();

  // const normalActive = path ? !!matchPath({ path, end: true }, pathname) : false;
  // const deepActive = path ? !!matchPath({ path, end: false }, pathname) : false;
  
  // if (deep && !normalActive) {
  //   // Check for child routes
  //   // const pathParts = path.split('/').filter(Boolean);
  //   // const pathnameParts = pathname.split('/').filter(Boolean);
    
  //   // for (let i = 0; i < pathParts.length; i++) {
  //   //   if (pathParts[i] === pathnameParts[i]) {
  //   //     const childPath = `/${pathParts.slice(0, i + 1).join('/')}`;
  //   //     if (!!matchPath({ path: childPath, end: true }, pathname)) {
  //   //       return true;
  //   //     }
  //   //   }
  //   // }
  //   const childPath = path.split('/').filter(Boolean)[0]; // Extract the first segment as the child path.

  //   // Check for an exact match with the child path.
  //   const exactMatch = !!matchPath({ path: childPath, end: true }, pathname);

  //   if (exactMatch) {
  //     return true;
  //   }
  // }
  // // return deep ? deepActive : normalActive;
  // return deep ? normalActive : normalActive || deepActive;

  // Check if the current pathname starts with the specified path (exact match).
  const isActive = path ? pathname.startsWith(path) : false;

  return isActive;

}

