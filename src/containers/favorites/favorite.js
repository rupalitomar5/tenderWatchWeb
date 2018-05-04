import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TenderCard from '../../components/tenderCard/tenderCard';

import { getFavoriteTenders } from '../../actionMethods/tenderActionMethods';

class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentWillReceiveProps(nextProps) {
        debugger;
        this.setState({
            favorites: nextProps.favorites
        });
    }
    componentDidMount(){
        debugger;
        this.props.getFavoriteTenders();
    }
    render(){
        const { favorites } = this.state;
        console.log('favorites',favorites);
        debugger;
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
                            tenderExpiryDate={x.expiryDate}
                            deleteMethod={this.askModalToggle}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    debugger;
    return{
        favorites: state.tenders.favoriteTenders
    }
};
const mapDispatchToProps = dispatch => bindActionCreators({ getFavoriteTenders }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);