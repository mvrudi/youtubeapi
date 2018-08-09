import React from 'react';
import Header from './Header';
import Busca from './Busca';
import 'bootstrap/dist/css/bootstrap.min.css';

class Youtube extends React.Component {

render() {
    return(
        <div id="container-index">
            <Header />
            <Busca />
        </div>
    )
    }
}

export default Youtube;