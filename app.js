document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habitForm');
    const habitInput = document.getElementById('habitInput');
    const habitList = document.getElementById('habitList');

    let habits = JSON.parse(localStorage.getItem('habits')) || [];

    function renderHabits() {
        habitList.innerHTML = '';
        habits.forEach((habit, index) => {
            const habitItem = document.createElement('div');
            habitItem.className = `habit ${habit.completed ? 'completed' : ''}`;

            habitItem.innerHTML = `
            <span>${habit.name}</span>
            <button class="complete-btn" data-index="${index}">${habit.completed ? 'Reset' : 'Complete'}</button>`;

            habitList.appendChild(habitItem);
        });
    }

    function addHabit(habit) {
        habits.push({name: habit, completed: false});
        saveHabits();
        renderHabits();
    }

    function toggleHabit(index) {
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    habitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const habit = habitInput.ariaValueMax.trim();
        if(habit){
            addHabit(habit);
            habitInput.value = '';
        }
    });

    habitList.addEventListener('click', (e) => {
        if(e.target.classList.contains('complete-btn')) {
            const index = e.target.dataset.index;
            toggleHabit(index);
        }
    });

    renderHabits();
});