// Day 3 Mini Task: Simple Student Marks Calculator
// Rajveer - code.calmchase.com hackathon

// ek student object jiske andar marks ka array hai
const student = {
  name: "Alia",
  marks: [88, 94, 72, 85, 91] // 5 subjects ke marks
};

let totalMarks = 0;

// forEach loop se marks ko total kar raha hu, ye naya seekha hai
student.marks.forEach(mark => {
  totalMarks += mark; // ye totalMarks = totalMarks + mark; ka shortcut hai
});

const totalSubjects = student.marks.length;
// maan liya ki har subject 100 marks ka hai
const maxTotalMarks = totalSubjects * 100;
const percentage = (totalMarks / maxTotalMarks) * 100;

console.log(`Student ka Naam: ${student.name}`);
console.log(`Uske Marks: ${student.marks.join(", ")}`); // .join se array aacha dikhta hai
console.log(`Total Marks: ${totalMarks} out of ${maxTotalMarks}`);
console.log(`Percentage: ${percentage.toFixed(2)}%`); // toFixed(2) google kiya tha, decimal ke baad 2 digit ke liye. cool! 😅

// calculation to sahi lag rahi hai.
