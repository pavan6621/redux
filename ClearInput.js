import React, { useState } from "react";

function ClearInput() {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleCancelClick = () => {
    // Clear the input field by setting the state to an empty string
    setText("");
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  );
}

export default ClearInput;
