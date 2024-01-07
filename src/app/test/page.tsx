import React from "react";

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

const App = () => {
  const isOdd = items.length % 2 !== 0;

  return (
    <div className="flex justify-center flex-wrap">
      {items.map((item, index) => (
        <div key={index} className="w-full sm:w-1/2 p-2">
          <div className="bg-gray-200 p-4 rounded-md">
            <p className="text-center">{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
