import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'react-md/lib/TextFields/TextField';
import SubmitButton from '../SubmitButton';
import './BlogEditor.css';

export default class BlogEditor extends React.Component {

  constructor(props) {
    super();

    this.state = {
      blogpost: {
        ...props.blogpost
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      blogpost: {
        ...nextProps.blogpost,
        ...this.state.blogpost
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    // const { username, password } = this.state;
    // if (username && password) {
    //    this.props.handleLogin(username, password);
    // }


    console.log('handle save now')
    this.props.handleSave(this.state.blogpost);
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <TextField
            type='text'
            name='title'
            label='Title'
            required
            value={this.state.blogpost.title}
            autoComplete=''
            maxLength={255}
            onChange={(title, e) => {
              this.setState({
                blogpost: {
                  ...this.state.blogpost,
                  title
                }
              });
            }}
          />
          <TextField
            type='text'
            name='text'
            label='Text'
            required
            rows={1}
            value={this.state.blogpost.text}
            onChange={(text, e) => {
              this.setState({
                blogpost: {
                  ...this.state.blogpost,
                  text
                }
              });
            }}
          />
          <SubmitButton isSubmitting={this.props.isSubmitting}>Save</SubmitButton>
        </form>
    );
  }
}

BlogEditor.propTypes = {
  handleSave: PropTypes.func.isRequired
}