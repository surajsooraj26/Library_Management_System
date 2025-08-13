// BookCard.jsx
import React from "react";
import "./BookCard.css"; // styling for consistent card & image size

export default function BookCard({ title, author, cover }) {
  return (
    <div className="book-card">
      <img src={cover} alt={title} />
      <div className="book-info">
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
    </div>
  );
}
