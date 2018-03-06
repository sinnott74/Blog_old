import React from "react";
import PropTypes from "prop-types";
import TextField from "react-md/lib/TextFields/TextField";
import Tab from "react-md/lib/Tabs/Tab";
import Tabs from "react-md/lib/Tabs/Tabs";
import TabsContainer from "react-md/lib/Tabs/TabsContainer";
import SubmitButton from "core/components/SubmitButton";
import TagChip from "blog/components/TagChip";
import "./BlogEditor.css";
import ViewBlogPost from "blog/components/ViewBlogPost";
import Card from "core/components/Card";

export default class BlogEditor extends React.Component {
  constructor(props) {
    super();

    this.state = {
      tags: [],
      ...props.blogpost
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.blogpost,
      ...this.state.blogpost
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // const { username, password } = this.state;
    // if (username && password) {
    //    this.props.handleLogin(username, password);
    // }

    this.props.handleSave(this.state);
  }

  render() {
    return (
      <TabsContainer
        panelClassName="md-grid "
        colored
        style={{ width: "100%", height: "100%" }}
        swipeableViewsStyle={{ height: "100%" }}
        slideStyle={{ height: "100%" }}
      >
        <Tabs tabId="edit" centered className="blogeditor_tabs">
          <Tab label="Editor">
            <Card className="blogeditor_card">
              <TextField
                type="text"
                name="title"
                label="Title"
                helpText="Please enter a BlogPost title"
                helpOnFocus
                required
                value={this.state.title}
                autoComplete=""
                maxLength={255}
                onChange={(title, e) => {
                  this.setState({
                    ...this.state,
                    title
                  });
                }}
              />
              <div className="blogeditor_tagchips">{this.getTagChips()}</div>
              <TextField
                type="text"
                name="text"
                label="Add a Tag"
                helpText="Press Enter to add a Tag"
                helpOnFocus
                maxRows={1}
                maxLength={255}
                onKeyPress={this._handleTagKeyPress}
                ref={tagField => {
                  this.tagField = tagField;
                }}
              />
              <TextField
                type="text"
                name="text"
                label="Text"
                helpText="Markdown is allowed :)"
                helpOnFocus
                required
                rows={1}
                value={this.state.text}
                onChange={this.addTag}
              />
              <SubmitButton
                isSubmitting={this.props.isSubmitting}
                onClick={this.handleSubmit}
              >
                Save
              </SubmitButton>
            </Card>
          </Tab>
          <Tab label="preview">
            <ViewBlogPost {...this.state} />
          </Tab>
        </Tabs>
      </TabsContainer>
    );
  }

  getTagChips = () => {
    return this.state.tags.map(tag => {
      return <TagChip key={tag.name} tag={tag.name} onClick={this.removeTag} />;
    });
  };

  addTag = tagName => {
    if (
      !this.state.tags.some(tag => {
        return tag.name === tagName;
      })
    ) {
      const tag = {
        name: tagName
      };
      this.setState({
        ...this.state,
        tags: [...this.state.tags, tag]
      });
    }
  };

  removeTag = tagName => {
    this.setState({
      ...this.state,
      tags: this.state.tags.filter(storedTag => {
        return storedTag.name !== tagName;
      })
    });
  };

  _handleTagKeyPress = e => {
    if (e.key === "Enter") {
      const tag = this.tagField.value;
      const field = this.tagField.getField();
      field.value = "";
      if (tag) {
        this.addTag(tag);
      }
    }
  };
}

BlogEditor.propTypes = {
  handleSave: PropTypes.func.isRequired
};
