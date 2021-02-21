/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/cartActions";
import Modal from "../../UI elements/Modal/Modal";
import Notification from "../../UI elements/Notification/Notification";
import quoteImage from "../../assets/forHerNew.png";
import Card from "../../components/Card/Card";
import "./ForHer.scss";
import "../../styles/Spinner.scss";
import "../../styles/Animations.scss";
// similar to allproducts
// TODO move modal and notification logic to redux
class ForHer extends Component {
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
    const allFemale = allItems.filter(item => item.gender === "F");

    const filteredItemsPrice = allFemale.filter(item => {
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
      <div className="forher ">
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

        <div className="quote">
          <img src={quoteImage} alt="forerimg" className="quote-img" />
          <div className="quote-text">
            <p>
              &quot;Don&apos;t be into trends. Don&apos;t make fashion own you,
              but you decide what you are, what you want to express by the way
              you dress and the way to live.&quot;
            </p>
            <p className="quote-name">Anna West, COTTON lead designer</p>
          </div>
        </div>

        <div className="selects">
          <select
            onChange={e => setColorFilter(e.target.value)}
            className="select"
          >
            <option value="" disabled defaultValue hidden>
              Select Color
            </option>
            <option value="all">All Colors</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="yellow">Yellow</option>
            <option value="pink">Pink</option>
            <option value="white">White</option>
            <option value="grey">Grey</option>
            <option value="brown">Brown</option>
            <option value="green">Green</option>
          </select>
          <select
            onChange={e => setTypeFilter(e.target.value)}
            className="select"
          >
            <option value="" disabled defaultValue hidden>
              Select type
            </option>
            <option value="all">All types</option>
            <option value="pants">Pants</option>
            <option value="jacket">Jacket</option>
            <option value="tshirt">T-Shirt</option>
            <option value="sweater">Sweater</option>
            <option value="dress">Dress</option>
            <option value="skirt">Skirt</option>
          </select>
          <select
            onChange={e => setPriceFilter(e.target.value)}
            className="select"
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

        <div className="container animated appear">
          {this.props.error ? (
            <div className="fetch-error">Unknown network error</div>
          ) : null}
          {this.props.loading ? <div className="loader" /> : toShowProducts}
          {toShowProducts.length === 0 && !this.props.loading ? (
            <div className="no_matches">No product matches your filters</div>
          ) : null}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForHer);
