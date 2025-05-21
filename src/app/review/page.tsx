// export default function Review() {
//   return (
//     <div>
//       <h3>Review</h3>
//     </div>
//   );
// }
"use client";

import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";

export default function Review() {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(3);

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const onFinish = (values: { review: string }) => {
    const newValues = { ...values, rating };
    console.log("Feedback Submitted:", newValues);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-lg text-white">
      <h3 className="text-center text-lg font-semibold mb-4 mt-32">
        Give your feedback
      </h3>

      <div className=" border p-8 rounded ">
        <div className="flex justify-center space-x-1 mb-3 text-primary ">
          {[1, 2, 3, 4, 5].map((star) =>
            star <= rating ? (
              <StarFilled
                key={star}
                onClick={() => handleStarClick(star)}
                className="text-primary cursor-pointer text-3xl"
              />
            ) : (
              <StarOutlined
                key={star}
                onClick={() => handleStarClick(star)}
                className="text-primary cursor-pointer text-3xl"
              />
            )
          )}
        </div>

        <p className="text-center text-xs mb-4 text-primary">
          Please give your Important feedback for our products
        </p>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="review"
            rules={[{ required: true, message: "Please write your review" }]}
          >
            <Input.TextArea
              placeholder="Write your review"
              rows={5}
              className="bg-black border border-gray-700 text-white rounded-md resize-none"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
