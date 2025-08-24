"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BackgroundPattern } from "../hero-06/background-pattern";

const faq = [
  { question: "What is your return policy?", answer: "You can return unused items in their original packaging within 30 days for a refund or exchange. Contact support for assistance." },
  { question: "How do I track my order?", answer: "Track your order using the link provided in your confirmation email, or log into your account to view tracking details." },
  { question: "Do you ship internationally?", answer: "Yes, we ship worldwide. Shipping fees and delivery times vary by location, and customs duties may apply for some countries." },
  { question: "What payment methods do you accept?", answer: "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, and Google Pay, ensuring secure payment options for all customers." },
  { question: "What if I receive a damaged item?", answer: "Please contact our support team within 48 hours of delivery with photos of the damaged item. We’ll arrange a replacement or refund." },
];

const FAQ01 = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12">
      <BackgroundPattern />

      {/* Scroll animation */}
      <motion.div
        className="max-w-xl"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }} // trigger once when 20% in view
      >
        <motion.h2
          className="text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Questions & Answers
        </motion.h2>

        <Accordion type="single" className="mt-6" defaultValue="question-0">
          {faq.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index}`}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionTrigger className="text-left text-lg hover:scale-[1.02] transition-transform  hover:no-underline">
                  {question}
                </AccordionTrigger>
                <AccordionContent>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {answer}
                  </motion.p>
                </AccordionContent>
              </motion.div>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
};

export default FAQ01;
