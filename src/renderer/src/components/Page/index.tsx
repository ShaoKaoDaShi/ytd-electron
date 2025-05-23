import { Breadcrumb, Layout, theme } from "antd"
import { Content } from "antd/es/layout/layout"

export const Page = (props) => {
    const { children } = props
    const {
        token: { colorBgContainer, borderRadiusLG,marginXS }
    } = theme.useToken()

    return <Layout style={{height:'100vh'}}>
        <Content
                style={{
                    padding: 24,
                    margin: marginXS,
                    marginLeft: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG
                }}
            >
                {children}
            </Content>
    </Layout>
}