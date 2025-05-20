import { Menu } from "antd";
import Link from "next/link";

export default function ProfileMenu({
  handleLogout,
  closeMenu,
}: {
  handleLogout: () => void;
  closeMenu?: () => void;
}) {
  // Wrap logout to also close menu
  const onLogoutClick = () => {
    if (closeMenu) closeMenu();
    handleLogout();
  };

  return (
    <Menu>
      <Menu.Item key="1" onClick={() => closeMenu?.()}>
        <Link className="font-bold text-primary" href="/dashboard">
          My Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => closeMenu?.()}>
        <Link className="font-bold text-primary" href="/order-history">
          Order History
        </Link>
      </Menu.Item>
      <Menu.Item key="3" onClick={onLogoutClick}>
        <div className="font-bold text-red-600 cursor-pointer">Logout</div>
      </Menu.Item>
    </Menu>
  );
}
