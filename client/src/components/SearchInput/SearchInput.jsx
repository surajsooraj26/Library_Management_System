import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchInput() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <input
        type="text"
        placeholder="Search"
        style={{
          padding: "8px 35px 8px 10px",
          borderRadius: ".5rem",
          border: "none",
          width: "200px",
          color: "#49739c",
          backgroundColor: "#e7edf4",
        }}
      />
      <FaSearch
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#49739c",
        }}
      />
    </div>
  );
}
