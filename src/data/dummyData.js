export const users = [
  { id: 1, name: 'Aarav Sharma', email: 'student@hostel.com', password: 'student123', role: 'student', rollNumber: 'H2024001' },
  { id: 2, name: 'Hostel Admin', email: 'admin@hostel.com', password: 'admin123', role: 'admin' },
];

export const MEAL_TYPES = [
  { key: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { key: 'lunch', label: 'Lunch', emoji: '🍛' },
  { key: 'snacks', label: 'Evening Snacks', emoji: '☕' },
  { key: 'dinner', label: 'Dinner', emoji: '🌙' },
];

export const menus = [
  {
    id: 1,
    date: '2026-11-05',
    meals: [
      { type: 'breakfast', items: ['Aloo Paratha', 'Curd', 'Banana Shake'] },
      { type: 'lunch', items: ['Rajma Chawal', 'Roti', 'Salad', 'Gulab Jamun'] },
      { type: 'snacks', items: ['Samosa', 'Masala Chai'] },
      { type: 'dinner', items: ['Paneer Butter Masala', 'Jeera Rice', 'Dal Tadka', 'Roti'] },
    ],
  },
  {
    id: 2,
    date: '2026-11-06',
    meals: [
      { type: 'breakfast', items: ['Idli Sambar', 'Coconut Chutney'] },
      { type: 'lunch', items: ['Chole Bhature', 'Boondi Raita', 'Ice Cream'] },
      { type: 'snacks', items: ['Bread Pakora', 'Coffee'] },
      { type: 'dinner', items: ['Veg Biryani', 'Mirchi ka Salan', 'Raita'] },
    ],
  },
];

export const ratings = [
  { id: 1, student: 'Aarav Sharma', mealType: 'lunch', stars: 4, date: '2026-11-04' },
  { id: 2, student: 'Priya Verma', mealType: 'dinner', stars: 5, date: '2026-11-04' },
  { id: 3, student: 'Rohit Kumar', mealType: 'breakfast', stars: 3, date: '2026-11-04' },
  { id: 4, student: 'Priya Verma', mealType: 'lunch', stars: 2, date: '2026-11-03' },
  { id: 5, student: 'Sneha Iyer', mealType: 'snacks', stars: 4, date: '2026-11-03' },
];

export const FEEDBACK_CATEGORIES = ['Taste', 'Hygiene', 'Quantity', 'Service', 'Other'];

export const feedbacks = [
  { id: 1, student: 'Rohit Kumar', category: 'Quantity', message: 'Dinner portion size has reduced this week.', date: '2026-11-04' },
  { id: 2, student: 'Sneha Iyer', category: 'Taste', message: 'Lunch was excellent today, especially the rajma!', date: '2026-11-03' },
  { id: 3, student: 'Aarav Sharma', category: 'Hygiene', message: 'Please improve cleanliness of the tables at breakfast.', date: '2026-11-02' },
  { id: 4, student: 'Priya Verma', category: 'Service', message: 'Serving staff is very polite and quick.', date: '2026-11-02' },
  { id: 5, student: 'Rohit Kumar', category: 'Taste', message: 'Snacks are repetitive, add variety.', date: '2026-11-01' },
];

export const COMPLAINT_STATUSES = ['pending', 'in-progress', 'resolved'];

export const complaints = [
  { id: 1, student: 'Priya Verma', title: 'Cold food served at dinner', description: 'The dal and rice were cold yesterday at 8 PM.', status: 'pending', response: '', date: '2026-11-04' },
  { id: 2, student: 'Aarav Sharma', title: 'Water cooler not working', description: 'The cooler near mess hall B has been broken for 2 days.', status: 'in-progress', response: 'Maintenance has been informed.', date: '2026-11-03' },
  { id: 3, student: 'Sneha Iyer', title: 'Late breakfast timing', description: 'Breakfast often starts 15 minutes late.', status: 'resolved', response: 'New staff shift timings implemented.', date: '2026-11-01' },
];