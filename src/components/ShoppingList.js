import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/items').then(r=>r.json())
    .then(items=>setItems(items))
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  const handleNewItem = (newItem) => {
    setItems([...items, newItem])
  }

  const handleItemUpdate = updatedItem => {
    const updatedItems = items.map((item)=>{
      if(item.id===updatedItem.id) return updatedItem
      else return item
    })
    setItems(updatedItems)
  }

  const handleItemDelete = (deletedItem) => {
    const newItems = items.filter((item)=>item.id !== deletedItem.id)
    setItems(newItems)
  }

  return (
    <div className="ShoppingList">
      <ItemForm handleNewItem={handleNewItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onItemUpdate={handleItemUpdate} onItemDelete={handleItemDelete}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
