import { Tabs } from "antd";

export default function ProductTabs() {
  const items = [
    {
      key: "1",
      label: (
        <span className="text-white text-xl font-bold hover:text-primary">
          Additional Information
        </span>
      ),
      children: (
        <div className="text-white bg-black p-4 rounded-lg">
          <p>
            <strong>Weight:</strong> 0.01 kg
          </p>
          <p>
            <strong>Category:</strong> Cloth
          </p>
          <p>
            <strong>Stock Status:</strong> Available (5,413)
          </p>
          <h4 className="mt-4 font-semibold">Features:</h4>
          <ul className="list-disc list-inside">
            <li>
              Made from 100% soft cotton or a cotton blend, providing
              breathability and comfort all day long.
            </li>
            <li>Regular/relaxed fit that flatters all body types.</li>
            <li>Minimalist design with a crew neck and short sleeves.</li>
            <li>
              Pre-shrunk fabric to maintain its shape and size after every wash.
            </li>
            <li>Available in multiple colors and sizes to suit your style.</li>
          </ul>
          <h4 className="mt-4 font-semibold"> {"Why You'll Love It:"} </h4>
          <p>
            This T-shirt combines timeless style with superior comfort, making
            it a wardrobe essential.
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span className="text-white text-xl font-bold hover:text-primary">
          Customer Feedback
        </span>
      ),
      children: (
        <div className="text-white bg-black p-4 rounded-lg">
          <div className="border-b pb-2 mb-2">
            <h4 className="font-semibold">Kristin Watson</h4>
            <p>★★★★★</p>
            <p>Duis at ullamcorper nulla, eu dictum eros.</p>
            <p className="text-sm text-gray-400">2 min ago</p>
          </div>
          <div className="border-b pb-2 mb-2">
            <h4 className="font-semibold">Jane Cooper</h4>
            <p>★★★★☆</p>
            <p>
              Keep the soil evenly moist for the healthiest growth. If the sun
              gets too hot, Chinese cabbage tends to bolt or go to seed.
            </p>
            <p className="text-sm text-gray-400">30 Apr, 2021</p>
          </div>
          <div>
            <h4 className="font-semibold">Ralph Edwards</h4>
            <p>★★★★★</p>
            <p>
              200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom
              Non-GMO Productive Brassica rapa.
            </p>
            <p className="text-sm text-gray-400">2 min ago</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs
        defaultActiveKey="1"
        items={items}
        className="bg-black text-white rounded-lg"
      />
    </div>
  );
}
