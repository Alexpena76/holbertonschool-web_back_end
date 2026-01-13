const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');

      // Remove header line
      const students = lines.slice(1);

      console.log(`Number of students: ${students.length}`);

      // Group students by field
      const fields = {};

      students.forEach((student) => {
        const columns = student.split(',');
        const firstName = columns[0];
        const field = columns[3];

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      });

      // Log each field
      for (const field in fields) {
        if (Object.hasOwnProperty.call(fields, field)) {
          console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
        }
      }

      resolve();
    });
  });
}

module.exports = countStudents;
