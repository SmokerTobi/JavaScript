document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const inputs = document.querySelectorAll('.topic-input');
    const btnSaveLocal = document.getElementById('btn-save-local');
    const btnSaveSession = document.getElementById('btn-save-session');
    const btnClear = document.getElementById('btn-clear');
    const alertBtns = document.querySelectorAll('.alert-btn');

    // Storage Keys
    const LOCAL_KEY = 'seminar_schedule_local';
    const SESSION_KEY = 'seminar_schedule_session';

    // Helper: Get current data from all inputs
    function getScheduleData() {
        const data = {};
        inputs.forEach(input => {
            data[input.id] = input.value;
        });
        return data;
    }

    // Helper: Populate inputs from a data object
    function populateInputs(data) {
        if (!data) return;
        inputs.forEach(input => {
            if (data[input.id] !== undefined) {
                input.value = data[input.id];
            }
        });
    }

    // Load initial data
    function loadData() {
        const sessionData = sessionStorage.getItem(SESSION_KEY);
        const localData = localStorage.getItem(LOCAL_KEY);

        // Prioritize session storage over local storage
        if (sessionData) {
            populateInputs(JSON.parse(sessionData));
            console.log("Loaded from Session Storage");
        } else if (localData) {
            populateInputs(JSON.parse(localData));
            console.log("Loaded from Local Storage");
        }
    }

    // Event: Save to Local Storage
    btnSaveLocal.addEventListener('click', () => {
        const data = getScheduleData();
        localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
        alert("Schedule saved to Local Storage successfully.");
    });

    // Event: Save to Session Storage
    btnSaveSession.addEventListener('click', () => {
        const data = getScheduleData();
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
        alert("Schedule saved to Session Storage successfully. (Will reset if tab is closed)");
    });

    // Event: Clear Schedule
    btnClear.addEventListener('click', () => {
        // Clear DOM
        inputs.forEach(input => input.value = '');
        
        // Clear Storage
        localStorage.removeItem(LOCAL_KEY);
        sessionStorage.removeItem(SESSION_KEY);
        
        alert("Schedule and storage cleared.");
    });

    // Event: Click on topic cell (via the alert button)
    alertBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find the sibling input in the same wrapper
            const wrapper = e.target.closest('.topic-wrapper');
            const input = wrapper.querySelector('.topic-input');
            const topicName = input.value.trim();
            
            if (topicName) {
                alert(`You clicked: ${topicName}`);
            } else {
                alert("You clicked an empty topic cell. Please enter a topic first.");
            }
        });
    });

    // Initialize
    loadData();
});
