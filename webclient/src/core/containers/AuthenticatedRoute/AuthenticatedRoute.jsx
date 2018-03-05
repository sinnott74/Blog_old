import AuthenticatedRoute from "core/components/AuthenticatedRoute";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps, null)(AuthenticatedRoute);
