// ChipInput.tsx
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface ChipInputProps {
    selectedItems: string[];
    onAddItem: (item: string) => void;
    onRemoveItem: (index: number) => void;
}

type Item = {
    name: string;
    email: string;
};

const ChipInput: React.FC<ChipInputProps> = ({ selectedItems, onAddItem, onRemoveItem }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    const [isDoubleBackSpace, setIsDoubleBackSpace] = useState<boolean | null>(false);

    const itemList: Item[] = [
        { name: 'Abhinav', email: 'Abhinav@gmail.com' },
        { name: 'Ram', email: 'Ram@gmail.com' },
        { name: 'Item', email: 'Item@gmail.com' },
        { name: 'Shyam', email: 'Shyam@gmail.com' },
        { name: 'Sundar', email: 'Sundar@gmail.com' },
        { name: 'Sandhya', email: 'Sandhya@gmail.com' },
        { name: 'Satya', email: 'Satya@gmail.com' },
        { name: 'Nitish', email: 'Nitish@gmail.com' },
        { name: 'Vishal', email: 'Vishal@gmail.com' },
        { name: 'Ganesh', email: 'Ganesh@gmail.com' },
        { name: 'Shiristi', email: 'Shiristi@gmail.com' },
        // Add more items as needed
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setHighlightedIndex(null);
        setIsDoubleBackSpace(false);
    };

    const handleItemClick = (item: string) => {
        onAddItem(item);
        setInputValue('');
    };

    const handleChipRemove = (index: number) => {
        onRemoveItem(index);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // Highlight the last chip when backspace is pressed
        if (!isDoubleBackSpace && highlightedIndex == null && e.key === 'Backspace' && inputValue === '' && selectedItems.length > 0) {
            setHighlightedIndex(selectedItems.length - 1);
        }
        else if (e.key === 'Backspace' && highlightedIndex != null && inputValue === '' && selectedItems.length > 0) {
            setIsDoubleBackSpace(true);
        }

        if (e.key === 'Enter' && inputValue.length > 0) {
            var list = itemList
                .filter((item) => !selectedItems.includes(item.name))
                .filter((item) =>
                    item.name.toLowerCase().includes(inputValue.toLowerCase()) || item.email.toLowerCase().includes(inputValue.toLowerCase())
                );
            if (list !== null && list.length > 0) {
                onAddItem(list[0].name);
                setInputValue('');
            }
            else{
                
            }
        }
    };

    const handleBackspaceRelease = () => {
        if (highlightedIndex !== null && isDoubleBackSpace) {
            // Remove the last highlighted chip
            onRemoveItem(highlightedIndex);
            setHighlightedIndex(null);
            setIsDoubleBackSpace(false);
        }
    };


    return (
        <div className="flex flex-col space-y-2 border border-gray-300 rounded w-auto">
            <div className="flex flex-wrap space-x-2">
                {selectedItems.map((item, index) => (
                    <div
                        key={index}
                        className={`${highlightedIndex === index
                            ? 'bg-blue-500 text-white'
                            : 'border border-blue-500 text-blue-500'
                            } m-1 p-1 rounded flex items-center`}
                    >
                        {item}
                        <span
                            className="ml-2 cursor-pointer"
                            onClick={() => handleChipRemove(index)}
                        >
                            X
                        </span>
                    </div>
                ))}
                <div className="relative flex-grow">
                    <input
                        type="text"
                        className="p-2 w-full outline-0"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleBackspaceRelease}
                    />
                    {inputValue !== '' && (
                        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded">
                            {itemList
                                .filter((item) => !selectedItems.includes(item.name))
                                .filter((item) =>
                                    item.name.toLowerCase().includes(inputValue.toLowerCase())
                                )
                                .map((item, index) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer p-2 ${highlightedIndex === index ? 'bg-gray-200' : ''
                                            }`}
                                        onClick={() => handleItemClick(item.name)}
                                    >
                                        <span>{item.name}</span>  <span className='text-[#9d9fa3a1]'>{item.email}</span>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChipInput;
