'use client';

import { useEffect, useState } from 'react';

interface CheckInDay {
    date: Date;
    checkedIn: boolean;
}

export default function CheckInCalendar() {
    const [days, setDays] = useState<CheckInDay[]>([]);

    useEffect(() => {
        // Generate last 30 days
        const today = new Date();
        const generatedDays: CheckInDay[] = [];

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            // Simulate check-in pattern (75% success rate for demo)
            const checkedIn = Math.random() > 0.25;
            generatedDays.push({ date, checkedIn });
        }

        setDays(generatedDays);
    }, []);

    const getDayName = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    const getDateNumber = (date: Date) => {
        return date.getDate();
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    return (
        <div className="glass rounded-2xl p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    📅 Check-In History
                </h2>
                <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
            </div>

            <div className="grid grid-cols-10 gap-2">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className="group relative"
                        title={`${day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${day.checkedIn ? 'Checked in ✓' : 'Missed'}`}
                    >
                        <div className={`aspect-square rounded-lg border transition-all duration-300 ${day.checkedIn
                                ? 'bg-green-500/20 border-green-500/40 hover:bg-green-500/30'
                                : 'bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/20'
                            } ${isToday(day.date) ? 'ring-2 ring-blue-500' : ''
                            } hover:scale-110`}>
                            <div className="flex items-center justify-center h-full">
                                {day.checkedIn ? (
                                    <span className="text-green-400 text-sm">✓</span>
                                ) : (
                                    <span className="text-gray-600 text-xs">{getDateNumber(day.date)}</span>
                                )}
                            </div>
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/40" />
                        <span className="text-gray-400">Checked in</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gray-500/10 border border-gray-500/20" />
                        <span className="text-gray-400">Missed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border-2 border-blue-500" />
                        <span className="text-gray-400">Today</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
