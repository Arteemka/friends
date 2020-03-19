import React from "react";

import styles from "./Pagination.css";

class Pagination extends React.Component {
  state = {
    filterPage: this.props.pages.filter(function (number) {
      return number >= 1 && number <= 5;
    })
  };

  componentDidUpdate(prevProps) {
    const { page, pages } = this.props;

    if (pages === prevProps.pages && page === prevProps.page) {
      return;
    }

    if (page < 5) {
      this.setState(() => ({
        filterPage: pages.filter(function (number) {
          return number >= 1 && number < 6;
        })
      }));
    } else if (page > pages.length - 3) {
      this.setState({
        filterPage: pages.filter(number => {
          return number >= pages.length - 4 && number <= pages.length;
        })
      });
    } else {
      this.setState({
        filterPage: pages.filter(number => {
          return number >= page - 2 && number <= page + 2;
        })
      });
    }
  }

  returnNumberPage = event => {
    return this.props.clickOnTheRightPage(Number(event.target.id));
  };

  render() {
    return (
      <div className={styles.conainerPagination}>
        <ul className={styles.conainerPaginationList}>
          <li id={1} onClick={this.returnNumberPage}>
            First
          </li>
          {this.state.filterPage.map((page, index) => (
            <li
              key={index}
              id={page}
              data-id={page}
              className={this.props.page === page ? styles.active : ""}
              onClick={this.returnNumberPage}
            >
              {page}
            </li>
          ))}
          <li id={this.props.pages.length} onClick={this.returnNumberPage}>
            Last
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
