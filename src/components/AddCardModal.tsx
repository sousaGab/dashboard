import React, { useState } from 'react';
import { Zap, ShoppingBag, Users, BarChart2 } from "lucide-react";
import { useCards } from '@/context/CardsContext';

interface AddCardModalProps {
    addCard: (size: "small" | "medium" | "large", name: string, icon: React.ComponentType<{ size: number; className?: string; style?: React.CSSProperties }>, value: string | number, color: string, container: "Dashboard" | "Carousel") => void;
    closeModal: () => void;
    container: "Dashboard" | "Carousel";
}

const AddCardModal: React.FC<AddCardModalProps> = ({ closeModal, container }) => {
    const { addCard } = useCards();
    const [size, setSize] = useState<"small" | "medium" | "large">("small");
    const [type, setType] = useState<"Sales" | "Product" | "User" | "Rate">("Sales");

    const handleAddCard = () => {
        const iconMap: { [key in "Sales" | "Product" | "User" | "Rate"]: React.ComponentType<{ size: number; className?: string; style?: React.CSSProperties }> } = {
            Sales: Zap,
            Product: ShoppingBag,
            User: Users,
            "Rate": BarChart2,
        };
        const colorMap: { [key in "Sales" | "Product" | "User" | "Rate"]: string } = {
            Sales: '#6366F1',
            Product: '#10B981',
            User: '#F59E0B',
            Rate: '#EF4444',
        };
        addCard({ size, name: type, icon: iconMap[type], value: 'New Value', color: colorMap[type], index: 0, container: container });
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Add New Card</h2>
                <div className="mb-4">
                    <label className="block text-gray-300" htmlFor="type-select">Type</label>
                    <select
                        id="type-select"
                        value={type}
                        onChange={(e) => setType(e.target.value as "Sales" | "Product" | "User" | "Rate")}
                        className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-800 text-white h-10 px-2"
                        aria-label="Select card type"
                    >
                        <option value="Sales">Sales</option>
                        <option value="Product">Product</option>
                        <option value="User">User</option>
                        <option value="Rate">Rate</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300" htmlFor="size-select">Size</label>
                    <select
                        id="size-select"
                        value={size}
                        onChange={(e) => setSize(e.target.value as "small" | "medium" | "large")}
                        className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-800 text-white h-10 px-2"
                        aria-label="Select card size"
                    >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={closeModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddCard}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                    >
                        Add Card
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCardModal;
