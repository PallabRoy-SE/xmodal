import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const defaultFormData = {
  name: "",
  email: "",
  phone: "",
  dob: "",
};
function App() {
  const [modalOpened, toggleModal] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && !isValidEmail(formData.email)) {
      alert("Invalid email");
      return;
    }
    if (formData.phone?.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    if (formData.dob && isFutureDate(formData.dob)) {
      alert("Invalid date of birth. Date of birth can not be in the future.");
      return;
    }
    clearModalData();
  };

  const isFutureDate = (date) => {
    return new Date() - new Date(date) < 0;
  };
  const isValidEmail = (email) => {
    const regExp = /\S+@\S+\.\S+/;
    return regExp.test(email);
  };

  const onCloseModal = () => {
    toggleModal(false);
    clearModalData();
  };
  const clearModalData = () => {
    setFormData(defaultFormData);
  };

  return (
    <>
      <div>
        <h1 className="text-center mt-5">User Details Modal</h1>
        <div className="d-flex justify-content-center mt-4">
          <Button onClick={() => toggleModal(true)}>Open Form</Button>
        </div>
      </div>
      <Modal show={modalOpened} onHide={onCloseModal}>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <h4 className="text-center">Fill Details</h4>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dob">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type="date"
                required
                value={formData.dob}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            </Form.Group>
            <div className="d-flex align-items-center justify-content-center">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
