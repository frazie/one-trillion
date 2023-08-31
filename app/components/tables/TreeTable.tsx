'use client'

import React from 'react';

type UserTree = {
  name: string;
  numTrees: number;
};

interface TreeTableProps {
  userTrees: UserTree[];
}

const TreeTable: React.FC<TreeTableProps> = ({ userTrees }) => {
    const sortedUserTrees = userTrees.slice().sort((a, b) => b.numTrees - a.numTrees);
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <table className="min-w-full w-full">
        <thead>
          <tr>
          <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Number of Trees
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {sortedUserTrees.map((user, index) => (
            <tr key={user.name}>
                 <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {user.numTrees}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TreeTable;