import { showToast } from './toast';
import { push } from 'react-router-redux'

export const LIST_BLOG_POSTS = 'LIST_BLOG_POSTS';
export const EDIT_BLOG_ENTRY = 'EDIT_BLOG_ENTRY';
export const DELETE_BLOG_ENTRY = 'DELETE_BLOG_ENTRY';
export const LOADING_BLOG_POSTS = 'LOAD_BLOG_POSTS';
export const BLOG_POSTS_ERRORED = 'BLOG_POSTS_ERRORED';
export const STORE_BLOG_POST = 'STORE_BLOG_POST';

function listBlogPosts(blogPosts){
  return {
    type: LIST_BLOG_POSTS,
    blogPosts
  }
}

function removeBlogPost(id){
  return {
    type: DELETE_BLOG_ENTRY,
    id
  }
}

function loadingBlogPosts(bool){
  return {
    type: LOADING_BLOG_POSTS,
    isLoading: bool
  }
}

function blogHasErrored(bool){
  return {
    type: BLOG_POSTS_ERRORED,
    hasErrored: bool
  }
}

function storeBlogPost(blogPost){
  return {
    type: STORE_BLOG_POST,
    blogPost
  }
}

export function deleteBlogPost(id) {
  return function(dispatch) {
    dispatch(loadingBlogPosts(true));
    fetch(`/api/blogposts/${id}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(loadingBlogPosts(false));
      return response;
    })
    .then(() => dispatch(removeBlogPost(id)))
    .then(() => dispatch(showToast('Blog post deleted')))
    .catch((err) => {
      dispatch(blogHasErrored(true))
      dispatch(showToast('Delete failed'))
    })
  }
}

export function addBlogPost(blogpost) {
  return function(dispatch) {
    dispatch(loadingBlogPosts(true));
    fetch('/api/blogposts/', {
      method: 'POST',
      body: JSON.stringify(blogpost),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(loadingBlogPosts(false));
      return response;
    })
    .then((response) => response.json())
    .then((blogPost) => {
      dispatch(storeBlogPost(blogPost))
      blogpost = blogPost;
    })
    .then(() => dispatch(showToast('Blog post saved')))
    .then(() => dispatch(push(`/blog/${blogpost.id}`)))
    .catch((err) => {
      console.log(err);
      dispatch(blogHasErrored(true))
      dispatch(showToast('Save failed'))
    })
  }
}

export function editBlogPost(blogpost) {
  return function(dispatch) {
    dispatch(loadingBlogPosts(true));
    fetch(`/api/blogposts/${blogpost.id}`, {
      method: 'PUT',
      body: JSON.stringify(blogpost),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(loadingBlogPosts(false));
      return response;
    })
    // .then((response) => response.json()) // no response body on modify
    .then(() => dispatch(storeBlogPost(blogpost)))
    .then(() => dispatch(showToast('Blog post saved')))
    .then(() => dispatch(push(`/blog/${blogpost.id}`)))
    .catch((err) => {
      console.log(err);
      dispatch(blogHasErrored(true))
      dispatch(showToast('Save failed'))
    })
  }
}

export function loadBlogPosts() {
  return function(dispatch) {
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
    .catch((err) => {
      console.log(err);
      dispatch(blogHasErrored(true))
    });
  }
}

export function loadBlogPost(id) {
  return function(dispatch) {
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
    .then((blogPost) => dispatch(storeBlogPost(blogPost)))
    .catch((err) => {
      console.log(err);
      dispatch(blogHasErrored(true))
    });
  }
}