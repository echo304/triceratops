import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import SingleListingItemEditable from './SingleListingItemEditable';
import AddNewListingForm from '../containers/NewListingContainer';
import { toggleViewManageListings, toggleViewAddNewListingForm, fetchUpdatedProducts } from '../actions/index';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/index.js';

// Refactor so that this container doesn't even render a single raw html elemnt like div.
// outsource all view space to presentational components.
class ManageListingsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // ajax requests
    this.props.fetchUpdatedProducts();
  }

  render() {
    const { viewManagedListing, viewAddNewListingForm } = this.props.ui.ManageListings;
    const isAttemptingToAdd = this.props.ui.isAttemptingToAdd;
    const { ListingsPendingRemoval } = this.props.ui.SingleListingItemEditable;
    const { dispatch, sharingItems } = this.props;

    const handleClick = (item) => {
      this.props.removeItem(item);
    };

    return (
      <div>
        <h3>ManageListings Component here!</h3>
        <button onClick={()=>{
          this.props.toggleViewAddNewListingForm();
        }}>
        Create New Listing
        </button>
        {viewAddNewListingForm ?
          <AddNewListingForm
            isAttemptingToAdd={isAttemptingToAdd}
          /> : null}
        <p></p>
        <button onClick={()=>{
          this.props.toggleViewManageListings();
        }}>
        {viewManagedListing ? 'Hide' : 'Show'} Items being listed
        </button>
        <List>
          {viewManagedListing ? sharingItems.map((item)=>{
            return (
              <div key={item._id} className="col-md-8">
                <ListItem
                  primaryText={item.title + ' : ' + item.description}
                  secondaryText={item.description}
                />
                <RaisedButton label="Remove" type="button" onClick={handleClick.bind(null, item)} />
                {/*isItemPendingRemoval={ListingsPendingRemoval.hasOwnProperty(item._id)}*/}
              </div>
            );
          }): null}
        </List>
      </div>
    );
  }
}

export default ManageListingsComponent;