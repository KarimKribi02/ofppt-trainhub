import React from 'react'
import { useState } from "react";

const formations = [
    { title: "Développement Web", startDate: "01-Mars-2024", endDate: "30-Juin-2024", location: "Casablanca", status: "Annulée" },
    { title: "Marketing Digital", startDate: "15-Mars-2024", endDate: "15-Juillet-2024", location: "Rabat", status: "Complétée" },
    { title: "Gestion de Projet", startDate: "10-Avril-2024", endDate: "10-Août-2024", location: "Marrakech", status: "En_cours" },
    { title: "Cybersécurité", startDate: "05-Mai-2024", endDate: "05-Septembre-2024", location: "Tanger", status: "Complétée" },
    { title: "Intelligence Artificielle", startDate: "20-Mai-2024", endDate: "20-Octobre-2024", location: "Fès", status: "Annulée" },
  ];

const statusColors = {
    Complétée: "bg-green-100 text-green-600",
    En_cours: "bg-yellow-100 text-yellow-600",
    Annulée: "bg-red-100 text-red-600",
};


function TableFormations() {
  return (
        <div className="overflow-x-auto  p-4 sm:ml-64">
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Titre</th>
            <th className="p-3 text-left">Date de Début</th>
            <th className="p-3 text-left">Date de Fin</th>
            <th className="p-3 text-left">Lieux</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {formations.map((f, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{f.title}</td>
              <td className="p-3">{f.startDate}</td>
              <td className="p-3">{f.endDate}</td>
              <td className="p-3">{f.location}</td>
              <td className={`p-3 rounded-md text-sm font-semibold ${statusColors[f.status]}`}>{f.status}</td>
              <td className="p-3 flex gap-2">
                <button className="bg-orange-500 text-white px-3 py-1 rounded-md">Add</button>
                <button className="bg-orange-500 text-white px-3 py-1 rounded-md">Open</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableFormations