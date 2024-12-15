import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader.jsx";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("https://joywithlearning.com/api/users/register", {
        username,
        password,
        name,
        mobilenumber,
        email,
      });
      console.log(res);
      setLoading(false);
      toast.success("Registered successfully!", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/admindashboard");
      }, 2000);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        toast.error("Username already exists!", { autoClose: 2000 });
        setLoading(false);
        return;
      }
      console.error("Data not sent");
      setLoading(false);
      toast.error("Error has occurred. Please try again!", { autoClose: 2000 });
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow-lg rounded-3">
            <div className="card-header text-center">
              <h2 className="mt-2">Register Parent</h2>
            </div>
            <div className="card-body">
              <form className="p-2 mb-2" onSubmit={handleRegister}>
                <div className="form-floating mb-3">
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    required
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    id="mobilenumber"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobilenumber}
                    onChange={(e) => setMobilenumber(e.target.value)}
                    className="form-control"
                    required
                  />
                  <label htmlFor="mobilenumber">Mobile Number</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary mt-3">
                    {loading ? <Loader /> : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
