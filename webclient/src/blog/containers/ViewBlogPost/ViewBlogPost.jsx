import ViewBlogPost from "blog/components/ViewBlogPost";
import { connect } from "react-redux";
import { loadBlogPost } from "blog/ducks/blog";

class DataFetchingViewBlogPost extends ViewBlogPost {
  componentDidMount() {
    super.componentDidMount();
    this.props.fetchData();
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state.blog.byId[ownProps.id],
  auth_id: state.auth.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(loadBlogPost(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DataFetchingViewBlogPost
);
