import React from 'react';

const guests = [
  { id: '#0101', name: 'George R.R Martin', email: 'George@gmail.com', bookDate: 'Oct 28th, 2020', noGuest: '4 Adults, 2 Kids' },
  { id: '#0103', name: 'Markus Suzak', email: 'Markus@gmail.com', bookDate: 'Oct 28th, 2020', noGuest: '2 Adult, 0 Kid' },
  { id: '#0112', name: 'Ankur Warikoo', email: 'Ankur@gmail.com', bookDate: 'Oct 28th, 2020', noGuest: '2 Adults, 0 Kid' },
  { id: '#0231', name: 'George R.R Martin', email: 'Martin@gmail.com', bookDate: 'Oct 28th, 2020', noGuest: '2 Adults, 1 Kids' },
  { id: '#0231', name: 'Ankur Warikoo', email: 'Ankur@gmail.com', bookDate: 'Oct 28th, 2020', noGuest: '3 Adults, 0 Kid' },
  { id: '#0231', name: 'Ankur Warikoo', email: 'Ankur@gmail.com', bookDate: 'Oct 28th, 2020', noGuest: '3 Adults, 2 Kids' },
];

export default function GuestTable() {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-auto">
      <h3 className="text-lg font-semibold mb-4">Guest List</h3>
      <table className="w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Guest Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Book Date</th>
            <th className="p-3">No. Guest</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{guest.id}</td>
              <td className="p-3">{guest.name}</td>
              <td className="p-3">{guest.email}</td>
              <td className="p-3">{guest.bookDate}</td>
              <td className="p-3">{guest.noGuest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
