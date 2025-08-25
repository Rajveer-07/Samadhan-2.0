// Day 4 Mini Task: API returning "Hello, World!"
// Rajveer - My first server... I'm a backend developer now? haha 😂

// sabse pehle http module ko import karna hai
const http = require('http');

// port number jaha server chalega
const PORT = 3000;

// server banane wala code
// ye function har request pe chalega jo server pe aayegi
const server = http.createServer((req, res) => {
  res.statusCode = 200; // matlab 'OK'
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!'); // browser pe ye dikhega
});

// server ko chalu karna hai
server.listen(PORT, () => {
  // ye message sirf mere terminal me dikhega
  console.log(`Server is running at http://localhost:${PORT}/`);
  console.log('Wow! It actually worked! Browser me jaake dekha. 🚀');
});

// terminal me 'node day4_hello_api.js' likh kar run kiya
// aur ye hamesha chalta rahega jab tak me CTRL+C na dabau.
