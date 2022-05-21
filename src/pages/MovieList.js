import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Space, Pagination, Divider } from 'antd';
import { HeartOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import { setCurrentMovie } from 'store/modules/currentValue/action';
import { getMovieList } from 'store/modules/movies/action';
import { getGenreList } from 'store/modules/movies/action';

import Page from 'components/Page';
import MovieDetail from 'components/movieDetail';

class MovieList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      detail: false,
      page: props.currentPage,
    }

    this.renderGenre = this.renderGenre.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleMovieSelect = this.handleMovieSelect.bind(this);
    this.handleCloseDetail = this.handleCloseDetail.bind(this);
  }

  handleCloseDetail = () => {
    this.setState({ detail: false });
  }

  handlePageChange = page => {
    this.setState({ page });
    this.props.getMovieList(page);
  }

  handleMovieSelect = id => {
    this.props.setCurrentMovie(id);
    this.setState({ detail: true });
  }

  renderGenre = (genreIds) => {
    const { genres } = this.props;

    let listGenre = [];
    for (const id of genreIds) {
      for (const genre of genres) {
        if (id === genre.id) {
          listGenre.push(genre.name);
        }
      }
    }

    return listGenre.toString();
  }

  componentDidMount = () => {
    this.props.getMovieList();
  }

  render() {
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

    return (
      <Page>
        {this.state.detail ?
          <MovieDetail openDetail={this.state.detail} closeDetail={this.handleCloseDetail} />
          :
          <>
            <Divider orientation="middle">Movie List</Divider>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={this.props.movieList}
              renderItem={item => (
                <List.Item
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.handleMovieSelect(item.id)}
                  key={item.title}
                  actions={[
                    <IconText icon={StarOutlined} text={item.vote_average} key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text={item.vote_count} key="list-vertical-like-o" />,
                    <IconText icon={HeartOutlined} text={item.popularity} key="list-vertical-heart-o" />,
                  ]}
                  extra={
                    <img
                      width={200}
                      alt="logo"
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    />
                  }
                >
                  <List.Item.Meta
                    title={item.title}
                    description={this.renderGenre(item.genre_ids)}
                  />
                  {item.overview}
                </List.Item>
              )}
            />
            <div style={{ textAlign: 'center' }}>
              <Pagination
                defaultCurrent={1}
                current={this.props.currentPage}
                total={this.props.totalResult}
                onChange={page => this.handlePageChange(page)}
              />
            </div>
          </>
        }
      </Page>
    )
  }

}

const mapStateToProps = state => ({
  genres: state.movie.genreList,
  movieList: state.movie.movieList,
  currentPage: state.movie.currentPage,
  totalPage: state.movie.totalPage,
  totalResult: state.movie.totalResult
});

export default connect(mapStateToProps, { setCurrentMovie, getMovieList, getGenreList })(MovieList);