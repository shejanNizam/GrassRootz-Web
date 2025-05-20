import { Menu } from "antd";
import Link from "next/link";

export default function ProfileMenu({
  handleLogout,
}: {
  handleLogout: () => void;
}) {
  return (
    <>
      <Menu>
        <Menu.Item key="1">
          <Link className="font-bold text-primary" href="/dashboard">
            My Profile
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link className="font-bold text-primary" href="/order-history">
            Order History
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <div className="font-bold text-red-600" onClick={handleLogout}>
            Logout
          </div>
        </Menu.Item>
      </Menu>
    </>
  );
}
