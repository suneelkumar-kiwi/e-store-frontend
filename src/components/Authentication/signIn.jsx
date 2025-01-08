import { Button, Image } from "react-bootstrap";
import InputField from "./inputField";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import API_BASE_URL from "../../utils/constants";
import { toast } from "react-toastify";
import useToken from "../../hooks/useToken";
import { logo } from "../../utils/icons";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const { setNewToken } = useToken();
    const navigate = useNavigate();

    const initialValue = {
        username: '',
        password: ''
    }

    let signInSchema = Yup.object({
        username: Yup.string().required("Enter your username."),
        password: Yup.string().required("Enter password.")
    });

    const loginUser = async (userDetail) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                username: userDetail.username,
                password: userDetail.password,
            });
            setNewToken(JSON.stringify(response?.data));
            navigate('/');
            toast.success("Login sucessfully.");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    const hendleSubmit = (values) => {
        loginUser(values);
    }
    return (
        <div className="auth-page">
            <div className="auth-container">
                <Link to='/'> <Image width={180} src={logo} alt="" /> </Link>
                <div className="white-box">
                    <h1> Welcome Back! </h1>
                    <Formik
                        initialValues={initialValue}
                        onSubmit={(values) => hendleSubmit(values)}
                        validationSchema={signInSchema}
                    >
                        {({ getFieldProps }) => (
                            <Form>
                                <InputField
                                    label="Username or email address"
                                    type="text"
                                    placeholder="Enter username"
                                    {...getFieldProps('username')}
                                />
                                <InputField
                                    label="Password"
                                    type="password"
                                    placeholder="Enter password"
                                    {...getFieldProps('password')}
                                />
                                <Button type="submit">Submit</Button>
                            </Form>
                        )}
                    </Formik>
                    <p className="no-account"> Not have a account? <Link to="/register"> Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}
export default SignIn;