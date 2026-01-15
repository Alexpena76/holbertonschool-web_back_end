const http = require('http');
const fs = require('fs').promises;

const countStudents = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    // Remove header line
    const students = lines.slice(1);
    const total = students.length;

    let output = `Number of students: ${total}`;

    // Group students by field
    const fields = {};
    for (const student of students) {
      const parts = student.split(',');
      const firstName = parts[0];
      const field = parts[3];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    }

    // Add field-specific output
    for (const [field, names] of Object.entries(fields)) {
      output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
    }

    return output;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const databasePath = process.argv[2];
      const studentData = await countStudents(databasePath);
      res.end(`This is the list of our students\n${studentData}`);
    } catch (error) {
      res.end(`This is the list of our students\n${error.message}`);
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);

module.exports = app;
