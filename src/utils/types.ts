export interface CardItemInterface  { 
    index: number; 
    size: "small" | "medium" | "large"; 
    name: string; 
    icon: React.ElementType;
    value: string | number; 
    color: string; 
    container: 'Dashboard' | 'Carousel';
}

export interface CardProps {
    index: number;
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    color: string;
    icon: React.ElementType;
    size: 'small' | 'medium' | 'large';
    name: string;
    value: string | number;
    container: 'Dashboard' | 'Carousel'; // New property
}

export interface CarouselProps {
    cards: CardProps[];
    onRemove: (index: number) => void;
}
