import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragOverlay } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CardProps } from '@/utils/types';
import { useCards } from '@/context/CardsContext';


const sizeToSpanClass = {
    small: 'col-span-1',
    medium: 'col-span-2',
    large: 'col-span-3',
};

const CardContent: React.FC<Pick<CardProps, 'title' | 'icon' | 'value' | 'color' | 'size'>> = ({ title, icon, size, color }) => (
    <>
        <div className="flex items-center space-x-4">
            {React.createElement(icon, { size: 24, className: 'text-white', style: { color } })}
        </div>
        <p className="text-white text-xl font-semibold mt-2">{title}</p>
        <p className="text-gray-400 text-sm">{size}</p>
    </>
);

export const DragOverlayCard: React.FC<CardProps> = ({ title, size, icon, value }) => (
    <motion.div
        animate={{ scale: 1.05 }}
        className={`${sizeToSpanClass[size]} bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 p-4`}
    >
        <CardContent title={title} icon={icon} size={size} value={''} color={''} />
    </motion.div>
);


const CardItem: React.FC<CardProps> = ({ id, index, title, size, icon, color, value, container }) => {
    const { removeCard } = useCards();
    const { attributes, listeners, setNodeRef, transition, isDragging, over, transform } = useSortable({ id });
    const isOver = over?.id === id;
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        position: 'relative',
        willChange: 'transform',
    };

    const motionProps = isDragging
        ? {}
        : {
            whileHover: { y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" },
            whileTap: { scale: 0.95 }
        };

    return (
        <>
            <motion.div
                ref={setNodeRef}
                style={style as React.CSSProperties}
                {...motionProps}
                animate={{ scale: isDragging ? 0.85 : 1, opacity: isDragging ? 0.4 : 1 }}
                className={`
                    ${sizeToSpanClass[size]}
                    bg-opacity-50 
                    backdrop-blur-md 
                    shadow-lg 
                    rounded-xl 
                    border 
                    ${isOver ? 'border-blue-500' : 'border-gray-700'}
                    ${isOver ? 'rgba(59, 130, 246, 0.1)' : 'bg-gray-750'}
                    p-4`}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeCard(index);
                    }}
                    onMouseDown={(e) => e.stopPropagation()} // Prevent drag start
                    className="absolute top-2 right-2 text-white rounded-full p-1"
                >
                    <X size={15} />
                </button>
                <div {...attributes} {...listeners}>
                    <CardContent title={title} icon={icon} size={size} color={color} value={''} />
                </div>
            </motion.div>
            {isDragging && (
                <DragOverlay>
                    <DragOverlayCard title={title} size={size} icon={icon} value={value} id={index} description={''} imageUrl={''} index={index} name={''} container={container} color={''} />
                </DragOverlay>
            )}
        </>
    );
};

export default CardItem;
