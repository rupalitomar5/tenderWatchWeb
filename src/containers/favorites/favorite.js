import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import TenderCard from '../../components/tenderCard/tenderCard';

import { getFavoriteTenders } from '../../actionMethods/tenderActionMethods';

class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            favorites: props.favorites
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            favorites: nextProps.favorites
        });
    }
    componentDidMount(){
        this.props.getFavoriteTenders();
    }
    render(){
        const { favorites } = this.state;
        return(
            <div className='col-lg-12 ml-auto top-space hide'>
                <div className="container">
                    <h1 className='colorText'>Favorites:</h1>
                </div>
                <div className="row">
                    { favorites && (typeof favorites === 'string' ? <h3>{favorites}</h3> : favorites.map((x) =>
                        <TenderCard
                            _id={x._id}
                            tenderPhoto={x.tenderPhoto}
                            tenderName={x.tenderName}
                            tenderExpiryDate={new Date(x.expiryDate).toString().split(' ').splice(1,3).join('-')}
                            deleteMethod={this.askModalToggle}
                            title='favorite'
                        />
                    ))}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        favorites: _.cloneDeep(state.tenders.favoriteTenders)
    }
};
const mapDispatchToProps = dispatch => bindActionCreators({ getFavoriteTenders }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);