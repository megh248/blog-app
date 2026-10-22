import type { CategorySectionProps } from "../../features/blogs/types/categorySectionTypes";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export const CategorySection = ({
  selectedCategory,
  categories,
  onValueChange,
}: CategorySectionProps) => {
  return (
    <Tabs
      value={selectedCategory}
      onValueChange={onValueChange}
      className="flex items-center justify-center"
    >
      <TabsList>
        {categories.map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
