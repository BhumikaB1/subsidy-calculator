let schemes = [];

// Load schemes.json
fetch('schemes.json')
    .then(response => response.json())
    .then(data => {
        schemes = data;
    })
    .catch(error => console.error('Error loading schemes:', error));

// Main Eligibility Check
document.getElementById("checkEligibilityBtn").addEventListener("click", function (e) {
    e.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const income = parseInt(document.getElementById("income").value);
    const land = parseFloat(document.getElementById("land").value);
    const job = document.getElementById("job").value;
    const gender = document.getElementById("gender").value;
    const outputLang = document.getElementById("outputLang").value;

    const eligibleSchemes = schemes.filter(scheme => {
        const ageMatch = age >= scheme.minAge && age <= scheme.maxAge;
        const incomeMatch = income <= scheme.maxIncome;
        const jobMatch = scheme.jobType === "Any" || scheme.jobType === job;
        const genderMatch = scheme.gender === "Any" || scheme.gender === gender;

        return ageMatch && incomeMatch && jobMatch && genderMatch;
    });

    displayResults(eligibleSchemes, outputLang);
});

// Display Results
function displayResults(schemes, lang) {
    const resultsDiv = document.getElementById("results");

    if (schemes.length === 0) {
        resultsDiv.innerHTML = "<p>No matching schemes found.</p>";
    } else {
        resultsDiv.innerHTML = "<h3>Eligible Schemes:</h3><ul>" +
            schemes.map(s => 
                `<li><strong>${s.name[lang]}</strong><br>Benefits: ${s.benefits[lang]}</li>`
            ).join('') + "</ul>";
    }
}

    
