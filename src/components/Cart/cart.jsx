import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../utils/constants";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const Cart = () => {
    const [cartList, setCartList] = useState([]);
    const userID = JSON.parse(localStorage.getItem('authUser'))?.id;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/cart/${userID}`).then((response) => {
            setCartList(response?.data?.items);
        });
    }, [userID]);

    const removeCartItem = (e, id) => {
        axios.delete(`${API_BASE_URL}/cart/${userID}/${id}`).then((response) => {
            toast.success("Cart item removed.");
            setCartList(response?.data?.items);
        });
    }

    const removeAllItems = () => {
        axios.delete(`${API_BASE_URL}/cart/${userID}`).then(() => {
            toast.success("All cart item removed.");
            setCartList([]);
        });
    }

    return (
        <div className="cart-pg">
            {cartList?.length === 0 && <div className="cart-empty">
                <h2> Shopping Cart </h2>
                <p> Your cart is empty. </p>
                <Link to="/products"> Go to store </Link>
            </div>}
            {cartList?.length > 0 && <Container>
                <div className="cart-header">
                    <Row>
                        <Col sm={8}>

                            <h2> Shopping Cart  </h2>
                            <p> {cartList?.length === 1 ? `${cartList?.length} item` : `${cartList?.length} items`} added </p>
                        </Col>
                        <Col sm={4}>
                            {cartList.length > 1 && <Button onClick={() => removeAllItems()} variant="danger"> Remove all </Button>}
                        </Col>
                    </Row>
                </div>
                {cartList?.map((cart) => (
                    <div className="cart-item" key={cart?._id}>
                        <Row>
                            <Col sm={2}>
                                <div className="product-thumb">
                                    <Image className="img-fluid" src={cart?.imageUrl} alt="" />
                                </div>
                            </Col>
                            <Col sm={7}>
                                <div className="product-info">
                                    <h3> {cart?.name} </h3>
                                    <p> Price : {cart?.price}  </p>
                                    <p> Quantity : {cart?.quantity}  </p>
                                </div>
                            </Col>
                            <Col sm={3}>
                                <div className="cart-action">
                                    <Button onClick={(e) => removeCartItem(e, cart?.productId)} variant="danger"> Remove item </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Container>}
        </div>
    )
}
export default Cart;