document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const statusText = document.getElementById('status');

    // Load saved state
    chrome.storage.local.get(['copyBlockEnabled'], (result) => {
        toggleSwitch.checked = result.copyBlockEnabled || false;
        updateStatus(toggleSwitch.checked);
    });

    // Handle toggle changes
    toggleSwitch.addEventListener('change', () => {
        const isEnabled = toggleSwitch.checked;
        
        // Save state
        chrome.storage.local.set({ copyBlockEnabled: isEnabled });
        
        // Update status text
        updateStatus(isEnabled);

        // Send message to content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].url.includes('chatgpt.com')) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'toggleCopyBlock',
                    enabled: isEnabled
                });
            }
        });
    });

    function updateStatus(isEnabled) {
        statusText.textContent = `Copy Blocking: ${isEnabled ? 'On' : 'Off'}`;
    }
}); 