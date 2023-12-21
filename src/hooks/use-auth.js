import useSelector from "./use-selector";

export default function useAuth() {
  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists
  }));

  return { isAuth: select.exists, user: select.user };
}
