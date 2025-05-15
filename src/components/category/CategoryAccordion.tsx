"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCategoryStore } from "@/stores/categoryStore";




const CategoryAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const categories = useCategoryStore((state) => state.categories);
  const toggleCategory = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-sm mx-auto p-5 bg-white rounded-2xl shadow-xl border border-gray-200">
      {categories.map((category, index) => (
        <div key={index} className="border-b last:border-none">
          <button
            className="flex items-center justify-between w-full p-4 text-lg font-semibold text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
            onClick={() => toggleCategory(index)}
          >
            <span>{category.RowName}</span>
            {category.SubCategory ? (
              openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-blue-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )
            ) : (
              <span className="w-6 h-6"></span>
            )}
          </button>

          {category.SubCategory && openIndex === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pl-6 pr-4 pb-3 space-y-2 text-gray-700"
            >
              {category.SubCategory && (
                <p className="text-base flex items-center gap-2">
                  {category.SubCategory.RowName}
                </p>
              )}

            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryAccordion;
