export interface Course {
  id: string;
  title: string;
  provider: string;
  subject: string;
  ageRange: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  duration: string;
  level: string;
  enrolled: number;
  gradient: string;
  icon: string;
}

export const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    title: "Creative Writing & Storytelling",
    provider: "Ms. Priya Sharma",
    subject: "English",
    ageRange: "8–12 yrs",
    rating: 4.9,
    reviewCount: 124,
    price: 2499,
    currency: "₹",
    duration: "8 weeks",
    level: "Beginner",
    enrolled: 342,
    gradient: "from-violet-500 to-purple-600",
    icon: "✍️",
  },
  {
    id: "c2",
    title: "Fun with Fractions & Decimals",
    provider: "Khan Academy Kids",
    subject: "Mathematics",
    ageRange: "9–11 yrs",
    rating: 4.8,
    reviewCount: 89,
    price: 1999,
    currency: "₹",
    duration: "6 weeks",
    level: "Intermediate",
    enrolled: 518,
    gradient: "from-blue-500 to-indigo-600",
    icon: "🔢",
  },
  {
    id: "c3",
    title: "Introduction to Robotics",
    provider: "TinkerLab Academy",
    subject: "STEM",
    ageRange: "10–14 yrs",
    rating: 4.7,
    reviewCount: 67,
    price: 3499,
    currency: "₹",
    duration: "10 weeks",
    level: "Beginner",
    enrolled: 203,
    gradient: "from-emerald-500 to-teal-600",
    icon: "🤖",
  },
  {
    id: "c4",
    title: "Watercolor Painting for Kids",
    provider: "ArtSpark Studio",
    subject: "Art",
    ageRange: "6–12 yrs",
    rating: 4.9,
    reviewCount: 156,
    price: 1799,
    currency: "₹",
    duration: "4 weeks",
    level: "All Levels",
    enrolled: 612,
    gradient: "from-rose-400 to-pink-600",
    icon: "🎨",
  },
  {
    id: "c5",
    title: "Science Experiments at Home",
    provider: "Dr. Rahul Mehta",
    subject: "Science",
    ageRange: "7–11 yrs",
    rating: 4.6,
    reviewCount: 93,
    price: 2199,
    currency: "₹",
    duration: "6 weeks",
    level: "Beginner",
    enrolled: 445,
    gradient: "from-amber-400 to-orange-500",
    icon: "🔬",
  },
  {
    id: "c6",
    title: "Public Speaking & Confidence",
    provider: "SpeakUp Academy",
    subject: "Life Skills",
    ageRange: "10–15 yrs",
    rating: 4.8,
    reviewCount: 78,
    price: 2999,
    currency: "₹",
    duration: "8 weeks",
    level: "Intermediate",
    enrolled: 189,
    gradient: "from-cyan-500 to-blue-600",
    icon: "🎤",
  },
];

export const SUBJECTS = [
  "All Subjects",
  "Mathematics",
  "English",
  "Science",
  "STEM",
  "Art",
  "Life Skills",
  "Music",
  "Languages",
];

export const AGE_RANGES = [
  "All Ages",
  "4–6 yrs",
  "6–8 yrs",
  "8–10 yrs",
  "10–12 yrs",
  "12–15 yrs",
];
