"use client";

import React, { useState } from "react";
import { Trash2, GripVertical, Pencil, Check, X } from "lucide-react"; // icons

export default function AdditionalInfo() {
  const [infoItems, setInfoItems] = useState([
    "Confirmation will be received at time of booking",
    "Not wheelchair accessible",
    "Not wheelchair accessible",
    "Not wheelchair accessible",
    "Not wheelchair accessible",
  ]);
  const [editIndex, setEditIndex] = useState(null); // index of item being edited
  const [editText, setEditText] = useState(""); // temporary edited text

  const handleDelete = (indexToDelete) => {
    const newItems = infoItems.filter((_, index) => index !== indexToDelete);
    setInfoItems(newItems);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(infoItems[index]);
  };

  const handleSave = (index) => {
    const newItems = [...infoItems];
    newItems[index] = editText;
    setInfoItems(newItems);
    setEditIndex(null);
    setEditText("");
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Additional Info</h3>
        <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" />
      </div>

      {/* Info Items */}
      <div className="space-y-3">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 rounded-md p-3"
          >
            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="text-sm text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full mr-4"
              />
            ) : (
              <span className="text-sm text-gray-700">{item}</span>
            )}

            <div className="flex items-center space-x-2 ml-4">
              {editIndex === index ? (
                <>
                  <Check
                    className="w-4 h-4 text-green-500 cursor-pointer"
                    onClick={() => handleSave(index)}
                  />
                  <X
                    className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500"
                    onClick={handleCancel}
                  />
                </>
              ) : (
                <>
                  <Pencil
                    className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500"
                    onClick={() => handleEdit(index)}
                  />
                  <Trash2
                    className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500"
                    onClick={() => handleDelete(index)}
                  />
                  <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
