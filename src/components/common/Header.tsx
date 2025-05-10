import React from "react";

type Order = "asc" | "desc";

interface HeaderProps {
  order: Order;
  orderBy: string;
  onRequestSort: (property: string) => void;
  headCells: {
    id: string;
    label: string;
    numeric?: boolean;
  }[];
}

const Header: React.FC<HeaderProps> = ({
  order,
  orderBy,
  onRequestSort,
  headCells,
}) => {
  const createSortHandler = (property: string) => () => {
    onRequestSort(property);
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        {headCells.map((headCell) => (
          <th
            key={headCell.id}
            className={`px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider ${
              headCell.numeric ? "text-left" : "text-right"
            }`}
          >
            <button
              className="flex items-center space-x-1 focus:outline-none"
              onClick={createSortHandler(headCell.id)}
            >
              <span>{headCell.label}</span>
              {orderBy === headCell.id ? (
                <span className="ml-2">
                  {order === "desc" ? "↓" : "↑"}
                </span>
              ) : null}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
