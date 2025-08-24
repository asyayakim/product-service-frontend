export default function Category({ category, onSelect }: { category: string; onSelect: (category: string) => void }) {
    return (
        <div className="category-item" onClick={() => onSelect(category)}>
            {category}
        </div>
    );
}