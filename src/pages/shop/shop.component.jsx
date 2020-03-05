import React from 'react';
import CollectionPage from '../collection/collection.component';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCollections}  from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.components';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpeinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    state= {
         loading: true
    };

     unsubscribeFromSnapShot = null;

     componentDidMount(){
          const { updateCollections } = this.props;
          const collectionRef = firestore.collection('collections');

          //other way of retrieving data collections from database
          // fetch('https://firestore.googleapis.com/v1/projects/roots-db/databases/(default)/documents/collections')
          // .then(response => response.json())
          // .then(collections => console.log(collections));
          
          collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
               updateCollections(collectionsMap);
               this.setState({ loading: false });
               
          });


     }


     render(){
          const { match } = this.props;
          const { loading } = this.state;
          return (
               <div className='shop-page'>
                    <Route exact path={`${match.path}` } 
                    render={(props) => <CollectionsOverviewWithSpinner 
                         isLoading={loading}{...props}/>} />
                    <Route path={`${match.path}/:collectionId`} 
                    render={(props) => <CollectionPageWithSpeinner 
                         isLoading={loading}{...props}/>}/>
               </div>
           );
     } 

     }
    
const mapDispatchToProps = dispatch => ({
updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
     
});

export default connect(null, mapDispatchToProps)(ShopPage);