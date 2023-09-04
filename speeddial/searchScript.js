window.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.search-form');
    form.addEventListener('submit', redirectToURL);
});

function redirectToURL(event) {
    event.preventDefault(); // Prevent form submission

    const searchInput = document.getElementById('search');
    const input = searchInput.value.trim().toLowerCase(); // Convert to lowercase

    // Check if the input value looks like a URL
    if (/^(https?:\/\/)?[a-z\d.-]+\.[a-z]{2,}(\/.*)?$/i.test(input)) {
        if (!/^https?:\/\//i.test(input)) {
            // If the protocol is missing, prepend 'http://' to the URL
            window.location.href = `http://${input}`; // Redirect to the entered URL
        } else {
            window.location.href = input; // Redirect to the entered URL
        }
    } else if (input.startsWith('tl ')) {
	openGTranslate('tl ', input);
    } else if (input.startsWith('chem ')) {
	openChem('chem ', input)	
	} else if (input === '') {
        // No input; do nothing
    } else {
        // If it doesn't look like a URL or translate query, perform the default form submission
        event.target.submit();
    }

    searchInput.value = ''; // Clear the search input
}

function openGTranslate(keyword, input) {
    const languageText = input.substring(keyword.length).trim();
    const languageAndText = languageText.split(' ');
    if (languageAndText.length >= 2) {
        const language = languageAndText[0];
        const text = encodeURIComponent(languageAndText.slice(1).join(' '));
        const langCode = getLanguageCode(language);
        const googleTranslateUrl = `https://translate.google.com/?hl=de/&sl=${langCode}&tl=en&text=${text}`;
        window.location.href = googleTranslateUrl;
    }
}

function openChem(keyword, input) {
	const text = encodeURIComponent(input.substring(keyword.length).trim());
    const chemUrl = `https://pubchem.ncbi.nlm.nih.gov/#input_type=smiles&query=${text}`;
    window.location.href = chemUrl;
}

function getLanguageCode(language) {
    // Add more languages and their respective codes as needed
    const languageCodes = {
        english: 'en',
        turkish: 'tr',
        japanese: 'ja',
        german: 'de',
        spanish: 'es',
        hindi: 'hi',
        french: 'fr',
        arabic: 'ar',
        bengali: 'bn',
        russian: 'ru',
        portuguese: 'pt',
        indonesian: 'id',
        urdu: 'ur',
        chinese: 'zh', // Note: Mandarin Chinese has the same code as ISO 639-2
        swahili: 'sw',
        marathi: 'mr',
        telugu: 'te',
        tamil: 'ta',
        vietnamese: 'vi',
        korean: 'ko',
	italian: 'it',
        // Add more languages here
    };
    return languageCodes[language.toLowerCase()] || 'auto';
}