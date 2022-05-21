import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FireOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';

import { setCurrentKey } from 'store/modules/currentValue/action';

const { Header, Sider, Content } = Layout;

class Page extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: false,
    }

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleKeyClick = (link, key) => {
    this.props.setCurrentKey(key);
    window.location.assign(link);
  }

  componentDidMount() {
    this.props.setCurrentKey('1');
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className='logo'>
            <img src='3d-movie.png' style={this.state.collapsed ? { display: 'flex', margin: 'auto' } : {}} width={this.state.collapsed ? '50%' : '20%'} />
            {this.state.collapsed ? null : <label>MovieDb</label>}
          </div>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={[this.props.activeKey]}
            items={[
              {
                key: '1',
                icon: <FireOutlined />,
                onClick: () => this.handleKeyClick('/', '1'),
                label: 'Genres'
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                onClick: () => this.handleKeyClick('/movies', '2'),
                label: 'Movies'
              }
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggleCollapsed,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }

}

const mapStateToProps = state => ({
  activeKey: state.current.activeKey
});

export default connect(mapStateToProps, { setCurrentKey })(Page);