import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import API_BASE_URL from "../../utils/constants";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../utils/apiCall";
import { toast } from "react-toastify";

const Product = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/products`).then((res) => {
            setProducts(res?.data)
        });
    }, []);

    const handleAddToCart = (e, item) => {
        const userID = JSON.parse(localStorage.getItem('authUser'))?.id;
        if(userID){
            addToCart(item, userID);
            navigate('/cart');
        } else{
            toast.info('Please login first.');
            navigate('/login');
        }
    }

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
                                                <Button onClick={(e) => handleAddToCart(e, product)} type="button"> Add to cart </Button>
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