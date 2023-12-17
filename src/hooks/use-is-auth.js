import useSelector from "./use-selector";

export default function useIsAuth() {
  const select = useSelector(state => ({
    isAuthorized: state.login.isAuthorized,
    isUserAuthChecked: state.login.isUserAuthChecked,
    user: state.login.user,
    isWaiting: state.login.isWaiting,
  }));

  return {
    isAuth: select.isAuthorized,
    isAuthChecked: select.isUserAuthChecked,
    userData: select.user,
    isAuthWaiting: select.isWaiting,
  };
}
