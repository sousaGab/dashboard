import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Card from './Card';
import AddCardButton from './AddCardButton';
import { useCards } from '@/context/CardsContext';

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface CarouselProps {
    handleDragStart: (event: any) => void;
    openModal: (container: "Dashboard" | "Carousel") => void;
}

const Carousel: React.FC<CarouselProps> = ({ handleDragStart, openModal }) => {
    const { cards, setCards } = useCards();
    const carouselCards = cards.filter(card => card.container === 'Carousel');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const handleClick = (index: any) => {
        console.log(index);
        const newCards = [...cards];
        const cardIndex = newCards.findIndex(card => card.index === index);
        newCards[cardIndex].container = 'Dashboard';
        setCards(newCards);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart}>
                <div className="bg-gray-900 p-4 fixed bottom-0 left-0 right-0 ">
                    <Swiper
                        spaceBetween={1}
                        slidesPerView="auto"
                        navigation
                        pagination={{ clickable: true }}
                        centeredSlides={true}
                        breakpoints={{
                            1024: {
                                slidesPerView: 8,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 6,
                                spaceBetween: 12,
                            },
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {carouselCards.length === 0 ? (
                            <div className="justify-center items-center">
                                <AddCardButton openModal={openModal} container="Carousel" addCard={(a: any) => { }} setIsModalOpen={function (isOpen: boolean, container: 'Dashboard' | 'Carousel'): void {
                                    throw new Error('Function not implemented.');
                                }} />
                            </div>
                        ) : (
                            carouselCards.map((card, index) => (
                                <SwiperSlide
                                    key={card.index}
                                    onClick={() => handleClick(card.index)}
                                >
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
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>
            </DndContext>
        </DndProvider>
    );
};

export default Carousel;

function setActiveId(index: any) {
    throw new Error('Function not implemented.');
}
