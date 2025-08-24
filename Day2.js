
// Day 2 Mini Task: Find highest marks from an array
// code.calmchase.com - Rajveer

// kuch subjects ke marks daal diye array me
const marks = [85, 92, 78, 99, 89, 95];

// maan lete hain ki pehla mark hi sabse zyada hai, abhi ke liye
let highestMarks = marks[0];

// ab loop se sabko check karenge
// i ko 1 se start kiya kyuki 0 wala to already le liya hai
for (let i = 1; i < marks.length; i++) {
  if (marks[i] > highestMarks) {
    highestMarks = marks[i]; // agar koi bada number mil gaya to isko update kar do
  }
}

console.log("Marks ki list:", marks);
console.log("Inme se sabse zyada marks hain:", highestMarks); // 99 aana chahiye
// Yes! 99 aa gaya. Chal gaya code! 🥳
