import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup, Card } from 'react-bootstrap';
import { Person, Envelope, HouseDoor, GeoAlt, Telephone } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import './customerForm.css';
import CustomInput from '../../components/CustomInput';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { customerFetched, customerLoading, updatedCustomer } from '../../redux/slice/CustomerSlice';
import { createCustomer, getAddonById, updateCustomer } from '../../crud/Customer';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    userAddress: '',
    secondaryMobile: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    userAddress: '',
    secondaryMobile: '',
  });
  const { customer, loading } = useSelector((state) => ({
    customer: state.customers.customers,
    loading: state.customers.loading,
  }));
  console.log("customer data", customer)
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatemobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  useEffect(() => {
    if (params.customerId) {
      const formData = new FormData();
      formData.append('profileId', params.customerId);
      dispatch(customerLoading(true))
      getAddonById(formData).then(res => {
        console.warn("data response", res.data.data)
        dispatch(customerFetched(res.data.data))

      }).catch(err => {
        const errorMessage = err.response.status === 500 ? "Something went wrong" : "Customer Profile View Failed";
        toast.error(errorMessage);
        console.error(err);
      });
    }
  }, [params.customerId]);
  useEffect(() => {
    if (params.customerId) {
      setFormData({
        profileId: params.customerId,
        firstName: customer.firstName,
        lastName: customer.lastName,
        mobile: customer.mobile,
        secondaryMobile: customer.secondaryMobile,
        email: customer.email,
        userAddress: customer.userAddress,
      });
    }
  }, [customer, params.customerId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.mobile || !validatemobile(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number';
    }
    if (!formData.secondaryMobile || !validatemobile(formData.secondaryMobile)) {
      newErrors.secondaryMobile = 'Invalid secondary mobile number';
    }

    if (!formData.userAddress) {
      newErrors.userAddress = 'userAddress is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        userAddress: '',
        secondaryMobile: '',
      });
      console.log("formData", formData)
      if (params.customerId) {
        dispatch(customerLoading(true));
        console.log('formData', formData);
        updateCustomer(formData).then(res => {
          dispatch(customerLoading(true));
          toast.success("Customer Profile Updated Successfully");
          console.log("udpate date", res.data)
            alert(res.data.message)
            navigate('/customer/list');
        }).catch(err => {
          toast.error("Customer Profile Update Failed");
          console.log(err);
        });
      } else {
        console.log("form data", formData)
        createCustomer(formData).then(res => {
          toast.success("Customer Profile Created Successfully");
          console.warn("data response", res.data)
          dispatch(customerFetched(res.data))
            alert(res.data.message)
            navigate('/customer/list');

        }).catch(err => {
          const errorMessage = err.response.status === 500 ? "Something went wrong" : "Customer Profile Create Failed";
          toast.error(errorMessage);
          console.error(err);
        });
      }
    }
  };

  return (
    <Card className="customer-form-card">
      <div className='profile-icon-container'>
        <div className="profile-icon">
          <Person size={64} color="white" />
        </div>
        <h2>Customer Profile</h2>
      </div>
      <Card.Body>
        <Form onSubmit={handleSubmit} className="text-center">
          <CustomInput
            icon={<Person />}
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            onChange={handleChange}
            error={errors.firstName}
          />
          <CustomInput
            icon={<Person />}
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            error={errors.lastName}
          />

          <CustomInput
            icon={<Envelope />}
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            error={errors.email}
          />

          <CustomInput
            icon={<Telephone />}
            type="tel"
            name="mobile"
            value={formData.mobile}
            placeholder="Mobile Number"
            onChange={(e) => handleChange({ target: { name: 'mobile', value: e.target.value } })}
            error={errors.mobile}
          />

          <CustomInput
            icon={<Telephone />}
            type="tel"
            name="secondaryMobile"
            value={formData.secondaryMobile}
            placeholder="Secondary Mobile Number"
            onChange={(e) => handleChange({ target: { name: 'secondaryMobile', value: e.target.value } })}
            error={errors.secondaryMobile}
          />

          <CustomInput
            icon={<HouseDoor />}
            type="text"
            name="userAddress"
            value={formData.userAddress}
            placeholder="Address"
            onChange={handleChange}
            error={errors.userAddress}
          />

          <Button variant="primary" type="submit">
            {params.customerId ? "Update" : "Create"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CustomerForm;
