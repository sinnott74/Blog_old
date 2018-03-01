export default [
  {
    path: "/",
    loader: () =>
      import(/* webpackChunkName: "HomePage" */ "core/pages/HomePage"),
    exact: true
  },
  {
    path: "/login",
    loader: () =>
      import(/* webpackChunkName: "LoginPage" */ "core/pages/LoginPage"),
    exact: true
  },
  {
    path: "/logout",
    loader: () =>
      import(/* webpackChunkName: "LogoutPage" */ "core/pages/LogoutPage"),
    exact: true
  },
  {
    path: "/signup",
    loader: () =>
      import(/* webpackChunkName: "SignUpPage" */ "core/pages/SignUpPage"),
    exact: true
  },
  {
    loader: () =>
      import(/* webpackChunkName: "Error404Page" */ "core/pages/Error404Page"),
    exact: true
  }
];
