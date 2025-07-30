
async function fetchSchemes() {
    const response = await fetch('schemes.json');
    const schemes = await response.json();
    return schemes;
}

function getSelectedLanguage() {
    return document.getElementById('language').value;
}

function getUserInput() {
    return {
        age: parseInt(document.getElementById('age').value),
        income: parseInt(document.getElementById('income').value),
        landholding: parseFloat(document.getElementById('land').value),
        jobType: document.getElementById('job').value,
        gender: document.getElementById('gender').value
    };
}

function isEligible(scheme, userInput) {
    return (
        userInput.age >= scheme.minAge &&
        userInput.age <= scheme.maxAge &&
        userInput.income <= scheme.maxIncome &&
        (scheme.jobType === "Any" || scheme.jobType === userInput.jobType) &&
        (scheme.gender === "Any" || scheme.gender === userInput.gender)
    );
}

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

function displayResults(filteredSchemes, language) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (filteredSchemes.length === 0) {
        resultsContainer.innerHTML = '<p>No matching schemes found.</p>';
        return;
    }

    filteredSchemes.forEach(scheme => {
        const card = createCard(scheme, language);
        resultsContainer.appendChild(card);
    });
}

async function checkEligibility() {
    const schemes = await fetchSchemes();
    const userInput = getUserInput();
    const language = getSelectedLanguage();

    const eligibleSchemes = schemes.filter(scheme => isEligible(scheme, userInput));
    displayResults(eligibleSchemes, language);
}

// Event Listener
document.getElementById('checkBtn').addEventListener('click', checkEligibility);
function printResults() {
    const printContents = document.getElementById('printSection').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    // Optional: reload to restore event listeners and full layout
    location.reload();
}

    
