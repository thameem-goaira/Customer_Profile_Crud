import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import './CustomInput.css';

const CustomInput = ({ icon, type, name, value, placeholder, onChange, error }) => {
  return (
    <InputGroup className="input-container">
      <InputGroup.Text>
        {icon}
      </InputGroup.Text>
      <Form.Control
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <div className="error">{error}</div>}
    </InputGroup>
  );
};

export default CustomInput;
