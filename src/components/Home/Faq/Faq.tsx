"use client";

import CustomHeading from "@/components/utils/CustomHeading";
import { useState } from "react";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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
      question: "What kind of products do you offer?",
      answer:
        "We offer a range of cultural products such as art, apparel, and creative services.",
    },
    {
      question: "How can I purchase items from Grassrootz?",
      answer:
        "You can purchase items directly from our website by browsing our product listings and checking out through our secure payment system.",
    },
    {
      question: "How can I get involved my work on Grassrootz?",
      answer:
        "To get involved your work, you can submit your creations through our online submission form or get in touch with our community support team.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows returns within 30 days of purchase with a valid receipt. Please refer to our full return policy on the website for further details.",
    },
  ];

  return (
    <div className="bg-black text-white md:p-8 rounded-lg max-w-auto md:px-12 mx-auto">
      <h3 className="text-center mt-12 mb-4">
        <CustomHeading> FAQ </CustomHeading>
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700">
            <div
              className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-800 rounded-md"
              onClick={() => toggleQuestion(index)}
            >
              <span className="text-xs md:text-xl font-semibold text-primary">
                {faq.question}
              </span>
              <span className="text-xl">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 text-sm">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
