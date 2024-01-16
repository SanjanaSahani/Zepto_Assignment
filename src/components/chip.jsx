import React, { useState, useEffect, useRef } from "react";
import { items } from "../assets/data";

const ChipsInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);

  const filterItems = (input) => {
    setFilteredItems(
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.email.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterItems(value);
  };

  const handleItemSelect = (item) => {
    setChips((prevChips) => [
      ...prevChips,
      { id: prevChips.length + 1, ...item },
    ]);
    setInputValue("");
    filterItems("");
  };

  const handleChipRemove = (chipId) => {
    setChips((prevChips) => prevChips.filter((chip) => chip.id !== chipId));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      setInputValue(lastChip.name);
      handleChipRemove(lastChip.id);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chips]);

  return (
    <div className="flex flex-col gap-4 w-[55%] mx-auto">
      <div className="flex flex-wrap gap-4 ">
        {chips &&
          chips.map((chip) => (
            <div
              key={chip.id}
              className="bg-gray-300 flex h-10 pr-2 rounded-full items-center"
            >
              <div>
                {" "}
                <img
                  className=" h-10 w-10 rounded-l-full mr-2"
                  src={chip.image}
                  alt="image"
                />
              </div>
              <p>{chip.name}</p>
              <p
                onClick={() => handleChipRemove(chip.id)}
                className="  bg-gray-300 pl-6 mr-2 cursor-pointer text-black hover:border-none"
              >
                X
              </p>
            </div>
          ))}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Add new users..."
            className="p-2  min-w-[55%]  rounded outline-none "
          />
        </div>
      </div>

      <hr className="border-b-2 border-purple-700  w-full w-max-content mx-auto" />
      <ul className="list-none p-0 m-0 max-h-32 overflow-y-auto mx-auto w-full ">
        {filterItems &&
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemSelect(item)}
              className="cursor-pointer p-2 hover:bg-gray-100 flex w-full bg-white justify-start content-center text-center "
            >
              <img className="h-8 w-8 rounded-full" src={item.image} />
              <p className="pl-6">{item.name}</p>
              <p className="pl-8">{item.email}</p>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ChipsInput;
