import React from 'react';
import { StrictDict } from 'utils';

import { apiHooks } from '../../hooks';

export const state = StrictDict({
  sidebarShowing: (val) => React.useState(val), // eslint-disable-line
});

export const useInitializeAllCourses = () => {
  const initializeAllCourses = apiHooks.useAllCourses();
  React.useEffect(() =>  initializeAllCourses(), []); // eslint-disable-line
};

export default {
  useInitializeAllCourses,
};
