export default [
  {
    path: "/blog",
    loader: () =>
      import(/* webpackChunkName: "ListBlogPostPage" */ "blog/pages/BlogListPage"),
    exact: true
  },
  {
    path: "/blog/new",
    loader: () =>
      import(/* webpackChunkName: "AddBlogPostPage" */ "blog/pages/AddBlogPostPage"),
    exact: true,
    authenticated: true
  },
  {
    path: "/blog/:id/edit",
    loader: () =>
      import(/* webpackChunkName: "EditBlogPostPage" */ "blog/pages/EditBlogPostPage"),
    exact: true,
    authenticated: true
  },
  {
    path: "/blog/:id",
    loader: () =>
      import(/* webpackChunkName: "ViewBlogPostPage" */ "blog/pages/ViewBlogPostPage"),
    exact: true
  }
];
