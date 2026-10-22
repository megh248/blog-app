export interface CategorySectionProps {
  selectedCategory: string;
  categories: string[];
  onValueChange: (value: string) => void;
}
