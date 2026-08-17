const fs = require('fs');
const path = require('path');

const subjects = ['Mathematics', 'Science', 'English', 'Coding', 'Art', 'Music', 'Life Skills'];
const images = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop', // study
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop', // classroom
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop', // math
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop', // science lab
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop', // books
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop', // tech/circuit
  'https://images.unsplash.com/photo-1453733190371-0a9ef868bf03?q=80&w=600&auto=format&fit=crop', // creative/art
  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=600&auto=format&fit=crop', // music
];

const generateCourses = () => {
  const courses = [];
  for (let i = 1; i <= 40; i++) {
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const minGrade = Math.floor(Math.random() * 8) + 1; 
    const maxGrade = minGrade + Math.floor(Math.random() * 4);
    
    courses.push({
      id: `course_${i}`,
      name: `${subject} Masterclass ${i}: Fundamentals to Advanced`,
      subject: subject,
      grade: [minGrade, maxGrade], // Array representing range [min, max]
      price: Math.floor(Math.random() * 5000) + 999, // 999 to 5999
      teacherName: `Teacher ${String.fromCharCode(64 + (i % 26 + 1))}.`,
      teacherRating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 to 5.0
      description: `An engaging and comprehensive course on ${subject} tailored for grades ${minGrade}-${maxGrade}.`,
      imageUrl: images[i % images.length]
    });
  }
  return courses;
};

const data = generateCourses();
fs.writeFileSync(path.join(__dirname, 'data', 'courses.json'), JSON.stringify(data, null, 2));
console.log("Successfully generated courses.json");
