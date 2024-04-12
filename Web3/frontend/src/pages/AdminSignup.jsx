import { useRef, useState } from "react";
import { Link } from "react-router-dom";
function AdminSignup() {
    const [firstname, setFirstName] = useState("");
    const[middlename,setMiddleName] = useState("");
    const[lastname,setLastName]=useState("");
    const[dob,setDob]=useState("");
  const [email, setEmail] = useState("");
  const [gender,setGender] = useState("");
  const [msg, setMsg] = useState("");
  const passInput = useRef(null);
  const rePassInput = useRef(null);
  const [phone,setPhone]=useState("");
  

  
  const validatePassword = function (event) {
    const password = passInput.current.value;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (passwordRegex.test(password)) {
      passInput.current.classList.remove("is-invalid");
      rePassInput.current.classList.remove("is-invalid");
      passInput.current.classList.add("is-valid");
      rePassInput.current.classList.add("is-valid");
      return true;
    } else {
      passInput.current.classList.add("is-invalid");
      rePassInput.current.classList.add("is-invalid");
      passInput.current.classList.remove("is-valid");
      rePassInput.current.classList.remove("is-valid");
      alert(
        "Password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and have a length of at least 8 characters."
      );
      return false;
    }
  };

  const registerAccount = function () {
    if (firstname && email) {
      if (validatePassword()) {
        var data = {
          firstname: firstname,
          middlename:middlename,
          lastname:lastname,
          dob:dob,
          email: email,
          password: passInput.current.value,
          role: "admin",
          gender:gender,
          phone:phone
        };
        fetch("/auth/register/", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.type === "success") {
              setMsg(<span className="text-success">{data.msg}</span>);
            } else {
              setMsg(<span className="text-danger">{data.msg}</span>);
            }
          });
      } else {
        setMsg("Password does not match");
      }
    } else {
      setMsg("Empty Fields");
    }
    setTimeout(() => {
      setMsg("");
    }, 5000);
  };

  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "98vh" }}
      >
        <div
          className="col-4 shadow p-5 text-center"
          style={{ backgroundColor: `rgba(255, 255, 255, 0.5)` }}
        >
          <p className="fst-italic">{msg}</p>
          <p className="reg">Admin Signup</p>
          <input
            type="text"
            className="form-control form-control-sm mb-3"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="form-control form-control-sm mb-3"
            placeholder="Middle Name"
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <input
            type="text"
            className="form-control form-control-sm mb-3"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            className="form-control form-control-sm mb-3"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          /> <div className="mb-3">
          <span className="me-3">Gender:</span>
          <input
            type="radio"
            name="gender"
            className="me-2"
            value="male"
            onChange={(e)=>{setGender(e.target.value);}}
          />
          Male
          <input
            type="radio"
            name="gender"
            className="ms-3 me-2"
            value="female"
            onChange={(e)=>{setGender(e.target.value);}}
          />
          Female
          <input
            type="radio"
            name="gender"
            className="ms-3 me-2"
            value="other"
            onChange={(e)=>{setGender(e.target.value);}}
          />
          Other
        </div>
          
          
          <label>Date Of Birth:</label>
            <input
              type="date"
              className="form-control form-control-sm mb-3"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          
          <input
            type="text"
            className="form-control form-control-sm mb-3"
            placeholder="Phone Number"
            onChange={(e)=>setPhone(e.target.value)}
      
          />
                              <input
            type="password"
            className="form-control form-control-sm mb-3"
            placeholder="Enter Password"
            ref={passInput}
          />
          <input
            type="password"
            className="form-control form-control-sm mb-3"
            placeholder="Retype Password"
            ref={rePassInput}
            onChange={validatePassword}
          />
          <button
            className="btn btn-primary btn-sm mb-3"
            onClick={registerAccount}
          >
            Submit
          </button>
          <p>
            <Link to="/adminlogin">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;