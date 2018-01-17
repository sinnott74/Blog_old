import React from 'react';
import BlogList from '../components/BlogList'

export default class BlogListPage extends React.Component {

  componentDidMount() {
    document.title = "Blog";
  }

  render() {
    return (
        <BlogList />
    )
  }
}