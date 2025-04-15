import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const { signup, isAuthenticated, errors: signupErrors } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullname) errors.fullname = "Fullname is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      signup(formData);
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        {signupErrors.map((error, index) => (
          <div className="error-message" key={index}>
            {error}
          </div>
        ))}
        <h1>Register</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Fullname"
            className="form-input"
          />
          {formErrors.fullname && (
            <p className="error-text">{formErrors.fullname}</p>
          )}

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="form-input"
          />
          {formErrors.username && (
            <p className="error-text">{formErrors.username}</p>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-input"
          />
          {formErrors.email && <p className="error-text">{formErrors.email}</p>}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-input"
          />
          {formErrors.password && (
            <p className="error-text">{formErrors.password}</p>
          )}

          <button type="submit" className="form-button">
            Register
          </button>
        </form>
      </div>
      <p className="regirect-text">
        Already have an account?{" "}
        <Link to="/login" className="redirect-link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
