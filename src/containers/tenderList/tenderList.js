import React from 'react';

import TenderCard from '../../components/tenderCard/tenderCard';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutMethod} from '../../actionMethods/authActionMethods';
import {getAllTendersMethod, deleteTenderMethod, setSearchKey} from '../../actionMethods/tenderActionMethods';
import SpinnerLoader from '../../components/spinnerLoader/spinnerLoader';
import AlertModal from '../../components/alertModal/alertmodal';
import {Input, InputGroup} from 'reactstrap';
import _ from 'lodash';
import AskModal from '../../components/askModal/askModal';

import './tenderList.css';

class TenderList extends React.Component {
    constructor() {
        super();
        this.state = {
            search: '',
            Tenders: [],
            isAskModalOpen: false,
            delete: {}
        }
    }

    componentDidMount() {
        this.props.getAllTendersMethod();
    }

    componentWillReceiveProps(props) {

        if(this.props.searchKey){
            this.setState({Tenders: _.filter(this.props.tenders.allTenders, (o) => o.tenderName.includes(this.props.searchKey))});
        }else {
            if (this.props.tenders.allTenders !== props.tenders.allTenders) {
                this.setState({Tenders: props.tenders.allTenders})
            }
       }

    }

    searchChange = (e) => {
        this.setState({search: e.target.value}, () => {
            this.setState({Tenders: _.filter(this.props.tenders.allTenders, (o) => o.tenderName.includes(this.state.search))});
        });
        this.props.setSearchKey(e.target.value);
    };
    askModalToggle = (e) => {
        e && this.setState({delete: {index: e.target.id, name: e.target.name}});
        this.setState({isAskModalOpen: !this.state.isAskModalOpen});
    };


    render() {
        return (
            <React.Fragment>
                {this.props.isLoading && <SpinnerLoader/>}
                {this.props.alertModal.isAlert && <AlertModal alertModal={this.props.alertModal}/>}
            <div className='col-lg-12 ml-auto top-space hide'>
                <AskModal isAskModalOpen={this.state.isAskModalOpen}
                          noMethod={this.askModalToggle}
                          yesMethod={() => {
                              this.askModalToggle();
                              this.props.deleteTenderMethod(this.state.delete.index)
                          }}
                          message={`delete ${this.state.delete.name}`}
                />
                <div className="container">
                    <h1 className='colorText'>Tenders:</h1>
                    <InputGroup>
                        <Input className='tender-searchbar' value={this.props.searchKey} onChange={this.searchChange} placeholder='search tenders'/>
                        <i className='fa fa-search search-icon'/>
                    </InputGroup>
                    <div className="row">
                        {this.state.Tenders && this.state.Tenders.map((x) =>
                            <TenderCard
                                _id={x._id}
                                tenderPhoto={x.tenderPhoto}
                                tenderName={x.tenderName}
                                tenderExpiryDate={new Date(x.expiryDate).toString().split(' ').splice(1,3).join('-')}
                                deleteMethod={this.askModalToggle}
                            />
                        )}
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tenders: state.tenders,
        alertModal: state.alertModal,
        searchKey:state.tenders.searchKey,
        isLoading:state.isLoading
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    logoutMethod,
    getAllTendersMethod,
    deleteTenderMethod,
    setSearchKey
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TenderList);