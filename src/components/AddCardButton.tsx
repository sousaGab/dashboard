import React from 'react';

interface AddCardButtonProps {
    addCard: (size: "small" | "medium" | "large", name: string, icon: React.ComponentType<{ size: number; className?: string; style?: React.CSSProperties }>, value: string | number, color: string, container: "Dashboard" | "Carousel") => void;
    container: "Dashboard" | "Carousel";
    setIsModalOpen: (isOpen: boolean, container: "Dashboard" | "Carousel") => void;
    openModal: (container: "Dashboard" | "Carousel") => void;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ addCard, container, openModal }) => {

    return (
        <>
            <div
                className="border-dashed border-2 border-gray-500 rounded-lg p-4 flex items-center justify-center cursor-pointer"
                style={{ width: '150px', height: '150px' }}
                onClick={() => openModal(container)}
            >
                <span className="text-gray-500">+ Add Card</span>
            </div>
        </>
    );
};

export default AddCardButton;
