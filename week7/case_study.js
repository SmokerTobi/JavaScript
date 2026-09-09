document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reg-form');
    const outputPanel = document.getElementById('output-panel');
    const outputContent = document.getElementById('output-content');
    const resetBtn = document.getElementById('reset-btn');
    const submitBtn = document.getElementById('submit-btn');

    const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
    const selects = form.querySelectorAll('select');
    const radios = form.querySelectorAll('input[type="radio"]');

    const daySelect = document.getElementById('day');
    for (let i = 1; i <= 31; i++) {
        let option = document.createElement('option');
        option.value = i; option.textContent = i;
        daySelect.appendChild(option);
    }
    const monthSelect = document.getElementById('month');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    months.forEach((m, idx) => {
        let option = document.createElement('option');
        option.value = idx + 1; option.textContent = m;
        monthSelect.appendChild(option);
    });
    const yearSelect = document.getElementById('year');
    for (let i = 2024; i >= 1990; i--) {
        let option = document.createElement('option');
        option.value = i; option.textContent = i;
        yearSelect.appendChild(option);
    }

    textInputs.forEach(input => {
        input.addEventListener('blur', (e) => {
            validateTextField(e.target);
        });
    });

    selects.forEach(select => {
        select.addEventListener('change', (e) => {
            if (['day', 'month', 'year'].includes(e.target.id)) {
                document.getElementById('dob-err').textContent = '';
            } else if (e.target.id === 'course') {
                document.getElementById('course-err').textContent = '';
            }
        });
    });

    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.getElementById('gender-err').textContent = '';
        });
    });

    form.addEventListener('reset', () => {
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        outputPanel.classList.add('hidden');
        outputContent.innerHTML = '';
        submitBtn.textContent = 'Register Student';
        submitBtn.style.backgroundColor = '';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        textInputs.forEach(input => {
            if (input.id !== 'address' && !validateTextField(input)) {
                isValid = false;
            }
        });

        if (!daySelect.value || !monthSelect.value || !yearSelect.value) {
            document.getElementById('dob-err').textContent = 'Please select your complete birthday.';
            isValid = false;
        }

        if (!document.getElementById('course').value) {
            document.getElementById('course-err').textContent = 'Please select a course.';
            isValid = false;
        }

        const genderSelected = document.querySelector('input[name="gender"]:checked');
        if (!genderSelected) {
            document.getElementById('gender-err').textContent = 'Please select a gender.';
            isValid = false;
        }

        if (isValid) {
            submitBtn.textContent = 'Registered Successfully! ✓';
            submitBtn.style.backgroundColor = 'var(--success-text)';
            
            outputPanel.classList.remove('hidden');
            outputContent.innerHTML = ''; 

            const details = [
                `Full Name: ${document.getElementById('fname').value} ${document.getElementById('lname').value}`,
                `Birthday: ${daySelect.value}/${monthSelect.value}/${yearSelect.value}`,
                `Email: ${document.getElementById('email').value}`,
                `Mobile Number: ${document.getElementById('mobile').value}`,
                `Gender: ${genderSelected.value}`,
                `Course: ${document.getElementById('course').value}`,
                `Address: ${document.getElementById('address').value}`
            ];

            const ul = document.createElement('ul');
            details.forEach(text => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${text.split(': ')[0]}:</strong> ${text.split(': ')[1] || ''}`;
                ul.appendChild(li);
            });
            outputContent.appendChild(ul);
            
            // Reset button text after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = 'Register Student';
                submitBtn.style.backgroundColor = '';
            }, 3000);
            
        } else {
            outputPanel.classList.add('hidden');
            submitBtn.textContent = 'Register Student';
            submitBtn.style.backgroundColor = '';
        }
    });

    function validateTextField(element) {
        let errorMsg = '';
        let isValid = true;
        const val = element.value.trim();

        if (element.id === 'fname' || element.id === 'lname') {
            if (val === '') {
                errorMsg = 'This field cannot be empty.';
                isValid = false;
            }
        } else if (element.id === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (val === '' || !emailPattern.test(val)) {
                errorMsg = 'Please enter a valid email address.';
                isValid = false;
            }
        } else if (element.id === 'mobile') {
            const mobilePattern = /^\d{10}$/;
            if (!mobilePattern.test(val)) {
                errorMsg = 'Mobile number must be exactly 10 digits.';
                isValid = false;
            }
        }

        const errDiv = document.getElementById(`${element.id}-err`);
        if (errDiv) {
            errDiv.textContent = errorMsg;
        }

        if (!isValid) {
            element.classList.add('error');
        } else {
            element.classList.remove('error');
        }

        return isValid;
    }
});
