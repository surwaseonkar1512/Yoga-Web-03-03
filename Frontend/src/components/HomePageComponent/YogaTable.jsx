import React from "react";
import { motion } from "framer-motion";

const schedule = [
  {
    day: "Monday",
    sessions: [
      { time: "06:00 - 07:00", name: "Yoga Sculpt", instructor: "George" },
      { time: "06:00 - 07:00", name: "Hatha Yoga", instructor: "Jhony Sha" },
      { time: "12:00 - 13:00", name: "Hatha Yoga", instructor: "Jhony Sha" },
      { time: "18:00 - 19:00", name: "Hatha Yoga", instructor: "Jhony Sha" },
    ],
  },
  {
    day: "Tuesday",
    sessions: [
      { time: "05:00 - 06:00", name: "Hatha Yoga", instructor: "Jhony Sha" },
      { time: "07:00 - 08:00", name: "Hatha Yoga", instructor: "Jhony Sha" },
      { time: "09:00 - 10:00", name: "Baddha Yoga", instructor: "Martin Loo" },
      { time: "14:00 - 15:00", name: "Baddha Yoga", instructor: "Martin Loo" },
    ],
  },
  {
    day: "Wednesday",
    sessions: [
      { time: "08:00 - 09:00", name: "Yoga Sculpt", instructor: "George" },
      { time: "10:00 - 11:00", name: "Hatha Yoga", instructor: "Jhony Sha" },
      { time: "13:00 - 14:00", name: "Yoga Sculpt", instructor: "George" },
      { time: "18:00 - 19:00", name: "Baddha Yoga", instructor: "Martin Loo" },
    ],
  },
  {
    day: "Thursday",
    sessions: [
      { time: "06:00 - 07:00", name: "Baddha Yoga", instructor: "Martin Loo" },
      { time: "11:00 - 12:00", name: "Baddha Yoga", instructor: "Martin Loo" },
      { time: "12:00 - 13:00", name: "Hatha Yoga", instructor: "Jhony Sha" },
      { time: "17:00 - 18:00", name: "Yoga Sculpt", instructor: "George" },
    ],
  },
  {
    day: "Friday",
    sessions: [
      { time: "06:00 - 07:00", name: "Baddha Yoga", instructor: "Martin Loo" },
      { time: "11:00 - 12:00", name: "Baddha Yoga", instructor: "Martin Loo" },
      { time: "12:00 - 13:00", name: "Hatha Yoga", instructor: "Jhony Sha" },
      { time: "17:00 - 18:00", name: "Yoga Sculpt", instructor: "George" },
    ],
  },
];
// Find your preferred class time
const YogaScheduleTable = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <div className="text-center mb-12">
        <span className="px-4 py-2 bg-green-800 text-white font-semibold rounded-full">
          TIME TABLE
        </span>
        <h2 className="text-4xl font-bold mt-4">Set Your Schedules</h2>
      </div>{" "}
      <div className="w-full overflow-x-auto p-6">
        <motion.table
          className="w-full border-collapse shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
              {schedule.map((day, index) => (
                <th
                  key={index}
                  className="p-4 text-lg font-semibold text-center border border-gray-300"
                >
                  {day.day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {schedule.map((day, index) => (
                <td
                  key={index}
                  className="border border-gray-300 md:p-4 p-1 align-top bg-gray-50"
                >
                  {day.sessions.map((session, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center justify-start mb-4 md:p-4 p-1  transition duration-300 transform hover:scale-105"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.2, duration: 0.6 }}
                    >
                      <p className="font-normal md:text-sm text-[8px] text-green-800">
                        {session.time}
                      </p>
                      <p className="text-gray-900 md:text-xl text-[10px] font-extrabold">
                        {session.name}
                      </p>
                      <p className="text-[8px] text-gray-500">
                        {session.instructor}
                      </p>
                    </motion.div>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default YogaScheduleTable;
