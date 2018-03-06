import { connect } from "react-redux";
import { editBlogPost, loadBlogPost } from "blog/ducks/blog";
import { getLoggedInUserID } from "core/ducks/auth";
import BlogEditor from "blog/components/BlogEditor";

class EditBlogPost extends BlogEditor {
  componentDidMount() {
    super.componentDidMount();
    this.props.loadBlogPost();
  }
}

const mapStateToProps = (state, ownProps) => ({
  blogpost: {
    ...state.blog.byId[ownProps.id],
    user_id: getLoggedInUserID(state)
  },
  isSubmitting: state.blog.isLoading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSave: blogpost => dispatch(editBlogPost(blogpost)),
  loadBlogPost: () => dispatch(loadBlogPost(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBlogPost);
