import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Form, Input, Space } from 'antd';
import { HeartOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import { getMovieDetail } from 'store/modules/movies/action';
import { releaseDate } from 'utils/momentDate';

const MovieDetail = props => {
  const dispatch = useDispatch();
  const current = useSelector(state => state.current);
  const { currentMovie = '' } = current;
  const movie = useSelector(state => state.movie);
  const { detail = {} } = movie;
  const [detailMovie, setDetailMovie] = useState({});

  useEffect(() => {
    if (currentMovie) {
      dispatch(getMovieDetail(currentMovie));
    }
  }, [currentMovie]);

  useEffect(() => {
    if (props.openDetail && detail) {
      setDetailMovie(value => ({ ...detail }));
    }
  }, [detail]);

  const IconText = ({ icon, text }) => (
    <Space style={{ marginRight: '1rem' }}>
      {React.createElement(icon)}
      <label style={{ paddingTop: '5px' }}>{text}</label>
    </Space>
  );

  return (
    <div className='movieDetail'>
      <Divider orientation="middle">{detailMovie.title}</Divider>
      <div className='header'>
        <div>
          <img
            width={272}
            alt="logo"
            src={`https://image.tmdb.org/t/p/original${detailMovie.poster_path}`}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconText icon={StarOutlined} text={detailMovie.vote_average} key="list-vertical-star-o" />
            <IconText icon={LikeOutlined} text={detailMovie.vote_count} key="list-vertical-like-o" />
            <IconText icon={HeartOutlined} text={detailMovie.popularity} key="list-vertical-heart-o" />
          </div>
        </div>
        <Form
          style={{ paddingLeft: '2rem', width: '100%' }}
          layout='vertical'
        >
          <Form.Item label='Movie Title'>
            <Input value={`${detailMovie.title} "${detailMovie.tagline}"`} />
          </Form.Item>
          <Form.Item label='Release Date'>
            <Input value={releaseDate(detailMovie.release_date)} />
          </Form.Item>
          <Form.Item label="Genre">
            <Input value={detailMovie.genres ? detailMovie.genres.map(e => ` ${e.name}`) : ''} />
          </Form.Item>
          <Form.Item label='Production By'>
            <Input value={detailMovie.production_companies ? detailMovie.production_companies.map(e => ` ${e.name}`) : ''} />
          </Form.Item>
          <Form.Item label='Produce in'>
            <Input value={detailMovie.production_countries ? detailMovie.production_countries.map(e => ` ${e.name}`) : ''} />
          </Form.Item>
        </Form>
      </div>
      <Form layout='vertical' style={{ width: '100%', marginTop: '2rem' }}>
        <Form.Item label='Overview'>
          <Input.TextArea value={detailMovie.overview} />
        </Form.Item>
      </Form>

      <Button type='primary' onClick={props.closeDetail}>
        Back
      </Button>
    </div>
  )

}

export default MovieDetail;

MovieDetail.propTypes = {
  openDetail: PropTypes.bool.isRequired,
  closeDetail: PropTypes.func.isRequired
}



