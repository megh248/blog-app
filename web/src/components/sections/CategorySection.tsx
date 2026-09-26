import type { CategorySectionProps } from "../../features/blogs/types/categorySectionTypes";
import { Tabs, TabsTrigger, TabsList } from "../ui/tabs";

export const CategorySection = ({
  selectedCategory,
  onValueChange,
}: CategorySectionProps) => {
  const categories = [
    "All",
    "React",
    "JavaScript",
    "TypeScript",
    "Python",
    "Career",
  ];
  return (
    <Tabs
      onValueChange={(e) => onValueChange(e)}
      defaultValue={selectedCategory}
      className={"flex items-center justify-center"}
    >
      <TabsList>
        {categories.map((category) => (
          <TabsTrigger value={category}>{category}</TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
