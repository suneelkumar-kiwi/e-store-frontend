import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import API_BASE_URL from "../../utils/constants";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/products`).then((res) => {
            setProducts(res?.data)
        });
    }, []);
    return (
        <div className="product-list-pg">
            <Container>
                <Row>
                    <Col sm={12}>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"> <Link to="/"> Home </Link> </li>
                                <li className="breadcrumb-item active"> Produts </li>
                            </ol>
                        </nav>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                    </Col>
                    <Col sm={9}>
                        <Row>
                            {products?.map((product) => (
                                <Col key={product.id} sm={4}>
                                    <div className="product-item">
                                        <img className="img-fluid" src={product?.imageUrl} alt={product?.name} />
                                        <div className="product-info">
                                            <h3> {product?.name} </h3>
                                            <span className="category"> Category : {product?.category}</span>
                                            <p>{product?.description}</p>
                                            <div className="button-price">
                                                <span>₹ {product?.price}</span>
                                                <Button type="button"> Add to cart </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Product;