import React from 'react';

const logo = '< / >'

const Header = (props) => (
    <div className="jumbotron">
        <h1>{props.title}</h1>
        <h1 id="logo">{logo}</h1>
    </div>
    
)

Header.defaultProps = {
    title: 'Youtube App'
}

export default Header;