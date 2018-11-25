import React, { Component } from 'react';
import { COLLECTIONS } from '../common/constants';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPlantProducts } from '../../actions/productActions';

class YouMayAlsoLike extends Component {
  state = {};
  render() {
    const { products, collection } = this.props;
    const productList =
      collection === 'all-plants'
        ? getAllPlantProducts(products)
        : products.filter(product => {
          console.log(product)
            return JSON.parse(product.metadata.collection).includes(collection);
          });
    console.log(productList);
    return (
      <div>
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products
});

export default connect(mapStateToProps)(YouMayAlsoLike);
