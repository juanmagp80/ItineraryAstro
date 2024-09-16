import { useState } from "react";
import "../styles/global.css";


function ItineraryForm() {
    const [itinerary, setItinerary] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const city = data.get("city");
        const days = data.get("days");

        const response = await fetch("/api/generate-itinerary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city, days }),
        });

        const itineraryData = await response.json();
        setItinerary(itineraryData.itinerary);
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ciudad:</label>
                    <input
                        type="text"
                        name="city"
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Días:</label>
                    <input
                        type="number"
                        name="days"
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Generar Itinerario
                    </button>
                </div>
            </form>

            {itinerary && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md shadow">
                    <h2 className="text-lg font-semibold text-green-700">Itinerario Generado:</h2>
                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{itinerary}</p>
                </div>
            )}
        </div>
    );
}

export default ItineraryForm;
