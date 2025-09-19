import './index.css'
import { Link } from 'react-router-dom'

function NotFound (){

    return(
        <div className="not-found-div">
            <div>
            <img className="not-found-image" src="https://i.postimg.cc/6p6Pv0xD/erroring-1.png"/>
            <h1 className='not-found-heading'>Page Not Found</h1>
            <p className='not-found-para'>We are sorry, the page you requested could not be found.</p>
            <p className="not-found-para-2">Please go back to the homepage</p>
            <Link to="/">
            <button className='not-found-button'>Home Page</button>
            </Link>
    </div>
        </div>
    )
}

export default NotFound