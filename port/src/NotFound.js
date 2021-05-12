import Pof404 from './layouts/images/pagenotfound.svg';

import { Link } from 'react-router-dom';

const NotFound = () => {
    return ( 
        <div>
            <div className="container-fluid text-center">
                <img src={Pof404} alt=""/>
                <h2>Sorry </h2>
                <p>That page cannot be found </p>
                <Link to="/">Back to the homepage</Link>
            </div>
        </div>
    );
}
 
export default NotFound;