import { connect } from "react-redux";
import { editBlogPost, loadBlogPost } from '../../actions/blog';
import BlogEditor from '../BlogEditor'

class EditBlogPost extends BlogEditor {

  componentDidMount() {
    super.componentDidMount();
    this.props.loadBlogPost();
  }
}

const mapStateToProps = (state, ownProps) => ({
  blogpost: {
    ...state.blog.byId[ownProps.id],
    user_id: state.auth.id
  },
  isSubmitting: state.blog.isLoading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSave: (blogpost) => dispatch(editBlogPost(blogpost)),
  loadBlogPost: () => dispatch(loadBlogPost(ownProps.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditBlogPost)