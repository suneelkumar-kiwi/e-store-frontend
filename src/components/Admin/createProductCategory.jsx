import { ErrorMessage, Form, Formik } from "formik";
import InputField from "../Authentication/inputField";
import { Button, Modal, Spinner } from "react-bootstrap";
import * as Yup from 'yup';
import axios from "axios";
import API_BASE_URL from "../../utils/constants";
import { toast } from "react-toastify";
import { useState } from "react";

const CreateProductCategory = ({ show, handleClose }) => {
    const [showLoader, setShowLoader] = useState(false);
    const initialValue = {
        name: '',
        description: '',
        image: ''
    }

    const validatationSchema = Yup.object({
        name: Yup.string().required('Enter category name.'),
        description: Yup.string().required('Enter description.'),
        image: Yup.string().required('Please select image.')
    })

    const hendleSubmit = async (values) => {
        try {
            setShowLoader(true);
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("image", values.image);

            //
            await axios.post(`${API_BASE_URL}/product-category/create`, formData).then(() => {
                setShowLoader(false)
                handleClose(true);
                toast.success('Category created successfully.');
            })
          } catch (error) {
            setShowLoader(false)
            toast.error(error.response?.data || error.message);
          }
    }
    return (
        <Modal className="form-modal" show={show} onHide={handleClose}>
             {showLoader && <div className="modal-loader">  <Spinner animation="border" /> </div>}
            <Modal.Header closeButton>
                <Modal.Title> Create Product Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValue}
                    onSubmit={(values) => hendleSubmit(values)}
                    validationSchema={validatationSchema}
                >
                    {({ getFieldProps, setFieldValue, errors, touched }) => (
                        <Form>
                            <InputField
                                label="Name"
                                type="text"
                                placeholder="Enter name"
                                {...getFieldProps('name')}
                            />
                            <InputField
                                label="Description"
                                type="text"
                                placeholder="Enter description"
                                {...getFieldProps('description')}
                            />
                            <div className={`form-group ${errors.image && touched.image ? 'error-field' : ''}`}>
                                <label htmlFor="image">Upload Image</label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    className="form-control"
                                    onChange={(event) => {
                                        setFieldValue("image", event.currentTarget.files[0]);
                                    }}
                                />
                                <ErrorMessage name="image" component="div" className="text-danger" />
                            </div>
                            <Button type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}
export default CreateProductCategory;