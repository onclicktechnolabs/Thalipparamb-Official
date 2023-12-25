import { Col, Form, Row } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AutoFormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  options,
  errors,
}) {

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Row className="mb-3">
      <label htmlFor={name} className="col-sm-4 col-form-label form-label">
        {label}
      </label>
      <Col md={8} xs={12}>
        {type === "textarea" ? (
          <textarea
            className="form-control"
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={handleChange}
          />
        ) : type === "select" ? (
          <Form.Control
            as="select"
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={handleChange}
          >
            <option value="">{`Select ${name}`}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        ) : type === "date" ? (
          <DatePicker
            selected={value ? new Date(value) : new Date()}
            onChange={(date) => onChange(date)}
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={30}
            dateFormat="dd-MM-yyyy h:mm aa"
            className="form-control w-100"
          />

        ) : (
          <input
            type={type}
            className="form-control"
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={handleChange}
          />
        )}

        {errors && errors[name] && (
          <Col md={8} xs={12}>
            <span className="col-sm-4 col-form-label form-label text-danger">
              {errors[name]?.message}
            </span>
          </Col>
        )}
      </Col>
    </Row>
  );
}

export default AutoFormField;
