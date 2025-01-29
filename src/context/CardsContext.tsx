import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CardItemInterface } from '@/utils/types';
import { Zap, ShoppingBag, Users, BarChart2 } from "lucide-react";

const iconMap: { [key in "Sales" | "Product" | "User" | "Rate"]: React.ComponentType<{ size: number; className?: string; style?: React.CSSProperties }> } = {
    Sales: Zap,
    Product: ShoppingBag,
    User: Users,
    Rate: BarChart2,
};

const colorMap: { [key in "Sales" | "Product" | "User" | "Rate"]: string } = {
    Sales: '#6366F1',
    Product: '#10B981',
    User: '#F59E0B',
    Rate: '#EF4444',
};

const sizes: ("small" | "medium" | "large")[] = ["small", "medium", "large"];
const types: ("Sales" | "Product" | "User" | "Rate")[] = ["Sales", "Product", "User", "Rate"];

const generateRandomCards = (count: number): CardItemInterface[] => {
    const cards: CardItemInterface[] = [];
    for (let i = 0; i < count; i++) {
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        cards.push({
            index: i,
            size,
            name: type,
            icon: iconMap[type],
            value: `$${Math.floor(Math.random() * 10000)}`,
            color: colorMap[type],
            container: i < 10 ? 'Dashboard' : 'Carousel',
        });
    }
    return cards;
};

const INITIAL_CARD_COUNT = 20;

const cardData: CardItemInterface[] = generateRandomCards(INITIAL_CARD_COUNT);

interface CardsContextProps {
    cards: CardItemInterface[];
    carouselCards: CardItemInterface[];
    dashboardCards: CardItemInterface[];
    addCard: (card: CardItemInterface) => void;
    removeCard: (id: number) => void;
    setCards: React.Dispatch<React.SetStateAction<CardItemInterface[]>>;
}

const CardsContext = createContext<CardsContextProps | undefined>(undefined);

export const CardsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [cards, setCards] = useState<CardItemInterface[]>(cardData);
    const [carouselCards, setCarouselCards] = useState<CardItemInterface[]>([]);
    const [dashboardCards, setDashboardCards] = useState<CardItemInterface[]>([]);

    useEffect(() => {
        setCarouselCards(cards.filter(card => card.container === 'Carousel'));
        setDashboardCards(cards.filter(card => card.container === 'Dashboard'));
    }, [cards]);

    const addCard = (card: CardItemInterface) => {
        setCards(prevCards => {
            card.index = prevCards.length;
            return [...prevCards, card];
        });
    };

    const removeCard = (index: number) => {
        setCards(prevCards => prevCards.filter(card => card.index !== index));
    };

    return (
        <CardsContext.Provider value={{ cards, addCard, removeCard, setCards, dashboardCards, carouselCards }}>
            {children}
        </CardsContext.Provider>
    );
};

export const useCards = (): CardsContextProps => {
    const context = useContext(CardsContext);
    if (!context) {
        throw new Error('useCards must be used within a CardsProvider');
    }
    return context;
};