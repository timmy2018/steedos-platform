
import * as UserActions from '../actions/users';
import { loadSettings } from '../actions/settings';

export function loadMeAndConfig() {
  return async (dispatch) => {
      // if any new promise needs to be added please be mindful of the order as it is used in root.jsx for redirection
      const promises = [
          dispatch(loadSettings()),
          // dispatch(getLicenseConfig()),
      ];

      // // need to await for clientConfig first as it is required for loadMe
      const resolvedPromises = await Promise.all(promises);
      if (localStorage.getItem('accounts:userId')) {
          resolvedPromises.push(await dispatch(UserActions.loadMe()));
      }

      return resolvedPromises;
  };
}