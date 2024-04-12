import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/Auth";
import { useState, useEffect } from "react";

function Login() {
  const { setUser, login } = useAuth();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;
    login(email, password)
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "error") {
          setMsg(
            <span className="text-danger fw-lighter">{data.msg}</span>
          );
        } else {
          setUser(data);
          navigate("/voter");
        }
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      setMsg("");
    }, 5000);
  };

  useEffect(() => {
    fetch("/auth/user", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?._id) {
          setUser(data);
          navigate("/voter");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card shadow rounded ">
            <div className="card-body p-5 text-center">
              <form onSubmit={handleSubmit}>
                <h2 className="card-title mb-4">Login</h2>
                {msg ? (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <small className="fw-lighter">{msg}</small>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                ) : null}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control form-control-sm rounded"
                    id="email"
                    placeholder="Gavin@example.com"
                    name="email"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control form-control-sm rounded"
                    id="password"
                    placeholder="Password"
                    name="password"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-lg btn-primary btn-sm mb-3" type="submit">
                    Login
                  </button>
                </div>
              </form>
              <small>
                Don't have an account yet?{" "}
                <Link to="/signup" className="fw-bold">
                  Sign Up
                </Link>
              </small>
              <br />
              <small>
                Admin Login{" "}
                <Link to="/adminlogin" className="fw-bold">
                  Admin Login
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;