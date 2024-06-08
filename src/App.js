import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

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

  const clearModalData = () => {
    setFormData(defaultFormData);
  };

  const closeModal = (e) => {
    if (e.target.id === "modalContainer") {
      toggleModal(false);
    }
  };

  useEffect(() => {
    if (modalOpened)
      document.getElementById("root").addEventListener("click", closeModal);
    else
      document.getElementById("root").removeEventListener("click", closeModal);
  }, [modalOpened]);

  return (
    <>
      <div>
        <h1 className="text-center mt-5">User Details Modal</h1>
        <div className="d-flex justify-content-center mt-4">
          <Button onClick={() => toggleModal(true)}>Open Form</Button>
        </div>
      </div>

      {modalOpened ? (
        <>
          <div className="fade modal-backdrop show"></div>

          <div
            id="modalContainer"
            role="dialog"
            aria-modal="true"
            className="fade modal show"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <Form onSubmit={handleSubmit}>
                    <h4 className="text-center">Fill Details</h4>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
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
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
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
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
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
                          setFormData((prev) => ({
                            ...prev,
                            dob: e.target.value,
                          }))
                        }
                      />
                    </Form.Group>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button className="submit-button" type="submit">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;
