import React, { Component } from 'react';
import Header from '../Header';
import { COLLECTIONS } from '../common/constants';
import { Link } from 'react-router-dom';
import { getAllPlantProducts } from '../../actions/productActions';

class CollectionPage extends Component {
  state = {};
  render() {
    const { products, match } = this.props;
    const collectionUrl = match.params.collection;

    const productList =
      collectionUrl === 'all-plants'
        ? getAllPlantProducts(products)
        : products.filter(product =>
            JSON.parse(product.metadata.collection).includes(collectionUrl)
          );

    const collectionHeroImage = {
      'all-plants':
        'http://wistberry.imgix.net/images/products/hero/plantonpink2.jpg',
      'pet-safe-plants':
        'http://wistberry.imgix.net/images/products/hero/orangewall.jpg',
      'most-popular-plants':
        'http://wistberry.imgix.net/images/products/hero/orangewall.jpg',
      'easy-care-plants':
        'http://wistberry.imgix.net/images/products/hero/plantonpink2.jpg'
    };

    const collectionIntro = {
      'all-plants':
        'Non-toxic and pet-friendly picks, according to experts at the ASPCA',
      'pet-safe-plants':
        'Non-toxic and pet-friendly picks, according to experts at the ASPCA',
      'most-popular-plants':
        'Our most popular, top-selling plants of the season',
      'easy-care-plants':
        'These laidback plants can handle neglect and thrive in small spaces'
    };
    return (
      <div>
        <Header />
        <div
          className="collection-hero"
          style={{
            background: `url("${collectionHeroImage[collectionUrl]}")`,
            backgroundSize: 'cover'
          }}
        >
          <div className="collection__name">
            {
              COLLECTIONS.find(collection => collection.url === collectionUrl)
                .name
            }
          </div>
          <div className="collection__intro">
            {collectionIntro[collectionUrl]}
          </div>
        </div>
        <div className="container-wide collection">
          <div className="row">
            {productList.map(({ id, name, caption, images, metadata }) => (
              <div className="col-sm-6 col-md-6 col-lg-4" key={id}>
                <Link
                  to={`/products/${metadata.url}`}
                  className="collection__card"
                >
                  <div className="product__image-container">
                    <img
                      src={
                        this.state[id] === undefined
                          ? this.setState(() => ({ [id]: images[0] }))
                          : this.state[id]
                      }
                      alt="match.params.collection"
                      className="product__image"
                      onMouseEnter={() =>
                        this.setState(() => ({ [id]: images[1] }))
                      }
                      onMouseLeave={() =>
                        this.setState(() => ({ [id]: images[0] }))
                      }
                    />
                  </div>

                  <div className="product__info">
                    <span className="product__name">{name}</span>
                    <span className="product__price">$129</span>
                  </div>
                  <div className="product__caption">
                    <span className="product__caption--1">{caption}</span>
                    <span className="product__caption--2">(pot + plant)</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionPage;
