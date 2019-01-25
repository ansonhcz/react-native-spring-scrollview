/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/15
 *
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SpringScrollView } from "../src";

export class RefreshAndLoadingExample extends React.Component {
  _scrollView;
  _step = 15;

  constructor(props) {
    super(props);
    this.state = {
      count: this._step,
      allLoaded: false,
      refreshStyle: "stickyContent",
      loadingStyle: "stickyContent"
    };
  }

  render() {
    const arr = [];
    for (let i = 0; i < this.state.count; ++i) arr.push(i);
    return (
      <SpringScrollView
        ref={ref => (this._scrollView = ref)}
        style={styles.container}
        onRefresh={this._onRefresh}
        onLoading={this._onLoading}
        refreshStyle={this.state.refreshStyle}
        loadingStyle={this.state.loadingStyle}
        allLoaded={this.state.allLoaded}
      >
        {arr.map(item =>
          <Text key={item} style={styles.text}>
            This is a Normal Refresh and Loading Test
          </Text>
        )}
      </SpringScrollView>
    );
  }

  _onRefresh = () => {
    setTimeout(() => {
      this._scrollView.endRefresh();
      this.setState({ count: this._step });
    }, 1000);
  };

  _onLoading = () => {
    setTimeout(() => {
      this._scrollView.endLoading();
      this.setState(p => ({
        count: p.count + this._step,
        allLoaded: !p.allLoaded
      }));
    }, 1000);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"lightgray"
  },
  text: {
    paddingVertical: 20,
    fontSize: 16,
    textAlign:"center",
    backgroundColor:"white"
  }
});