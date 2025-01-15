import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../utils/constants";
import Slider from "react-slick";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/product-category`).then((res) => {
            setCategories(res?.data)
        });
        axios.get(`${API_BASE_URL}/products`).then((res) => {
            setProducts(res?.data)
        });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    console.log(products);
    return (
        <>
            <section className="category-banner">
                <Slider {...settings}>
                    {categories?.map((category) => (
                        <div key={category.id} className="slide-item">
                            <img className="img-fluid" src={category?.imageUrl} alt={category?.name} />
                            <h1> {category?.description} </h1>
                        </div>
                    ))}
                </Slider>
            </section>
            <section className="product-category">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <h2 className="section-heading"> Product Category </h2>
                        </Col>
                        {categories?.map((category) => (
                            <Col key={category.id} sm={4}>
                                <div className="category-item">
                                    <img className="img-fluid" src={category?.imageUrl} alt={category?.name} />
                                    <div className="overlay">
                                        <h3> <span> Category: </span> {category?.name} </h3>
                                        <Link to="/product"> Go to store </Link>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <section className="papular-product">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <h2 className="section-heading"> The Most Bought Product </h2>
                        </Col>
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
                </Container>
            </section>
        </>
    )
}
export default Home;