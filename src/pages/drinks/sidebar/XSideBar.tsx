import { Layout } from "antd";
import "./sidebar.css"
export const XSideBar = ({ menu }:any) => {
  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
        {menu}
    </Layout.Sider>
  );
};
