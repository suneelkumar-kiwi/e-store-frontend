import { Form, Formik } from "formik";
import InputField from "../Authentication/inputField";
import { Button } from "react-bootstrap";
import * as Yup from 'yup';

const CreateProduct = () => {
    const initialValue = {

    }

    let createProductSchema = Yup.object({

    });

    const hendleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div className="create-product-wrp">
            <div className="create-product-form">
                <Formik
                    initialValues={initialValue}
                    onSubmit={(values) => hendleSubmit(values)}
                    validationSchema={createProductSchema}
                >

                    {({ getFieldProps }) => (
                        <Form>
                            <InputField
                                label="Username or email address"
                                type="text"
                                placeholder="Enter username"
                                {...getFieldProps('username')}
                            />
                            <Button type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default CreateProduct;