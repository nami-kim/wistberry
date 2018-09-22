import React, { Component } from 'react';

class CollectionTemplate extends Component {
  render() {
    const { collection, description, list } = this.props;
    return (
      <div>
        <h2>{collection}</h2>
        <p>{description}</p>
        <div>
        {list}
        </div>
      </div>
    );
  }
}

export default CollectionTemplate;
