import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getProductsByType } from '../../../redux/actions/products';
import { connect } from 'react-redux';

import { Layout, Row, Col, Card, Menu, Dropdown, Button } from 'antd';
import {
  HeartOutlined,
  StarOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { AddToCart } from '../../../icons';
import { addItem } from '../../../utils/cart';
import { Link } from 'react-router-dom';
import './styles.scss';
const { Content } = Layout;
const { Meta } = Card;
const menu = (
  <Menu>
    <Menu.Item key='1' icon={<StarOutlined />}>
      Thứ tự theo: điểm đánh giá
    </Menu.Item>
    <Menu.Item key='2' icon={<HeartOutlined />}>
      Thứ tự theo: mức độ yêu thích
    </Menu.Item>
    <Menu.Item key='3' icon={<CaretUpOutlined />}>
      Thứ tự theo: giá thấp đến cao
    </Menu.Item>
    <Menu.Item key='4' icon={<CaretDownOutlined />}>
      Thứ tự theo: giá cao đến thấp
    </Menu.Item>
  </Menu>
);
const Pets = ({ data: { products, loading }, getProductsByType, match }) => {
  useEffect(() => {
    getProductsByType(match.params.id);
  }, [getProductsByType, match.params.id]);
  return (
    <Content className='pets'>
      <section className='container'>
        <div className='pets__header'>
          <h1 className='pets__header-title'>Pets</h1>
          <div className='pets__header-filter'>
            <Dropdown overlay={menu}>
              <Button>
                Mới nhất <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className='pets-list'>
          <Row gutter={[16, 16]}>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              products.map((product) => (
                <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    bordered={false}
                    cover={
                      <Link to={`/pet/${product._id}`}>
                        <img
                          width='100%'
                          height='100%'
                          alt='example'
                          src={product.images[0]}
                        />
                      </Link>
                    }
                  >
                    <Link to={`/pet/${product._id}`}>
                      <Meta title={product.productName} />
                      <p className='pets__price'>
                        {parseInt(product.price).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </p>
                    </Link>
                    <Button
                      onClick={() => addItem(product)}
                      className='addToCart'
                      icon={<AddToCart />}
                      type='primary'
                    />
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </div>
      </section>
    </Content>
  );
};

Pets.propTypes = {
  getProductsByType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.products,
});

export default connect(mapStateToProps, { getProductsByType })(Pets);