import React from "react";
import {
  AppBar,
  fade,
  Toolbar,
  Typography,
  InputBase,
  createStyles,
  withStyles,
  debounce,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";

import "./App.css";

const styles = (theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "40ch",
        "&:focus": {
          width: "50ch",
        },
      },
    },
    brandContainer: {
      height: "80vh",
      overflowY: "scroll",
      padding: theme.spacing(2),
      margin: "0 auto",
      textAlign: "center",
    },
    paginationContainer: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      height: "8vh",
      display: "flex",
      justifyContent: "center",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 251,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    card: {
      width: 400,
      height: 300,
      display: "inline-flex",
      margin: theme.spacing(2),
    },
  });

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      brandList: [],
      filteredBrands: [],
      pageBrands: [],
      brandImages: [],
      totalPage: 2,
      update: new Date(),
    };
    this.handleOnSearch = debounce(this.handleOnSearch, 1000);
  }

  componentDidMount() {
    Promise.all([
      fetch(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json",
        {
          method: "GET",
        }
      ),
      fetch(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json",
        {
          method: "GET",
        }
      ),
    ])
      .then((data) => {
        return Promise.all([data[0].json(), data[1].json()]);
      })
      .then((data) => {
        let dataList = [];
        for (let i = 0; i < data[0].length; i++) {
          let newData = { ...data[0][i] };
          newData.imageUrl = data[1][i % data[1].length].image;
          dataList.push(newData);
        }
        let totalPage = Math.ceil(dataList.length / 20);
        this.setState({
          brandList: [...dataList],
          filteredBrands: [...dataList],
          pageBrands: this.getListByPage(1, dataList),
          totalPage,
          brandImages: [...data[1]],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getListByPage = (num, list) => {
    return list.slice((num - 1) * 20, num * 20);
  };

  onPageSelect = (e, pageNum) => {
    this.setState({
      pageBrands: this.getListByPage(pageNum, this.state.filteredBrands),
      update: new Date(),
    });
  };

  handleOnSearch = (e) => {
    const searchText = e.target.value;
    if (searchText.trim().length > 0) {
      let filterList = this.state.brandList.filter((data) => {
        return data.name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
      });
      let totalPage = Math.ceil(filterList.length / 20);
      let pageBrands = [...this.getListByPage(1, filterList)];
      this.setState({
        filteredBrands: filterList,
        pageBrands,
        totalPage,
      });
    } else {
      let filterList = [...this.state.brandList];
      let totalPage = Math.ceil(filterList.length / 20);
      let pageBrands = [...this.getListByPage(1, filterList)];
      this.setState({
        filteredBrands: filterList,
        pageBrands,
        totalPage,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { totalPage, pageBrands } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Beer-DB
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search your brand..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={this.handleOnSearch}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.brandContainer}>
          {pageBrands &&
            pageBrands.map((data, index) => {
              return (
                <Card
                  key={`card-${index}`}
                  className={classes.card}
                  variant="outlined"
                >
                  <CardMedia
                    className={classes.cover}
                    image={data.imageUrl}
                    title={data.name}
                  />
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {data.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {data.style}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {`abv: ${data.abv}`}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {`ounces: ${data.ounces}`}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
        </div>
        <div className={classes.paginationContainer}>
          <Pagination
            count={totalPage}
            variant="outlined"
            shape="rounded"
            boundaryCount={1}
            siblingCount={0}
            onChange={this.onPageSelect}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
