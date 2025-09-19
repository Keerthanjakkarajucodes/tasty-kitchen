import { Link } from "react-router-dom";
import "./index.css";
import NavBar from "../NavBar";

function PaymentSuccess() {
  return (
     <div className="success-main-div">
        <NavBar/>
         <div className="success-container">
        <img src="https://i.postimg.cc/GthSz1mR/check-circle-1-1.png"/>
      <h2 className="success-heading">Payment Successful</h2>
      <p className="success-para-1"> Thank you for ordering</p>
      <p className="success-para-2">Your Payment is successfullycompleted</p>
      <Link to="/"><button>Go to Home Page</button></Link>
    </div>
    </div>
  );
}

export default PaymentSuccess;