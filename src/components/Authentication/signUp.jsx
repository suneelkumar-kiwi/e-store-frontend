import { Button, Col, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import InputField from "./inputField";
import API_BASE_URL from "../../utils/constants";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const initialValue = {
        name: '',
        email: '',
        username: '',
        password: '',
    }

    let signUpSchema = Yup.object({
        name: Yup.string().required("Name required."),
        email: Yup.string().email("Please enter valid email.").required("Email required."),
        username: Yup.string().required("Username required."),
        password: Yup.string().min(6, "Enter min. 6 word.").required("Password required."),
    });

    // Create User API
    const createUser = async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, {
                name: userData.name,
                email: userData.email,
                username: userData.username,
                password: userData.password,
            });
            localStorage.setItem('authUser', JSON.stringify(response?.data))
            navigate('/');
            toast.success("Registered successfully.");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Please retry to register.");
        }
    };

    const hendleSubmit = (values) => {
        createUser(values);
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="white-box">
                    <h1> Create An Account </h1>
                    <Formik
                        initialValues={initialValue}
                        onSubmit={(values) => hendleSubmit(values)}
                        validationSchema={signUpSchema}
                    >
                        {({ getFieldProps }) => (
                            <Form>
                                <Row>
                                    <Col md={12}>
                                        <InputField
                                            label="Full Name"
                                            type="text"
                                            placeholder="Enter full name"
                                            {...getFieldProps('name')}
                                        />
                                    </Col>
                                    <Col md={12}>
                                        <InputField
                                            label="Email"
                                            type="email"
                                            placeholder="Enter email"
                                            {...getFieldProps('email')}
                                        />
                                    </Col>
                                    <Col md={12}>
                                        <InputField
                                            label="Username"
                                            type="text"
                                            placeholder="Enter username"
                                            {...getFieldProps('username')}
                                        />
                                    </Col>
                                    <Col md={12}>
                                        <InputField
                                            label="Password"
                                            type="password"
                                            placeholder="Enter password"
                                            {...getFieldProps('password')}
                                        />
                                    </Col>
                                </Row>
                                <Button type="submit">Submit</Button>
                            </Form>
                        )}
                    </Formik>
                    <p className="no-account"> Already have account? <Link to="/login">  Sign In</Link></p>
                </div>
            </div>
        </div>
    );
}
export default SignUp;