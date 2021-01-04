/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cartActions";
import Modal from "../../UI elements/Modal/Modal";
import Notification from "../../UI elements/Notification/Notification";
import Card from "../../components/Card/Card";
import "./ForHim.scss";
import quoteImage from "../../assets/forHimImage.png";
// similar to allproducts
class ForHim extends Component {
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
    filters: {
      color: "all",
      type: "all",
      priceRange: "0,100"
    },
    notification: {
      showNotification: false,
      notificationMsg: ""
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.items.length === 0) this.props.initItems();
  }

  render() {
    let allItems = [];
    if (this.props.items.items) {
      allItems = this.props.items.items;
    }
    const allMale = allItems.filter(item => item.gender === "M");
    const filteredItemsPrice = allMale.filter(item => {
      const low = this.state.filters.priceRange.split(",")[0];
      const high = this.state.filters.priceRange.split(",")[1];
      return item.price > low && item.price < high;
    });
    const filteredItemsType = filteredItemsPrice.filter(item => {
      if (this.state.filters.type === "all") return true;
      if (this.state.filters.type === item.type) return true;
      return false;
    });
    const filteredItems = filteredItemsType.filter(item => {
      if (this.state.filters.color === "all") return true;
      if (this.state.filters.color === item.color) return true;
      return false;
    });
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
        setTimeout(() => closeNoti(), 800);
      } else
        setTimeout(() => {
          openNoti(msg);
          setTimeout(() => closeNoti(), 800);
        }, 800);
    };

    const setColorFilter = value => {
      this.setState(prevState => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          color: value
        }
      }));
    };
    const setPriceFilter = value => {
      this.setState(prevState => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          priceRange: value
        }
      }));
    };
    const setTypeFilter = value => {
      this.setState(prevState => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          type: value
        }
      }));
    };

    const handleAddToCart = id => {
      this.props.onAddToCartButton(id);
    };

    const toShowProducts = filteredItems.map(item => {
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
    return (
      <div className="forhim ">
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

        <div className="forhim-quote animated-him fade-in-left">
          <div className="forhim-quote-text ">
            <p>
              &quot;The public is more familiar with bad design than good
              design. It is, in effect, conditioned to prefer bad design,
              because that is what it lives with. The new becomes threatening,
              the old reassuring. &quot;
            </p>
            <p className="forhim-quote-text-name">
              Marco Doviano, COTTON men designer
            </p>
          </div>

          <img src={quoteImage} alt="forhimimg" className="forhim-quote-img " />
        </div>
        <div className="selects animated-small-delay-him appear">
          <select
            onChange={e => setColorFilter(e.target.value)}
            className="select-general "
          >
            <option value="" disabled defaultValue hidden>
              Select Color
            </option>
            <option value="all">All Colors</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="grey">Grey</option>
            <option value="brown">Brown</option>
            <option value="green">Green</option>
          </select>
          <select
            onChange={e => setTypeFilter(e.target.value)}
            className="select-general "
          >
            <option value="" disabled defaultValue hidden>
              Select type
            </option>
            <option value="all">All types</option>
            <option value="pants">Pants</option>
            <option value="jacket">Jacket</option>
            <option value="tshirt">T-Shirt</option>
            <option value="sweater">Sweater</option>
          </select>
          <select
            onChange={e => setPriceFilter(e.target.value)}
            className="select-general "
          >
            <option value="0,100" defaultValue hidden>
              Price range
            </option>
            <option value="0,100">No limit</option>
            <option value="0,15">0-15 &euro;</option>
            <option value="16,30">16-30 &euro;</option>
            <option value="31,45">31-45 &euro;</option>
            <option value="45,100">45+ &euro; </option>
          </select>
        </div>
        <div className="fetch-error">
          {this.props.error ? <h1>Unknow Netowork error</h1> : null}
        </div>
        <div className="forhim-container animated-big-delay-him appear">
          {toShowProducts}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.cart.items,
    error: state.cart.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddToCartButton: id => dispatch(actions.addToCart(id)),
    initItems: () => dispatch(actions.initItems())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForHim);
