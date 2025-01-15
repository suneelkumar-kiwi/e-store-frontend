import { ErrorMessage, Form, Formik } from "formik";
import InputField from "../Authentication/inputField";
import { Button, Modal, Spinner } from "react-bootstrap";
import * as Yup from 'yup';
import axios from "axios";
import API_BASE_URL from "../../utils/constants";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateProduct = ({ show, handleClose }) => {
    const [categoryList, setCategoryList] = useState([]);
    const [showLoader, setShowLoader] = useState(false)
    const [selectedOption, setSelectedOption] = useState('');

    const initialValue = {
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: ''
    }

    let createProductSchema = Yup.object({
        name: Yup.string().required('Enter product name.'),
        description: Yup.string().required('Enter description.'),
        price: Yup.string().required('Price is mandatory.'),
        stock: Yup.string().required('Stock is mandatory.'),
        category: Yup.string().required('Select product category.'),
        image: Yup.string().required('Please choose image.'),
    });

    useEffect(() => {
        axios.get(`${API_BASE_URL}/product-category`).then((res) => {
            setCategoryList(res?.data)
        })
    }, [ ]);

    const hendleSubmit = async (values) => {
       try{
        setShowLoader(true);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        formData.append('category', values.category);
        formData.append('image', values.image);

        await axios.post(`${API_BASE_URL}/product/create`, formData).then(() => {
            setShowLoader(false);
            handleClose(true);
            toast.success('Product created successfully.');
        })
       } catch (error) {
        setShowLoader(false);
        handleClose(true);
        toast.error(error || 'Failed to create product.');
       }
    }
    return (
        <Modal className="form-modal" show={show} onHide={handleClose}>
            {showLoader && <div className="modal-loader">  <Spinner animation="border" /> </div>}
            <Modal.Header closeButton>
                <Modal.Title> Create Product </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValue}
                    onSubmit={(values) => hendleSubmit(values)}
                    validationSchema={createProductSchema}
                >
                    {({ getFieldProps, setFieldValue, errors, touched }) => (
                        <Form>
                            <InputField
                                label="Product name"
                                type="text"
                                placeholder="Enter product name"
                                {...getFieldProps('name')}
                            />
                             <div className={`form-group mb-3 ${errors.image && touched.image ? 'error-field' : ''}`}>
                                <label htmlFor="image"> Category </label>
                                <input
                                    id="image"
                                    className="form-control"
                                    type="file"
                                    name="image"
                                    onChange={(e) => setFieldValue('image', e.target.files[0])}
                                />
                                <ErrorMessage name="image" component={'div'} className="text-danger" />
                            </div>
                            <InputField
                                label="Description"
                                type="text"
                                placeholder="Enter description"
                                {...getFieldProps('description')}
                            />
                            <InputField
                                label="Price"
                                type="number"
                                placeholder="Enter price"
                                {...getFieldProps('price')}
                            />
                            <InputField
                                label="Stock"
                                type="number"
                                placeholder="Enter number of stock"
                                {...getFieldProps('stock')}
                            />
                            <div className={`form-group ${errors.category && touched.category ? 'error-field' : ''}`}>
                                <label htmlFor="category"> Category </label>
                                <select
                                    id="category"
                                    value={selectedOption}
                                    name="category"
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                        setFieldValue('category', e.target.value)}
                                    }
                                    className="form-select"
                                >
                                    <option> Select category </option>
                                    {categoryList?.map((category, i) => (
                                        <option key={i} value={category?.name}> {category?.name} </option>
                                    ))}
                                </select>
                                <ErrorMessage name="category" component={'div'} className="text-danger" />
                            </div>
                            <Button type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}
export default CreateProduct;