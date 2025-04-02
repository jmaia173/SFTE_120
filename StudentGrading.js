function calculateGrades(row) {
    let grades = Array.from(row.querySelectorAll('.grade')).map(input => parseFloat(input.value) || 0);
    let total = grades.reduce((sum, grade) => sum + grade, 0);
    let percentage = (total / 600) * 100;
    let gpa = ((percentage / 100) * 4).toFixed(2);
    let letterGrade = getLetterGrade(percentage);
    
    row.querySelector('.total').innerText = total;
    row.querySelector('.percentage').innerText = percentage.toFixed(2) + '%';
    row.querySelector('.gpa').innerText = gpa;
    row.querySelector('.letterGrade').innerText = letterGrade;
    
    updateClassAverage();
}

function getLetterGrade(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
}

function addStudent() {
    let table = document.getElementById('gradesTable');
    let newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td><input type="text" class="studentName"></td>
        <td><input type="number" class="grade" oninput="calculateGrades(this.closest('tr'))"></td>
        <td><input type="number" class="grade" oninput="calculateGrades(this.closest('tr'))"></td>
        <td><input type="number" class="grade" oninput="calculateGrades(this.closest('tr'))"></td>
        <td><input type="number" class="grade" oninput="calculateGrades(this.closest('tr'))"></td>
        <td><input type="number" class="grade" oninput="calculateGrades(this.closest('tr'))"></td>
        <td><input type="number" class="grade" oninput="calculateGrades(this.closest('tr'))"></td>
        <td class="total">-</td>
        <td class="percentage">-</td>
        <td class="gpa">-</td>
        <td class="letterGrade">-</td>
        <td><button onclick="calculateGrades(this.closest('tr'))">Calculate Grades</button></td>
    `;
    
    table.appendChild(newRow);
}

function updateClassAverage() {
    let rows = Array.from(document.querySelectorAll('#gradesTable tr'));
    let totalScores = { math: 0, science: 0, english: 0, socialScience: 0, pe: 0, spanish: 0, total: 0, percentage: 0, gpa: 0 };
    let numStudents = rows.length;
    let totalPercentage = 0;
    
    rows.forEach(row => {
        let grades = Array.from(row.querySelectorAll('.grade')).map(input => parseFloat(input.value) || 0);
        let total = grades.reduce((sum, grade) => sum + grade, 0);
        let percentage = (total / 600) * 100;
        let gpa = ((percentage / 100) * 4).toFixed(2);
        totalScores.math += grades[0];
        totalScores.science += grades[1];
        totalScores.english += grades[2];
        totalScores.socialScience += grades[3];
        totalScores.pe += grades[4];
        totalScores.spanish += grades[5];
        totalScores.total += total;
        totalScores.percentage += percentage;
        totalScores.gpa += parseFloat(gpa);
        totalPercentage += percentage;
    });

    document.getElementById('avgMath').innerText = (totalScores.math / numStudents).toFixed(2);
    document.getElementById('avgScience').innerText = (totalScores.science / numStudents).toFixed(2);
    document.getElementById('avgEnglish').innerText = (totalScores.english / numStudents).toFixed(2);
    document.getElementById('avgSocialScience').innerText = (totalScores.socialScience / numStudents).toFixed(2);
    document.getElementById('avgPE').innerText = (totalScores.pe / numStudents).toFixed(2);
    document.getElementById('avgSpanish').innerText = (totalScores.spanish / numStudents).toFixed(2);
    document.getElementById('avgTotal').innerText = (totalScores.total / numStudents).toFixed(2);
    document.getElementById('avgPercentage').innerText = (totalScores.percentage / numStudents).toFixed(2) + '%';
    document.getElementById('avgGPA').innerText = (totalScores.gpa / numStudents).toFixed(2);
    document.getElementById('avgLetterGrade').innerText = getLetterGrade(totalPercentage / numStudents);
}
