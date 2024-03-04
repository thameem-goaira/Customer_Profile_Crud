import React, { useEffect } from 'react'
import './customerView.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAddonById } from '../../crud/Customer';
import { customerFetched, customerLoading } from '../../redux/slice/CustomerSlice';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Button, Card } from 'react-bootstrap';
function CustomerView() {
  const { customer, loading } = useSelector((state) => ({
    customer: state.customers.customers,
    loading: state.customers.loading,
  }));
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();
  console.log('paramId', param)
  console.log("customer", customer)
  console.log("loading", loading)

  useEffect(() => {
    const formData = new FormData();
    formData.append('profileId', param.customerId);
    dispatch(customerLoading(true))
    getAddonById(formData).then(res => {
      console.warn("data response", res.data.data)
      dispatch(customerFetched(res.data.data))

    }).catch(err => {
      const errorMessage = err.response.status === 500 ? "Something went wrong" : "Customer Profile View Failed";
      toast.error(errorMessage);
      console.error(err);
    });
  }, [param.customerId]);

  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <Card className="customer-profile-card">
      <Card.Body>
        <Card.Title className="card-title">Customer Profile View</Card.Title>
        <div className="card-content">
          <div className="key-value-pair">
            <span className="key">First Name:</span>
            <span className="value">{customer.firstName}</span>
          </div>
          <div className="key-value-pair">
            <span className="key">Last Name:</span>
            <span className="value">{customer.lastName}</span>
          </div>
          <div className="key-value-pair">
            <span className="key">Mobile:</span>
            <span className="value">{customer.mobile}</span>
          </div>
          <div className="key-value-pair">
            <span className="key">Secondary Mobile:</span>
            <span className="value">{customer.secondaryMobile}</span>
          </div>
          <div className="key-value-pair">
            <span className="key">Email:</span>
            <span className="value">{customer.email}</span>
          </div>
          <div className="key-value-pair">
            <span className="key">User Address:</span>
            <span className="value">{customer.userAddress}</span>
          </div>
        </div>
        
      </Card.Body>
      <Button variant="primary" onClick={() => navigate('/customer/list')}>
          Back
        </Button>
    </Card>
  )
}

export default CustomerView