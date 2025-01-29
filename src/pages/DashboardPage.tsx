import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from '@dnd-kit/sortable';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Header from '@/components/common/Header';
import Carousel from '@/components/Carousel';
import Card from '@/components/Card';
import AddCardButton from '@/components/AddCardButton';
import AddCardModal from '@/components/AddCardModal';
import { useCards } from '@/context/CardsContext';

const sizeToSpan = {
    small: 1,
    medium: 2,
    large: 3,
};

function groupCardsIntoRows(cards: any[], maxColumns: number) {
    const rows = [];
    let currentRow: any[] = [];
    let remainingSpace = maxColumns;

    let filteredCards = cards.filter(card => card.container === 'Dashboard');

    filteredCards.forEach((card) => {
        const cardSpan = sizeToSpan[card.size];

        if (cardSpan <= remainingSpace) {
            currentRow.push(card);
            remainingSpace -= cardSpan;
        } else {
            rows.push(currentRow);
            currentRow = [card];
            remainingSpace = maxColumns - cardSpan;
        }
    });

    if (currentRow.length) {
        rows.push(currentRow);
    }

    return rows;
}

const DashboardPage: React.FC = () => {
    const { cards, setCards } = useCards();
    const maxColumns = 3; // Change this for specific layouts

    const [activeId, setActiveId] = useState<number | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [cardsLength, setCardsLength] = useState(cards.length);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContainer, setModalContainer] = useState<"Dashboard" | "Carousel">("Dashboard");

    useEffect(() => {
        if (cards.length < cardsLength) {
            toast.error('Card deleted successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setCardsLength(cards.length);
        }
        else if (cards.length > cardsLength) {
            toast.success('Card added successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setCardsLength(cards.length);
        }
    }, [cards]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleDragStart = (event: any) => {
        const { active } = event;
        const activeCard = cards.find(card => card.index === active.id);

        if (activeCard) {
            document.documentElement.style.setProperty('--dragging-card-height', `${sizeToSpan[activeCard.size] * 100}px`);
            document.documentElement.style.setProperty('--dragging-card-opacity', '0.5');
        }

        setActiveId(active.id);
    };

    const handleDragOver = (event: any) => {
        const { active, over } = event;
        if (over) {
            const overCard = cards.find(card => card.index === over.id);
            const activeCard = cards.find(card => card.index === active.id);
            if (overCard && activeCard) {
                document.documentElement.style.setProperty('--dragging-card-height', `${sizeToSpan[activeCard.size] * 100}px`);
                document.documentElement.style.setProperty('--over-card-height', `${sizeToSpan[overCard.size] * 100}px`);
            }
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        const activeIndex = cards.findIndex((card) => card.index === active.id);
        const overIndex = cards.findIndex((card) => card.index === over?.id);

        if (activeIndex !== -1 && overIndex !== -1 && cards[activeIndex].container === cards[overIndex].container) {
            setCards((prevCards) => arrayMove(prevCards, activeIndex, overIndex));
        } else if (activeIndex !== -1 && over) {
            const updatedCards = [...cards];
            updatedCards[activeIndex].container = cards[overIndex].container;
            setCards(updatedCards);
        }

        setActiveId(null);
        document.documentElement.style.setProperty('--dragging-card-opacity', '1');
    };

    const rows = groupCardsIntoRows(cards, maxColumns);

    const openModal = (container: "Dashboard" | "Carousel") => {
        setModalContainer(container);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!isClient) {
        return null;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
            >
                <SortableContext items={cards.map(card => card.index)} strategy={rectSortingStrategy}>
                    <div className='flex-1 overflow-auto relative z-10' style={{ height: 'calc(100vh - 150px)' }}>
                        <Header title="Dashboard" />
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                            {rows.map((row, rowIndex) => (
                                <div key={`row-${rowIndex}`} className="grid grid-cols-3 gap-1">
                                    {row.map((card) => (
                                        <Card
                                            key={`card-${card.index}`}
                                            id={card.index}
                                            title={card.name}
                                            description=""
                                            imageUrl=""
                                            index={card.index}
                                            size={card.size}
                                            icon={card.icon}
                                            value={card.value}
                                            color={card.color}
                                            name={card.name}
                                            container={card.container}
                                        />
                                    ))}
                                </div>
                            ))}
                            <AddCardButton openModal={openModal} container="Dashboard" addCard={(a: any) => { }} setIsModalOpen={function (isOpen: boolean, container: 'Dashboard' | 'Carousel'): void {
                                throw new Error('Function not implemented.');
                            }} />
                        </div>
                    </div>
                </SortableContext>
            </DndContext>
            <footer>
                <Carousel handleDragStart={handleDragStart} openModal={openModal} />
            </footer>
            <ToastContainer />
            {isModalOpen && <AddCardModal addCard={(size, name, icon, value, color, container) => {
                setCards([...cards, { size, name, icon, value, color, index: cards.length, container }]);
            }} closeModal={closeModal} container={modalContainer} />}
        </DndProvider>
    );
};

export default DashboardPage;
