import BlogPost from "blog/components/BlogPost";
import { connect } from "react-redux";
import { loadBlogPost } from "blog/ducks/blog";

const mapStateToProps = (state, ownProps) => ({
  ...state.blog.byId[ownProps.id],
  auth_id: state.auth.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(loadBlogPost(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);
