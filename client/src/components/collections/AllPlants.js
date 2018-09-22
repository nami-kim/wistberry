import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllProducts } from '../../actions/productActions'

class AllPlantProducts extends Component {
 
  render() {
    return (

      <div>
        <h1>AllPlantProducts</h1>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product
})
export default connect(mapStateToProps, { getAllProducts })(AllPlantProducts)
