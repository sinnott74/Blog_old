/*
 * Blog actions
 */
import { LIST_BLOG_POSTS,
          DELETE_BLOG_ENTRY,
          LOADING_BLOG_POSTS,
          BLOG_POSTS_ERRORED,
          STORE_BLOG_POST
        } from '../actions/blog';
import { arrayToObject, objectToIDKeyedObject, addToArrayAndSort } from './util';

let initialState = {
  byId: {},
  allIds: [],
  isLoading: false,
  hasErrored: false
};

 const blog = (state = initialState, action)  => {
  switch (action.type) {
    case LIST_BLOG_POSTS:
      let blogPosts = arrayToObject(action.blogPosts);
      return {
        ...state,
        byId: {
          ...blogPosts
        },
        allIds: Object.keys(blogPosts)
      }
    case DELETE_BLOG_ENTRY:
      return {
         ...state
      }
    case LOADING_BLOG_POSTS:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case BLOG_POSTS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored,
        isLoading: false
      }
    case STORE_BLOG_POST:
      let blogPost = objectToIDKeyedObject(action.blogPost);
      return {
        ...state,
        byId: {
          ...state.byId,
          ...blogPost
        },
        allIds: addToArrayAndSort(state.allIds, action.blogPost.id)
      }
    default:
      return state;
  }
}

export default blog;