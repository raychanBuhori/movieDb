import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Divider } from 'antd';

import { getGenreList } from 'store/modules/movies/action';

import Page from 'components/Page';

class Genres extends Component {

  componentDidMount() {
    this.props.getGenreList();
  }

  render() {
    const { genres } = this.props;
    return (
      <Page>
        <Divider orientation="middle">Genre List</Divider>
        <List
          size='large'
          bordered
          dataSource={genres}
          renderItem={item => <List.Item>{item.name}</List.Item>}
        />
      </Page>
    )
  }

}

const mapStateToProps = state => ({
  genres: state.movie.genreList
});

export default connect(mapStateToProps, { getGenreList })(Genres);