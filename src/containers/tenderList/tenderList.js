import React from 'react';
import TenderCard from '../../components/tenderCard/tenderCard';

class TenderList extends React.Component{
    constructor(){
        super();
        this.state={}
    }
    render(){
        return(
            <React.Fragment>
                <TenderCard />
            </React.Fragment>
        )
    }
}

export default TenderList;