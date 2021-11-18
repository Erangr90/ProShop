// React packages
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Redux packages
import { useDispatch, useSelector } from 'react-redux';
// Components
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductsCarousel from '../components/ProductsCarousel';
import Meta from '../components/Meta';
// Actions
import { ProductsList } from '../actions/productsActions';

const HomeScreen = ({ match }) => {
  // Data from the state
  const productsList = useSelector((state) => state.productsList);
  const { loading, products, error, page, pages } = productsList;

  // Variables
  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  // Listen to data variables
  useEffect(() => {
    dispatch(ProductsList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductsCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Last products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {' '}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
