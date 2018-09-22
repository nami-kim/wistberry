import React, { Component } from 'react';
import Header from '../Header';
import CollectionTemplate from './CollectionTemplate';

class BestSellingPlants extends Component {
  render() {
    const bestSellingPlants = {
      collection: 'Best-selling Plants',
      description: 'Our most popular, top-selling plants of the season',
      list: 'list'
    };
    const {collection, description, list} = bestSellingPlants
    return (
      <div>
        <Header />
        <CollectionTemplate
          collection={collection}
          description={description}
          list={list}
        />
      </div>
    );
  }
}

export default BestSellingPlants;
