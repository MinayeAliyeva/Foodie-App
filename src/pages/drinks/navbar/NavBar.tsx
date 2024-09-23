import { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./navbar.css";

const NavBar = ({ menu }: any) => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="navbar">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Topics"
        placement="left"
        onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {menu}
      </Drawer>
    </nav>
  );
};

export default NavBar;
