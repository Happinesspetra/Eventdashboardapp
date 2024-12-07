import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Calendar, Users, 
         DollarSign, Speaker, Bell, Settings, Moon, Sun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Stats Card Component
const StatsCard = ({ title, value, change, isDarkMode }) => (
  <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
    hover:shadow-lg transition-shadow`}>
    <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
    <p className="text-green-500 text-sm mt-2">{change}</p>
  </div>
);

const EventDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample data
  const chartData = [
    { month: 'Jan', events: 65, revenue: 4800 },
    { month: 'Feb', events: 59, revenue: 5200 },
    { month: 'Mar', events: 80, revenue: 6100 },
    { month: 'Apr', events: 81, revenue: 6400 },
    { month: 'May', events: 56, revenue: 5800 },
    { month: 'Jun', events: 55, revenue: 5900 },
  ];

  const newsItems = [
    { id: 1, title: 'Tech Conference 2024 Registration Open', date: '2024-10-28' },
    { id: 2, title: 'New Speaker Series Announced', date: '2024-10-27' },
    { id: 3, title: 'Virtual Events Platform Update', date: '2024-10-26' },
  ];

  const events = [
    { id: 1, name: 'Digital Marketing Summit', date: '2024-11-15', attendees: 250, status: 'Upcoming' },
    { id: 2, name: 'AI & ML Conference', date: '2024-11-20', attendees: 300, status: 'Open' },
    { id: 3, name: 'Web Dev Workshop', date: '2024-11-25', attendees: 150, status: 'Upcoming' },
  ];

  // Auto-slide for news carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="p-4 flex justify-between items-center">
          {!isSidebarCollapsed && <h1 className="text-xl font-bold">EventDash</h1>}
          <button onClick={() => setSidebarCollapsed(!isSidebarCollapsed)} 
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
        
        <nav className="mt-8">
          <a href="#" className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Calendar className="h-5 w-5" />
            {!isSidebarCollapsed && <span className="ml-4">Events</span>}
          </a>
          <a href="#" className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Users className="h-5 w-5" />
            {!isSidebarCollapsed && <span className="ml-4">Attendees</span>}
          </a>
          <a href="#" className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Speaker className="h-5 w-5" />
            {!isSidebarCollapsed && <span className="ml-4">Speakers</span>}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings className="h-5 w-5" />
            </button>
            <button onClick={toggleDarkMode} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Events"
            value="156"
            change="+12% from last month"
            isDarkMode={isDarkMode}
          />
          <StatsCard 
            title="Active Speakers"
            value="48"
            change="+5% from last month"
            isDarkMode={isDarkMode}
          />
          <StatsCard 
            title="Total Attendees"
            value="2,845"
            change="+18% from last month"
            isDarkMode={isDarkMode}
          />
          <StatsCard 
            title="Revenue"
            value="$28,450"
            change="+15% from last month"
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Chart */}
        <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <h3 className="text-lg font-semibold mb-4">Event Statistics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="events" stroke="#8884d8" />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* News Carousel */}
        <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <h3 className="text-lg font-semibold mb-4">Latest News & Updates</h3>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="transition-transform duration-500" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                <div className="flex">
                  {newsItems.map((item) => (
                    <div key={item.id} className="w-full flex-shrink-0 p-4">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white dark:bg-gray-700 rounded-full shadow">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => setCurrentSlide((prev) => (prev + 1) % newsItems.length)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white dark:bg-gray-700 rounded-full shadow">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Events Table */}
        <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left p-4">Event Name</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Attendees</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} 
                    onClick={() => setSelectedEvent(event)}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <td className="p-4">{event.name}</td>
                    <td className="p-4">{event.date}</td>
                    <td className="p-4">{event.attendees}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        event.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{selectedEvent.name}</h3>
              <button onClick={() => setSelectedEvent(null)} 
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>Date:</strong> {selectedEvent.date}</p>
              <p><strong>Attendees:</strong> {selectedEvent.attendees}</p>
              <p><strong>Status:</strong> {selectedEvent.status}</p>
              <p className="text-gray-600 dark:text-gray-400">
                Additional event details and description would go here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDashboard;