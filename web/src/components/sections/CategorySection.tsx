import { Tabs, TabsTrigger,TabsList } from "../ui/tabs"

export const CategorySection = () => {

    const categories = ["All","React", "JavaScript", "TypeScript", "Python ", "Career"]
    return (
        <Tabs defaultValue={"All"} className={"flex items-center justify-center"}>
            <TabsList>
                {
                    categories.map((category) => <TabsTrigger value={category}>{category}</TabsTrigger>)
                }
            </TabsList>
        </Tabs>
    )
}