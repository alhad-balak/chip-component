// App.tsx
import React, { useState } from 'react';
import ChipInput from './ChipInput';

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleAddItem = (item: string) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  return (
    <div className="container px-6">
      <div className="flex items-center pt-10 justify-center">
        <h1 className="text-3xl items-center font-bold mb-4">Chip Component</h1>
      </div>
      <ChipInput
        selectedItems={selectedItems}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default App;
