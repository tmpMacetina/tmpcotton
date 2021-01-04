/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cartActions";
import "./BestSelling.scss";
import Modal from "../../UI elements/Modal/Modal";
import Notification from "../../UI elements/Notification/Notification";
import Card from "../../components/Card/Card";
// best selling items shown on homepage
class BestSelling extends Component {
  state = {
    modal: {
      showModal: false,
      modalImage: null,
      modalName: null,
      modalPrice: null,
      modalGender: null,
      modalType: null,
      modalItem: null,
      modalShowMessage: false
    },
    notification: {
      showNotification: false,
      notificationMsg: ""
    }
  };

  componentDidMount() {
    if (this.props.items.length === 0) this.props.initItems();
  }

  render() {
    const openModal = props => {
      this.setState({
        modal: {
          showModal: true,
          modalImage: props.image,
          modalName: props.name,
          modalPrice: props.price,
          modalGender: props.gender,
          modalType: props.type,
          modalItem: props.id,
          modalShowMessage: false
        }
      });
    };

    const closeModal = () => {
      this.setState({ modal: { showModal: false } });
    };
    const showModalMsg = () => {
      this.setState(prevState => ({
        ...prevState,
        modal: {
          ...prevState.modal,
          modalShowMessage: true
        }
      }));
    };
    const closeModalMsg = () => {
      this.setState(prevState => ({
        ...prevState,
        modal: {
          ...prevState.modal,
          modalShowMessage: false
        }
      }));
    };
    const handleModalMsg = () => {
      showModalMsg();
      setTimeout(closeModalMsg, 1000);
    };
    const openNoti = msg => {
      this.setState({
        notification: {
          showNotification: true,
          notificationMsg: msg
        }
      });
    };
    const closeNoti = () => {
      this.setState({ notification: { showNotification: false } });
    };
    const notify = msg => {
      if (this.state.notification.showNotification === false) {
        openNoti(msg);
        setTimeout(() => closeNoti(), 1000);
      } else
        setTimeout(() => {
          openNoti(msg);
          setTimeout(() => closeNoti(), 1000);
        }, 1000);
    };
    const handleAddToCart = id => {
      this.props.onAddToCartButton(id);
    };

    let allItems = [];
    if (this.props.items.items) allItems = this.props.items.items;

    // filters best 4
    const best = allItems.filter(item => item.bestSelling === true);
    const bestFour = best.slice(0, 4);

    const bestItemsToShow = bestFour.map(item => {
      return (
        <Card
          key={item.id}
          image={item.image}
          price={item.price}
          name={item.name}
          addToCart={() => {
            handleAddToCart(item.id);
            notify(`${item.name} has been added to the cart`);
          }}
          onclick={() => openModal(item)}
        />
      );
    });

    let toShow = null;
    if (this.props.loading) {
      toShow = <div className="loader">Loading...</div>;
    } else {
      toShow = bestItemsToShow;
    }
    if (this.props.error) {
      toShow = <div className="fetch-error">Unknown network error</div>;
    }
    return (
      <div className="bestSelling appear animated-small-delay">
        {this.state.modal.showModal ? (
          <Modal
            toggle={() => closeModal()}
            addToCart={() => {
              handleAddToCart(this.state.modal.modalItem);
              handleModalMsg();
            }}
            image={this.state.modal.modalImage}
            type={this.state.modal.modalType}
            name={this.state.modal.modalName}
            gender={this.state.modal.modalGender}
            price={this.state.modal.modalPrice}
            showMessage={this.state.modal.modalShowMessage}
          />
        ) : null}
        {this.state.notification.showNotification ? (
          <Notification msg={this.state.notification.notificationMsg} />
        ) : null}

        <div className="bestSellingText"> BEST SELLING</div>
        {toShow}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.cart.items,
    loading: state.cart.loading,
    error: state.cart.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddToCartButton: id => dispatch(actions.addToCart(id)),
    initItems: () => dispatch(actions.initItems())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BestSelling);

// order successful page,add to redux cart maybe,spinner for log too
