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
        { name: 'Abhinav Gupta', email: 'gupta.abhinavkg@gmail.com' },
        { name: 'Ram Shyam Narayan', email: 'ram.snarayan@gmail.com' },
        { name: 'Radhika Singh', email: 'radhika.singh@gmail.com' },
        { name: 'Shyam Sundar', email: 'shyam.sundar@gmail.com' },
        { name: 'Sai Sundaram', email: 'sai.sundaram@gmail.com' },
        { name: 'Sandhya Rathore', email: 'sandhya.rathore@gmail.com' },
        { name: 'Satya Prasad', email: 'satya.prasad@yahoo.com' },
        { name: 'Nitish Kumar Nehra', email: 'nitish.knehra@gmail.com' },
        { name: 'Vishal Raj Rai', email: 'vishal.raj.rai@gmail.com' },
        { name: 'Ganesh Bahadur', email: 'ganesh.bahadur@gmail.com' },
        { name: 'Shiristi Sood', email: 'shiristi.sood@gmail.com' },
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
            else {

            }
        }
    };

    const handleBackspaceRelease = () => {
        if (highlightedIndex !== null && isDoubleBackSpace) {
            onRemoveItem(highlightedIndex);
            setHighlightedIndex(null);
            setIsDoubleBackSpace(false);
        }
    };


    return (
        <div className="flex flex-col space-y-2 border-b-2 border-sky-500 rounded">
            <div className="flex flex-wrap space-x-2">
                {selectedItems.map((item, index) => (
                    <div
                        key={index}
                        className={`${highlightedIndex === index
                            ? 'bg-gray-400 text-black'
                            : 'bg-gray-200 text-black-500'
                            } m-1 px-3 py-0 rounded-full flex items-center`}
                    >
                        <div className="inset-y-0 relative right-2.5 flex items-left">
                            <img className='h-7 w-7' src='data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%2354BB6C%22%20d%3D%22M24-.002c-13.255%200-24%2010.745-24%2024%200%207.313%203.275%2013.858%208.434%2018.26h31.132C44.725%2037.856%2048%2031.312%2048%2023.998c0-13.254-10.745-24-24-24z%22%2F%3E%3Cpath%20fill%3D%22%23F8D270%22%20d%3D%22M30.146%2037.17H17.854l1.149-6.836%201.196-7.115h7.602l1.196%207.115z%22%2F%3E%3Cpath%20fill%3D%22%23FEE29C%22%20d%3D%22M24.002%208.966c-5.471%200-9.907%204.435-9.907%209.907%200%205.471%204.435%2012.993%209.907%2012.993%205.471%200%209.907-7.522%209.907-12.993%200-5.472-4.436-9.907-9.907-9.907z%22%2F%3E%3Cpath%20fill%3D%22%23FEE29C%22%20d%3D%22M35.747%2019.581c-.223%201.949-1.231%203.435-2.243%203.319-1.02-.117-1.657-1.791-1.434-3.74.222-1.939%201.221-3.427%202.241-3.31%201.012.116%201.658%201.791%201.436%203.731zM12.257%2019.581c.223%201.949%201.231%203.435%202.242%203.319%201.02-.117%201.657-1.791%201.434-3.74-.222-1.939-1.221-3.427-2.241-3.31-1.011.116-1.657%201.791-1.435%203.731z%22%2F%3E%3Cpath%20fill%3D%22%23393A58%22%20d%3D%22M35.525%2014.634v.73c0%20.046-.037.083-.083.092-.046.009-.092-.009-.111-.056l-.324-.805c-.028.222-.046.435-.074.657-.083.805-.167%201.628-.305%202.433-.185%201.147-.638%202.239-1.36%203.349-.028.028-.074.046-.111.037-.046-.009-.074-.046-.083-.093a21.119%2021.119%200%200%201-.046-.814c-.046-.583-.083-1.193-.148-1.785-.176-1.536-.416-3.164-1.277-4.607-.944-1.582-2.248-1.952-3.876-1.101-3.071%201.582-6.254%201.434-9.455-.463-.37-.213-.62-.213-.99.018-1.249.768-1.934%201.971-2.156%203.784-.194%201.573-.056%203.219.462%205.338.046.176.083.361.13.537.009.046-.009.083-.028.12-.009.009-.019.037-.037.065a.103.103%200%200%201-.093.056.095.095%200%200%201-.083-.046c-1.684-2.655-2.045-5.625-2.359-8.511l-.287.389c-.044.066-.155.048-.176-.037l-.167-.666c-.009-.009-.009-.018-.009-.028%200-.583-.268-4.746%206.235-9.372%201.193-.851%202.637-.981%203.83-1.064.077-.019.135.082.102.148l-.379.731.019.009c2.239-1.055%204.635-.99%207.531.194.079.04.083.172-.028.194l-1.906.287c4.09%201.364%206.415%203.075%207.466%209.298.056.325.111.658.176.982z%22%2F%3E%3Cpath%20fill%3D%22%23ED7167%22%20d%3D%22M39.683%2042.162c-4.2%203.64-9.68%205.84-15.68%205.84s-11.49-2.2-15.69-5.84l.52-4.5c.37-3.3%203.17-5.8%206.49-5.8h3.38c0%20.06%200%20.13.01.19a5.298%205.298%200%200%200%205.29%205.12c2.85%200%205.17-2.25%205.29-5.07.01-.08.01-.16.01-.24h3.37c3.33%200%206.12%202.5%206.5%205.8l.51%204.5z%22%2F%3E%3Cpath%20fill%3D%22%23DE564E%22%20d%3D%22M29.262%2031.847c-.307%202.645-2.535%204.713-5.26%204.713-2.742%200-4.98-2.093-5.268-4.713h-1.332c.309%203.372%203.149%206.022%206.6%206.022%203.425%200%206.251-2.61%206.589-6.022h-1.329z%22%2F%3E%3C%2Fsvg%3E' alt="" />
                            <svg
                                className="h-2 w-2 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                            </svg>
                        </div>
                        <span className="inset-y-0 relative right-2.5 flex items-left">{item}</span>

                        <span
                            className="pl-2 cursor-pointer"
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
                        <ul className="absolute left-0 right-0 mt-2 bg-white border w-4/5 border-gray-300 rounded">
                            {itemList
                                .filter((item) => !selectedItems.includes(item.name))
                                .filter((item) =>
                                    item.name.toLowerCase().includes(inputValue.toLowerCase())
                                )
                                .map((item, index) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer items-center hover:bg-gray-300 grid grid-flow-col p-2 justify-start ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
                                        onClick={() => handleItemClick(item.name)}
                                    >
                                        <div className="inset-y-0 left-0 w-8">
                                            <img className='h-7 w-7' src='data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%2354BB6C%22%20d%3D%22M24-.002c-13.255%200-24%2010.745-24%2024%200%207.313%203.275%2013.858%208.434%2018.26h31.132C44.725%2037.856%2048%2031.312%2048%2023.998c0-13.254-10.745-24-24-24z%22%2F%3E%3Cpath%20fill%3D%22%23F8D270%22%20d%3D%22M30.146%2037.17H17.854l1.149-6.836%201.196-7.115h7.602l1.196%207.115z%22%2F%3E%3Cpath%20fill%3D%22%23FEE29C%22%20d%3D%22M24.002%208.966c-5.471%200-9.907%204.435-9.907%209.907%200%205.471%204.435%2012.993%209.907%2012.993%205.471%200%209.907-7.522%209.907-12.993%200-5.472-4.436-9.907-9.907-9.907z%22%2F%3E%3Cpath%20fill%3D%22%23FEE29C%22%20d%3D%22M35.747%2019.581c-.223%201.949-1.231%203.435-2.243%203.319-1.02-.117-1.657-1.791-1.434-3.74.222-1.939%201.221-3.427%202.241-3.31%201.012.116%201.658%201.791%201.436%203.731zM12.257%2019.581c.223%201.949%201.231%203.435%202.242%203.319%201.02-.117%201.657-1.791%201.434-3.74-.222-1.939-1.221-3.427-2.241-3.31-1.011.116-1.657%201.791-1.435%203.731z%22%2F%3E%3Cpath%20fill%3D%22%23393A58%22%20d%3D%22M35.525%2014.634v.73c0%20.046-.037.083-.083.092-.046.009-.092-.009-.111-.056l-.324-.805c-.028.222-.046.435-.074.657-.083.805-.167%201.628-.305%202.433-.185%201.147-.638%202.239-1.36%203.349-.028.028-.074.046-.111.037-.046-.009-.074-.046-.083-.093a21.119%2021.119%200%200%201-.046-.814c-.046-.583-.083-1.193-.148-1.785-.176-1.536-.416-3.164-1.277-4.607-.944-1.582-2.248-1.952-3.876-1.101-3.071%201.582-6.254%201.434-9.455-.463-.37-.213-.62-.213-.99.018-1.249.768-1.934%201.971-2.156%203.784-.194%201.573-.056%203.219.462%205.338.046.176.083.361.13.537.009.046-.009.083-.028.12-.009.009-.019.037-.037.065a.103.103%200%200%201-.093.056.095.095%200%200%201-.083-.046c-1.684-2.655-2.045-5.625-2.359-8.511l-.287.389c-.044.066-.155.048-.176-.037l-.167-.666c-.009-.009-.009-.018-.009-.028%200-.583-.268-4.746%206.235-9.372%201.193-.851%202.637-.981%203.83-1.064.077-.019.135.082.102.148l-.379.731.019.009c2.239-1.055%204.635-.99%207.531.194.079.04.083.172-.028.194l-1.906.287c4.09%201.364%206.415%203.075%207.466%209.298.056.325.111.658.176.982z%22%2F%3E%3Cpath%20fill%3D%22%23ED7167%22%20d%3D%22M39.683%2042.162c-4.2%203.64-9.68%205.84-15.68%205.84s-11.49-2.2-15.69-5.84l.52-4.5c.37-3.3%203.17-5.8%206.49-5.8h3.38c0%20.06%200%20.13.01.19a5.298%205.298%200%200%200%205.29%205.12c2.85%200%205.17-2.25%205.29-5.07.01-.08.01-.16.01-.24h3.37c3.33%200%206.12%202.5%206.5%205.8l.51%204.5z%22%2F%3E%3Cpath%20fill%3D%22%23DE564E%22%20d%3D%22M29.262%2031.847c-.307%202.645-2.535%204.713-5.26%204.713-2.742%200-4.98-2.093-5.268-4.713h-1.332c.309%203.372%203.149%206.022%206.6%206.022%203.425%200%206.251-2.61%206.589-6.022h-1.329z%22%2F%3E%3C%2Fsvg%3E' alt="" />
                                            <svg
                                                className="h-2 w-2 text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                            </svg>
                                        </div>
                                        <div>{item.name}</div>
                                        <div className='pl-2 text-[#9d9fa3a1]'>{item.email}</div>

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
