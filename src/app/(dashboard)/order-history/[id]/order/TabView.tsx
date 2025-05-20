// export default function TabView() {
//   return (
//     <>
//       <h3 className="text-center my-12">TabView</h3>
//     </>
//   );
// }

import { Tabs } from "antd";
import ProductList from "./ProductList";

const { TabPane } = Tabs;

export default function TabbedView() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={<span className="font-bold text-xl text-white">Category</span>}
          key="1"
        >
          {/* <AvailableSession type="available" /> */}
          <ProductList type="processing" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl text-white">Profession</span>}
          key="2"
        >
          {/* <AvailableSession type="expired" /> */}
          <ProductList type="delivered" />
        </TabPane>
      </Tabs>
    </div>
  );
}
