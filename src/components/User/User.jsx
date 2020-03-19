import React from "react";
import { connect } from "react-redux";
import range from "lodash/range";

import { getItems, setPage, setPages } from "../../actions/items";
import OutputFriends from "../OutputFriends/OutputFriends";
import Pagination from "../Pagination/Pagination";
import styles from "./User.css";

const FIVE_PER_PAGE = 5;
const TEN_PER_PAGE = 10;
const TWENTY_PER_PAGE = 20;
const FIFTY_PER_PAGE = 50;

class User extends React.Component {
  state = {
    friends: [],
    perPage: FIVE_PER_PAGE
  };

  getIdFriendsUser = (items) => {
    return items.map((item) => {
      if (item.id === parseInt(this.props.match.params.id)) {
        return item.friends;
      }
    })
  }

  filterUndefinedValue = (items) => {
    return items.filter(item => item !== undefined).flat();
  }

  getFilteredFriendsUser = (items, idItems) => {
    return items.filter(friend => {
      return idItems.indexOf(friend.id) !== -1;
    });
  }

  compose = (items) => this.getFilteredFriendsUser(items, this.filterUndefinedValue(this.getIdFriendsUser(items)));

  componentDidUpdate(prevProps) {
    const { pages} = this.props;
    const { perPage, friends } = this.state;

    if (this.props.match.params.id === prevProps.match.params.id
      && pages !== prevProps.pages) { return; }


    this.setState({
      friends: this.compose(this.props.itemsFilter)
    });

    switch (perPage) {
      case FIVE_PER_PAGE:
        this.props.setPages(
          range(1, Math.ceil(friends.length / FIVE_PER_PAGE) + 1)
        );
        break;
      case TEN_PER_PAGE:
        this.props.setPages(
          range(1, Math.ceil(friends.length / TEN_PER_PAGE) + 1)
        );
        break;
      case TWENTY_PER_PAGE:
        this.props.setPages(
          range(1, Math.ceil(friends.length / TWENTY_PER_PAGE) + 1)
        );
        break;
      case FIFTY_PER_PAGE:
        this.props.setPages(
          range(1, Math.ceil(friends.length / FIFTY_PER_PAGE) + 1)
        );
        break;
    }
    localStorage.setItem("perPage", JSON.stringify(FIVE_PER_PAGE));
  }


  componentDidMount() {
    this.setState({
      friends: this.compose(this.props.itemsFilter)
    }, () => {
      this.props.setPages(
        range(1, (this.state.friends.length / FIVE_PER_PAGE) + 1)
      )
    })
  }

  onChangePerPage = event => {
    localStorage.setItem("perPage", JSON.stringify(Number(event.target.value)));
    this.setState({ perPage: Number(localStorage.getItem("perPage")) });
  };

  clickOnTheRightPage = page => {
    this.props.setPage(page);
  };

  render() {
    const output = this.state.friends.slice(
      this.props.page * this.state.perPage - this.state.perPage,
      this.props.page * this.state.perPage
    );

    return (
      <div className={styles.containers}>
        {this.props.itemsFilter.map(item => {
          if (item.id === parseInt(this.props.match.params.id)) {
            return (
              <>
                <div key={item.id} className={styles.outputBlockItem}>
                  <div className={styles.itemInitial}>{item.name}</div>
                  <div className={styles.age}>Age: {item.age}</div>
                  <div className={styles.gender}>Gender: {item.gender}</div>

                  <div className={styles.company}>Company: {item.company}</div>
                  <div className={styles.email}>Email: {item.email}</div>
                </div>
              </>
            );
          }
        })}
        <div>
          <span className={styles.labels}>Friends</span>
          <span>
            Count show
            <select
              name="perPage"
              className={styles.changePerPage}
              onClick={this.onChangePerPage}
            >
              <option value={FIVE_PER_PAGE}>{FIVE_PER_PAGE}</option>
              <option value={TEN_PER_PAGE}>{TEN_PER_PAGE}</option>
              <option value={TWENTY_PER_PAGE}>{TWENTY_PER_PAGE}</option>
              <option value={FIFTY_PER_PAGE}>{FIFTY_PER_PAGE}</option>
            </select>
          </span>
        </div>
        <OutputFriends items={output} />
        <Pagination
          pages={this.props.pages}
          page={this.props.page}
          clickOnTheRightPage={this.clickOnTheRightPage}
          perPage={this.state.perPage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itemsFilter: state.items.itemsFilter,
  page: state.items.page,
  pages: state.items.pages
});

const mapDispatchToProps = {
  getItems,
  setPage,
  setPages
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
