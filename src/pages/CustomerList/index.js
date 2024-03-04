import React, { useEffect, useState } from 'react';
import { getAllCustomer } from '../../crud/Customer';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { customerLoading, customerFetched } from '../../redux/slice/CustomerSlice';
import CustomerTable, { CustomTable } from '../../components/CustomTable';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { FileEarmark, PencilSquare, ThreeDotsVertical, Trash } from 'react-bootstrap-icons';
import './customerList.css'
import { LoadingSpinner } from '../../components/LoadingSpinner';
import './customerList.css';
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => <ThreeDotsVertical size={25} onClick={e => onClick(e)} />);

const CustomerList = () => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const { customers, loading } = useSelector((state) => ({
    customers: state.customers.customers,
    loading: state.customers.loading,
  }));
  const paramId = useParams();
  console.log('params', paramId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCustomerId(null);
  };

  const handleShowDeleteModal = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    console.log('Deleting customer with ID:', selectedCustomerId);
    handleCloseDeleteModal();
  };

  console.log("customers", customers)
  useEffect(() => {
    dispatch(customerLoading(true));
    getAllCustomer().then(res => {
      console.warn("data response", res.data.data)
      dispatch(customerFetched(res.data.data))

    }).catch(err => {
      const errorMessage = err.response.status === 500 ? "Something went wrong" : "Customer Profile Lists Failed";
      toast.error(errorMessage);
      console.error(err);
    });
  }, []);

  const CustomerColumn = [
    {
      field: "profileId",
      headerName: "Profile ID",
      value: (params) => (params['profileId'] ? params['profileId'] : "N/A"),
    },
    {
      field: "firstName",
      headerName: "First Name",
      value: (params) => (params['firstName'] ? params['firstName'] : "N/A"),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      value: (params) => (params['lastName'] ? params['lastName'] : "N/A"),
    },
    {
      field: "mobile",
      headerName: "Mobile",
      value: (params) => (params['mobile'] ? params['mobile'] : "N/A"),
    },
    {
      field: "secondaryMobile",
      headerName: "Secondary Mobile",
      value: (params) => (params['secondaryMobile'] ? params['secondaryMobile'] : "N/A"),
    },
    {
      field: "email",
      headerName: "Email",
      value: (params) => (params['email'] ? params['email'] : "N/A"),
    },
    {
      field: "userAddress",
      headerName: "User Address",
      value: (params) => (params['userAddress'] ? params['userAddress'] : "N/A"),
    },
    {
      field: "actions", headerName: "Actions", render: (params) => {
        return (
          <div className='d-flex gap-2'>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>
                Customer
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1"
                  onClick={() => navigate(`/customer/${params.profileId}/view`)}
                >
                  <FileEarmark style={{ marginRight: 10 }} />View
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => navigate(`/customer/${params.profileId}/edit`)}>
                  <PencilSquare style={{ marginRight: 10 }} />Edit
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={() => handleShowDeleteModal(params.profileId)}>
                  <Trash style={{ marginRight: 10 }} />Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )
      }
    }
  ];
  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <div className='list-container'>
      <div className='customer-title'>
        <h1>Customer List</h1>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back
        </Button>
      </div>
      <CustomTable column={CustomerColumn} data={customers} />
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default CustomerList;
