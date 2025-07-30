// Fetch schemes from JSON
async function fetchSchemes() {
    const response = await fetch('schemes.json');
    const schemes = await response.json();
    return schemes;
}

// Get selected language
function getSelectedLanguage() {
    return document.getElementById('language').value;
}

// Get user input
function getUserInput() {
    return {
        age: parseInt(document.getElementById('age').value),
        income: parseInt(document.getElementById('income').value),
        landholding: parseFloat(document.getElementById('land').value),
        jobType: document.getElementById('job').value,
        gender: document.getElementById('gender').value
    };
}

// Check eligibility
function isEligible(scheme, userInput) {
    return (
        userInput.age >= scheme.minAge &&
        userInput.age <= scheme.maxAge &&
        userInput.income <= scheme.maxIncome &&
        (scheme.jobType === "Any" || scheme.jobType === userInput.jobType) &&
        (scheme.gender === "Any" || scheme.gender === userInput.gender)
    );
}

// Create scheme card
function createCard(scheme, language) {
    const card = document.createElement('div');
    card.className = 'scheme-card';

    const title = document.createElement('h3');
    title.textContent = scheme.name[language];

    const benefit = document.createElement('p');
    benefit.textContent = scheme.benefits[language];

    const link = document.createElement('a');
    link.href = scheme.link;
    link.target = "_blank";
    link.textContent = "Visit Scheme Website";
    link.className = 'scheme-link';

    const contact = document.createElement('p');
    contact.innerHTML = `Contact: <a href="tel:${scheme.contact}">${scheme.contact}</a>`;

    card.appendChild(title);
    card.appendChild(benefit);
    card.appendChild(link);
    card.appendChild(contact);

    return card;
}

// Display results in #results and also copy to #printSection
function displayResults(filteredSchemes, language) {
    const resultsContainer = document.getElementById('results');
    const printContainer = document.getElementById('printSection');

    resultsContainer.innerHTML = '';
    printContainer.innerHTML = '';

    if (filteredSchemes.length === 0) {
        resultsContainer.innerHTML = '<p>No matching schemes found.</p>';
        printContainer.innerHTML = '<p>No matching schemes found.</p>';
        return;
    }

    filteredSchemes.forEach(scheme => {
        const card = createCard(scheme, language);
        const printCard = card.cloneNode(true); // clone for print section
        resultsContainer.appendChild(card);
        printContainer.appendChild(printCard);
    });
}

// Check eligibility and display
async function checkEligibility() {
    const schemes = await fetchSchemes();
    const userInput = getUserInput();
    const language = getSelectedLanguage();

    const eligibleSchemes = schemes.filter(scheme => isEligible(scheme, userInput));
    displayResults(eligibleSchemes, language);
}

// Print results from #printSection
function printResults() {
    const printContents = document.getElementById('printSection').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    // Restore JS functionality
    location.reload();
}

// Event listeners
document.getElementById('checkBtn').addEventListener('click', checkEligibility);
document.getElementById('printBtn').addEventListener('click', printResults);

