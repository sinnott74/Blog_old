import { connect } from "react-redux";
import { addBlogPost } from "blog/ducks/blog";
import BlogEditor from "blog/components/BlogEditor";

const mapStateToProps = (state, ownProps) => ({
  blogpost: {
    title: "",
    user_id: state.auth.id
  },
  isSubmitting: state.blog.isLoading,
  username: state.auth.username
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSave: blogpost => dispatch(addBlogPost(blogpost))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogEditor);
