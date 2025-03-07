"use client";

import CustomHeading from "@/components/utils/CustomHeading";
import { useState } from "react";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Grassrootz Culture?",
      answer:
        "Grassrootz Culture is a community-driven platform that promotes culture and creative expression.",
    },
    {
      question: "What kind of products or services do you offer?",
      answer:
        "We offer a range of cultural products such as art, apparel, and creative services.",
    },
    {
      question: "How can I purchase items from Grassrootz Culture?",
      answer:
        "You can purchase items directly from our website by browsing our product listings and checking out through our secure payment system.",
    },
    {
      question:
        "How can I get involved or feature my work on Grassrootz Culture?",
      answer:
        "To get involved or feature your work, you can submit your creations through our online submission form or get in touch with our community support team.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows returns within 30 days of purchase with a valid receipt. Please refer to our full return policy on the website for further details.",
    },
  ];

  return (
    <div className="bg-black text-white md:p-8 rounded-lg max-w-auto md:px-12 mx-auto">
      <h3 className="text-center mb-8">
        <CustomHeading> FAQ </CustomHeading>
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700">
            <div
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-800 rounded-md"
              onClick={() => toggleQuestion(index)}
            >
              <span className="text-lg">{faq.question}</span>
              <span className="text-xl">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="p-4 text-sm">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
