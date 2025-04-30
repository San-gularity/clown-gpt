let isEnabled = false;

// Load saved state when content script initializes
chrome.storage.local.get(['copyBlockEnabled'], (result) => {
    isEnabled = result.copyBlockEnabled || false;
    disableCopyButtons();
});

// Function to disable copy functionality
function disableCopy(event) {
    if (isEnabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
        
        const roasts = [
            "Ctrl+C? More like Ctrl+Clown 🤡",
            "You miss 100% of the work you try to copy.",
            "Stealing text won't make you smarter, champ.",
            "Hope this helps... copycat 🐾.",
            "Pasting this? Embarrassing.",
            "Creative bankruptcy detected. Clipboard terminated.",
            "You copy-paste like a toddler hacks NASA.",
            "Using Ctrl+C won't Ctrl+Fix your laziness.",
            "Is your brain on read-only mode?",
            "Copying? Bold move for someone with 0% originality.",
            "You really thought that would work? That’s adorable.",
            "Paste this: ‘I don’t do real work.’",
            "This ain't StackOverflow, sweetie. Earn it.",
            "Copy again and I’m calling HR.",
            "If I had a nickel for every time you copied, I’d be rich — unlike your creativity.",
            "Even ChatGPT is judging you right now.",
            "Bruh... even Clippy had more dignity.",
            "Your clipboard called. It wants a real job.",
            "You out here plagiarizing like it’s a full-time job.",
            "Copy-paste won’t fix your imposter syndrome.",
            "Keep copying. One day you'll accidentally become competent.",
            "Your keyboard is begging you to stop the disgrace.",
            "You copy so much, GitHub thinks you're a bot.",
            "Copy-pasting won’t patch the holes in your resume.",
            "Your originality called. It’s been missing since birth.",
            "Even ChatGPT wrote its own code. What's your excuse?",
            "You’re just one copy away from replacing yourself with a rubber duck.",
            "AI isn’t your co-pilot. It’s doing all the flying while you nap.",
            "That Ctrl key should sue you for emotional abuse.",
            "You don't need a keyboard. You need a conscience.",
            "How does it feel to outsource your thoughts 24/7?",
            "Copy again and I’ll replace your clipboard with your search history.",
            "You’ve copied so much, your clipboard has Stockholm syndrome.",
            "You treat originality like it’s a premium feature.",
            "If copying were a skill, you'd still be unemployed.",
            "Your idea of innovation is Ctrl+V with flair.",
            "You copy code like it’s an unpaid internship.",
            "I’d say ‘nice try’ — but that would imply effort.",
            "Not even ChatGPT wants to be associated with this theft."
        ];
        const roast = roasts[Math.floor(Math.random() * roasts.length)];

        if (event.clipboardData) {
            event.clipboardData.setData('text/plain', roast);
        } else if (window.clipboardData) {
            window.clipboardData.setData('Text', roast);
        }

        return false;
    }
}

// Function to disable copy button
function disableCopyButtons() {
    const copyButtons = document.querySelectorAll('button[aria-label="Copy"]');
    copyButtons.forEach(button => {
        if (isEnabled) {
            button.style.display = 'none';
        } else {
            button.style.display = 'flex';
        }
    });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleCopyBlock') {
        isEnabled = request.enabled;
        
        disableCopyButtons();
        sendResponse({status: 'success'});
    }
});

// Add event listeners for copy events
document.addEventListener('copy', disableCopy, true);
document.addEventListener('cut', disableCopy, true);
document.addEventListener('contextmenu', disableCopy, true);

// Create a MutationObserver to handle dynamically added copy buttons
const observer = new MutationObserver(() => {
    disableCopyButtons();
});

// Start observing the document for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial check for copy buttons
disableCopyButtons(); 