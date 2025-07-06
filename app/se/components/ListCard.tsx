"use client";

import { useState } from "react";

interface Props {
  title: string;
  endpoint: string;
}

export default function ListCard({ title, endpoint }: Props) {
  const [items, setItems] = useState<string[]>([]);

  const fetchItems = async () => {
    const res = await fetch(endpoint);
    const data = await res.json();
    setItems(data);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <button onClick={fetchItems} className="bg-green-500 text-white px-4 py-2 rounded">Fetch</button>
      <ul className="mt-3 list-disc list-inside text-sm">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}
