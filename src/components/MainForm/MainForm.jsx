import React from "react";
import { connect } from "react-redux";
import range from "lodash/range";

import Input from "../Input/Input";
import Loading from "../Loader/Loading";
import OutputFriends from "../OutputFriends/OutputFriends";
import Pagination from "../Pagination/Pagination";
import { getData, getItems, setPage, setPages } from "../../actions/items";
import styles from "./MainForm.css";

const FIVE_PER_PAGE = 5;
const TEN_PER_PAGE = 10;
const TWENTY_PER_PAGE = 20;
const FIFTY_PER_PAGE = 50;
class MainForm extends React.Component {
  state = {
    name: "",
    ageStart: "",
    ageEnd: "",
    gender: "all",
    work: "",
    perPage: FIVE_PER_PAGE
  };

  componentDidMount() {
    this.props.getData();
  }

  onFilter = (items, callback) => {
    const { gender, ageStart, ageEnd, name, work } = this.state;

    const compose = (fns, items) => fns.reduce((res, fn) => fn(res), items);
    let filterElement = compose([funcAgeStart, funcGender, funcName, funcWork, funcAgeEnd], items);

    function funcAgeStart(items) {
      return items.filter(item => {
        return item.age >= Number(ageStart);
      })
    }

    function funcAgeEnd(items) {
      return items.filter(item => {
        return item.age <= Number(ageEnd);
      })
    }

    function funcGender(items) {
      return items.filter(item => {
        if (gender && gender !== "all") {
          return item.gender === gender;
        }
        return item;
      })
    }

    function funcName(items) {
      return items.filter(item => {
        return item.name.toLowerCase().search(name.toLowerCase()) !== -1
      })
    }

    function funcWork(items) {
      return items.filter(item => {
        return item.company.toLowerCase().search(work.toLowerCase()) !== -1
      })
    }

    callback(filterElement);
  };

  onChange = ({ target: { name, value } }) => {
    this.setState(
      prev => ({ ...prev, [name]: value }),
      () => this.onFilter(this.props.itemsFilter, this.props.getItems)
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.pages !== prevProps.pages) return;

    switch (this.state.perPage) {
      case FIVE_PER_PAGE:
        this.props.setPages(
          range(1, Math.ceil(this.props.items.length / FIVE_PER_PAGE) + 1)
        );
        break;
      case TEN_PER_PAGE:
        this.props.setPages(
          range(1, Math.ceil(this.props.items.length / TEN_PER_PAGE) + 1)
        );
        break;
      case TWENTY_PER_PAGE:
        this.props.setPages(
          range(1, Math.ceil(this.props.items.length / TWENTY_PER_PAGE) + 1)
        );
        break;
      case FIFTY_PER_PAGE:
        this.props.setPages(
          range(1, Math.ceil(this.props.items.length / FIFTY_PER_PAGE) + 1)
        );
        break;
    }
    localStorage.setItem("perPage", JSON.stringify(FIVE_PER_PAGE));
  }

  clickOnTheRightPage = page => {
    this.props.setPage(page);
  };

  onChangePerPage = event => {
    localStorage.setItem("perPage", JSON.stringify(Number(event.target.value)));
    this.setState({ perPage: Number(localStorage.getItem("perPage")) });
  };

  render() {
    const output = this.props.items.slice(
      this.props.page * this.state.perPage - this.state.perPage,
      this.props.page * this.state.perPage
    );

    return (
      <div className={styles.container}>
        <div className={styles.containerInput}>
          <Input
            placeholder="Search"
            type="text"
            name="name"
            className={styles.inputFind}
            onChange={this.onChange}
          />
        </div>
        <div className={styles.filter}>
          <span>
            <select
              name="gender"
              className={styles.changeSex}
              onChange={this.onChange}
            >
              <option value="all">All</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </span>
          <span>
            age from
            <Input
              type="text"
              name="ageStart"
              className={styles.inputFilterFrom}
              onChange={this.onChange}
            />
            to
            <Input
              name="ageEnd"
              type="text"
              className={styles.inputFilterTo}
              onChange={this.onChange}
            />
          </span>
          <span className={styles.blockWorks}>
            works for
            <Input
              type="text"
              name="work"
              className={styles.inputFilterWorks}
              onChange={this.onChange}
            />
          </span>
        </div>
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
        {this.props.isLoading && <Loading />}
        {this.props.error && (
          <div className="error">
            <p>Ошибка сервера, данные не получены!</p>
          </div>
        )}

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
  items: state.items.items,
  itemsFilter: state.items.itemsFilter,
  error: state.items.error,
  isLoading: state.items.isLoading,
  page: state.items.page,
  pages: state.items.pages
});

const mapDispatchToProps = {
  getData,
  getItems,
  setPage,
  setPages
};

export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
