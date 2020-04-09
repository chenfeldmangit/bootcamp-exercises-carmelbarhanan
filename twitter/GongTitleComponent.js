import React from 'react';
import PropTypes from 'prop-types'

class GongTitleComponent extends React.Component{

    constructor(props){
        super(props)
    }

    render() {
        return (<h1 style={{color:'blue', fontSize:'70px'}}>{this.props.title}</h1>);
    }

}

GongTitleComponent.propTypes = {
    title: PropTypes.string.isRequired
};

GongTitleComponent.defaultProps = {
    title: "No Title"
};

export default GongTitleComponent;