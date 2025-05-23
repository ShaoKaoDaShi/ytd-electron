import React from 'react'
import { DashboardOutlined, LaptopOutlined, NotificationOutlined, UserOutlined, } from '@ant-design/icons'
import { Breadcrumb, Flex, Layout, Menu, theme } from 'antd'
import { BrowserRouter, useNavigate } from 'react-router'

const { Header, Content, Sider } = Layout

const items1=[{
  key:'/download',
  label:'下载'
},{
  key:'/settings',
  label:'设置',
}]
type LayoutComProps = {
  children?: React.ReactNode
}
const LayoutComp = (props:LayoutComProps) => {
  const {children} = props
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG, colorBorderSecondary, marginXS }
  } = theme.useToken()

  return (
    
    <Layout style={{ height: '100vh' }}>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer, borderRight:`1px solid ${colorBorderSecondary}`, borderRadius: borderRadiusLG, margin:marginXS }} >
          <div>
            <Flex style={{padding:'24px', color:'springgreen', fontSize:'64px'}} align='center' justify='center'><DashboardOutlined /></Flex>
            <Menu
              mode="inline"
              onClick={({ key }) => {
                navigate(key)
              }}
              defaultSelectedKeys={['download']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items1}
            />
          </div>
        </Sider>
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutComp
