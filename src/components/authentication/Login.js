import {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./auth.css"
import http from "../../plugins/http";
import {Button} from "react-bootstrap";
import mainContext from "../../context/mainContext";

const Login = () => {

    const {setUser} = useContext(mainContext)
    const [status, setStatus] = useState(null)
    const [stayLoggedIn, setStayLoggedIn] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const nav = useNavigate()
    const [emailClass, setEmailClass] = useState("form-control")
    const [pswClass, setPswClass] = useState("form-control")

    async function validateUserForm() {
        emailValidation()
        passwordValidation()
        await sendRequest()
    }

    async function sendRequest() {
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            stayLoggedIn
        }
        const res = await http.post("/login", user)
        if (res.success) {
            setUser(res.user)
            setStatus(null)
            nav("/")
            if (stayLoggedIn) return localStorage.setItem("stayLoggedIn", "true")
        } else {
            setStatus(res.message)
            if (res.message === "Bad credentials") {
                setEmailClass("form-control is-invalid")
                setPswClass("form-control is-invalid")
            }
        }
    }

    function emailValidation() {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)) {
            emailRef.current.value = ''
            setStatus('The value is not a valid email address')
            return setEmailClass("form-control is-invalid")
        }
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)) {
            setStatus(null)
            setEmailClass("form-control is-valid")
        }
    }

    function passwordValidation() {
        if (passwordRef.current.value.length < 4 || passwordRef.current.value.length > 25) {
            passwordRef.current.value = ''
            setStatus("* Password must be 4 to 20 characters")
            return setPswClass("form-control is-invalid")
        }
        if (passwordRef.current.value.length >= 4) {
            setStatus(null)
            setPswClass("form-control is-valid")
        }
    }

    return (
        <div className="d-flex flex-column align-items-center p-3 position-relative ">
            <div className="mb-3 inputStyle">
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input ref={emailRef} type="email" className={emailClass} onBlur={emailValidation}
                           placeholder="Enter your email" aria-label="Email"
                           aria-describedby="basic-addon1"
                           style={{
                               backgroundColor: '#f5f8fd', fontSize: '16px', fontWeight: 200
                           }}/>
                </div>
            </div>


            <div className="mb-3 inputStyle">
                <div className="input-group">
                    <input ref={passwordRef}
                           type="password"
                           className={pswClass}
                           onBlur={passwordValidation}
                           placeholder="Password"
                           aria-label="Username"
                           aria-describedby="basic-addon1"
                           style={{
                               backgroundColor: '#f5f8fd', fontSize: '16px', fontWeight: 200
                           }}/>
                </div>
                <p className="statusMessage">{status}</p>
            </div>


            <div className="mb-3 inputStyle ">
                <div className="form-check">
                    <input onClick={() => setStayLoggedIn(!stayLoggedIn)}
                           className="form-check-input auth-form-check"
                           type="checkbox"
                           value=""
                           id="flexCheckDefault"
                    />
                    <label className="form-check-label"
                           htmlFor="flexCheckDefault"
                           style={{fontWeight: 300, color: '#2c2b2b', fontSize: '14px'}}>Stay logged in? </label>
                </div>
            </div>



            <div>
                <Button className="inputStyle auth-btn"
                        onClick={validateUserForm}>
                    Login
                </Button>
            </div>
        </div>
    );
};

export default Login;