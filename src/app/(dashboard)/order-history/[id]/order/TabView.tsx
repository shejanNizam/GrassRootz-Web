import { Tabs } from "antd";
import ProductList from "./ProductList";

const { TabPane } = Tabs;

export default function TabbedView() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={<span className="font-bold text-xl text-white">Processing</span>}
          key="1"
        >
          <ProductList type="processing" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl text-white">Delivered</span>}
          key="2"
        >
          <ProductList type="delivered" />
        </TabPane>
      </Tabs>
    </div>
  );
}
