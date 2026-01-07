'use client';

import { useState } from 'react';

export default function Home() {
  const [selectedGame, setSelectedGame] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const selectGame = (game) => {
    setSelectedGame(game);
    setResult(null);
    setError('');
  };

  const checkUID = async (e) => {
    e.preventDefault();

    if (!selectedGame) {
      setError('กรุณาเลือกเกม');
      return;
    }
    if (!uid.trim()) {
      setError('กรุณากรอก UID');
      return;
    }

    setLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await fetch('/api/check-uid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game: selectedGame, player_id: uid }),
      });

      const data = await res.json();

      if (res.ok && data.status === 200) {
        setResult(data);
      } else {
        setError(data.message || 'ไม่พบข้อมูลผู้เล่น');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            ตรวจสอบ UID
          </h1>

          <form onSubmit={checkUID}>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">เลือกเกม</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => selectGame('FREEFIRE')}
                  className={`p-4 rounded-lg shadow-md transition-all text-center ${selectedGame === 'FREEFIRE'
                    ? 'bg-orange-50 shadow-orange-200'
                    : 'bg-white hover:shadow-lg'
                    }`}
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center overflow-hidden ${selectedGame === 'FREEFIRE' ? 'bg-orange-500' : 'bg-gray-100'
                    }`}>
                    <img
                      src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/icon.png"
                      alt="Free Fire"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`font-medium text-sm ${selectedGame === 'FREEFIRE' ? 'text-orange-600' : 'text-gray-700'}`}>
                    Free Fire
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => selectGame('ROV')}
                  className={`p-4 rounded-lg shadow-md transition-all text-center ${selectedGame === 'ROV'
                    ? 'bg-purple-50 shadow-purple-200'
                    : 'bg-white hover:shadow-lg'
                    }`}
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center overflow-hidden ${selectedGame === 'ROV' ? 'bg-purple-500' : 'bg-gray-100'
                    }`}>
                    <img
                      src="https://cdn-gop.garenanow.com/gop/app/0000/100/055/icon.png"
                      alt="ROV"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`font-medium text-sm ${selectedGame === 'ROV' ? 'text-purple-600' : 'text-gray-700'}`}>
                    ROV
                  </div>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Player ID (UID)</label>
              <input
                type="text"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                placeholder="กรอก UID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:bg-blue-400"
            >
              {loading ? 'กำลังตรวจสอบ...' : 'ตรวจสอบ'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-700 font-medium mb-2">พบข้อมูลผู้เล่น</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="text-gray-500">ชื่อ:</span> {result.role}</p>
                <p><span className="text-gray-500">ID:</span> {result.account_id}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
