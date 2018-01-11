export const LIST_BLOG_POSTS = 'LIST_BLOG_POSTS';
export const ADD_BLOG_ENTRY = 'ADD_BLOG_ENTRY';
export const EDIT_BLOG_ENTRY = 'EDIT_BLOG_ENTRY';
export const DELETE_BLOG_ENTRY = 'DELETE_BLOG_ENTRY';
export const LOADING_BLOG_POSTS = 'LOAD_BLOG_POSTS';
export const BLOG_POSTS_ERRORED = 'BLOG_POSTS_ERRORED';
export const GET_BLOG_POST = 'GET_BLOG_POST';

export function listBlogPosts(blogPosts){
  return {
    type: LIST_BLOG_POSTS,
    blogPosts
  }
}

export function addBlogPost(blogPost){
  return {
    type: ADD_BLOG_ENTRY,
    ...blogPost
  }
}

export function editBlogPost(blogPost){
  return {
    type: EDIT_BLOG_ENTRY,
    ...blogPost
  }
}

export function deleteBlogPost(id){
  return {
    type: DELETE_BLOG_ENTRY,
    id
  }
}

export function loadingBlogPosts(bool){
  return {
    type: LOADING_BLOG_POSTS,
    isLoading: bool
  }
}

export function blogHasErrored(bool){
  return {
    type: BLOG_POSTS_ERRORED,
    hasErrored: bool
  }
}

export function getBlogPost(blogPost){
  console.log('getting blogpost')
  return {
    type: GET_BLOG_POST,
    blogPost
  }
}

export function loadBlogPosts() {
  return function(dispatch) {
    console.log('loading posts');
    dispatch(loadingBlogPosts(true));
    fetch('/api/blogposts')
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        dispatch(loadingBlogPosts(false));
        return response;
    })
    .then((response) => response.json())
    .then((blogPosts) => dispatch(listBlogPosts(blogPosts)))
    .catch(() => dispatch(blogHasErrored(true)));
  }
}

export function loadBlogPost(id) {
  return function(dispatch) {
    console.log('loading posts');
    dispatch(loadingBlogPosts(true));
    fetch(`/api/blogposts/${id}`)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        dispatch(loadingBlogPosts(false));
        return response;
    })
    .then((response) => response.json())
    .then((blogPost) => dispatch(getBlogPost(blogPost)))
    .catch((err) => {
      console.log(err);
      dispatch(blogHasErrored(true))
    });
  }
}