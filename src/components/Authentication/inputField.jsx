import { ErrorMessage, useField } from "formik";

const InputField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className={`form-group mb-3 ${meta.error && meta.touched ? "error-field" : ""}`}>
            <label htmlFor={field.name}>{label}</label>
            <input className="form-control" id={field.name} {...field} {...props} />
            <ErrorMessage name={field.name} component="div" className="text-danger" />
        </div>
    );
}
export default InputField;