'use client';

import { useState, useEffect } from 'react';
import { messAgent } from '../lib/agent';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [autoRecommendation, setAutoRecommendation] = useState(null);

  // Get auto recommendation on load
  useEffect(() => {
    const autoResult = messAgent('');
    setAutoRecommendation(autoResult);
    setResult(autoResult);
  }, []);

  const handleQuery = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const agentResult = messAgent(query);
      setResult(agentResult);
    }
  };

  const handleWhatsAppOrder = (mess) => {
    const message = `Hi! I would like to order from ${mess.name}. Details:\n\nPrice: ₹${mess.price}\nType: ${mess.type}\nDelivery Time: ${mess.deliveryTime} mins\nRating: ${mess.rating}⭐\n\nPlease confirm availability.`;
    const whatsappUrl = `https://wa.me/${mess.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🍽️ MessMate AI
          </h1>
          <p className="text-lg text-gray-600">Smart Mess Decision Agent</p>
        </div>

        {/* Today's AI Decision Section */}
        {autoRecommendation && autoRecommendation.bestOption && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-green-400">
            <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
              <span>🤖</span> Today's AI Decision
            </h2>
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {autoRecommendation.bestOption.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Recommended for {autoRecommendation.foodSuggestion} • {autoRecommendation.timeOfDay}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      ₹{autoRecommendation.bestOption.price}
                    </span>
                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ {autoRecommendation.bestOption.rating}
                    </span>
                    <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {autoRecommendation.bestOption.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">
                    Crowd: <span className="font-semibold capitalize">{autoRecommendation.bestOption.crowdLevel}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    Delivery: <span className="font-semibold capitalize">{autoRecommendation.bestOption.deliveryStatus}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Time: {autoRecommendation.bestOption.deliveryTime} mins
                  </div>
                  {autoRecommendation.bestOption.almostSoldOut && (
                    <div className="mt-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      ⚠️ Almost Sold Out!
                    </div>
                  )}
                  <button
                    onClick={() => handleWhatsAppOrder(autoRecommendation.bestOption)}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
                  >
                    <span>📱</span> Order via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Query Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>💬</span> Ask MessMate AI
          </h2>
          <form onSubmit={handleQuery} className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: 'I want cheap veg food' or 'fast non-veg option'"
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Search
            </button>
          </form>
          <div className="mt-3 text-sm text-gray-500">
            <strong>Tips:</strong> Use keywords like 'cheap', 'veg', 'non-veg', 'fast'
          </div>
        </div>

        {/* Mess List Section */}
        {result && result.allAvailable && result.allAvailable.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📋</span> Available Mess Options
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {result.allAvailable.map((mess) => (
                <div
                  key={mess.id}
                  className={`border-2 rounded-xl p-5 transition-all ${
                    result.bestOption && result.bestOption.id === mess.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{mess.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        mess.quantityLeft > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {mess.quantityLeft > 0 ? 'Available' : 'Sold Out'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                      ₹{mess.price}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                      ⭐ {mess.rating}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {mess.type}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {mess.deliveryTime} mins
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      Crowd Level: <span className="font-semibold capitalize">{mess.crowdLevel}</span>
                    </div>
                    <div>
                      Delivery Status: <span className="font-semibold capitalize">{mess.deliveryStatus}</span>
                    </div>
                    <div>
                      Quantity Left: <span className="font-semibold">{mess.quantityLeft}</span>
                    </div>
                    {mess.almostSoldOut && (
                      <div className="text-red-600 font-semibold mt-2">
                        ⚠️ Almost Sold Out!
                      </div>
                    )}
                  </div>

                  {result.bestOption && result.bestOption.id === mess.id && (
                    <div className="mt-3 bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      ✨ AI Recommended
                    </div>
                  )}
                  <button
                    onClick={() => handleWhatsAppOrder(mess)}
                    className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>📱</span> Order via WhatsApp
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {result && result.allAvailable && result.allAvailable.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Options Found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
