import React from 'react';
import Header from '../Header';
import { COLLECTIONS } from '../common/constants';
import { Link } from 'react-router-dom';

const CollectionPage = ({ products, match }) => {
  const productList =
    match.params.collection === 'all-plants'
      ? products.filter(product => product.metadata.type === 'plant')
      : products.filter(product =>
          JSON.parse(product.metadata.collection).includes(
            match.params.collection
          )
        );

  return (
    <div>
      <Header />
      <div className="collection">
        <div className="collection__name">
          <img
            src="http://wistberry.imgix.net/images/products/hero/plantonpink2.jpg"
            alt="hero"
            className="home__hero-image"
          />
          {
            COLLECTIONS.find(
              collection => collection.url === match.params.collection
            ).name
          }
        </div>
        {productList.map(({ name, caption, images, metadata }) => (
          <Link to={`/products/${metadata.url}`} key={name} className="collection__card">
            <img
              src={images[0]}
              alt="match.params.collection"
              className="product__image"
            />
            <div className="product__info">
              <div className="product__name">{name}</div>
              <span className="product__price">$129</span>
            </div>
            <div className="product__caption">{caption}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
