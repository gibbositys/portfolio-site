// Перевірка підключення скрипта
console.log('script.js підключено');

// Дані портфоліо
const portfolioWorks = [
    { title: 'Вебсайт книжкового магазину', year: 2024, category: 'Web' },
    { title: 'Десктопний застосунок на C#', year: 2026, category: 'Desktop' },
    { title: 'Консольний трекер завдань', year: 2023, category: 'Console' },
    { title: 'Редизайн мобільного застосунку', year: 2022, category: 'Design' },
];

// Функція для виведення списку робіт певної категорії через цикл for...of
function printWorksByCategory(works, targetCategory) {
    console.log(`Список робіт у категорії "${targetCategory}":`);
    for (const work of works) {
        if (work.category === targetCategory) {
            console.log(`- ${work.title} (${work.year} рік)`);
        }
    }
}

printWorksByCategory(portfolioWorks, 'Web');

// Функція для класифікації робіт за віком з використанням умовної конструкції if/else
function classifyWorksByAge(works, currentYear) {
    console.log("\nКласифікація робіт за віком:");
    for (const work of works) {
        const age = currentYear - work.year;
        if (age > 3) {
            console.log(`- ${work.title} (${work.year} рік): [Старша за 3 роки / Архівна]`);
        } else {
            console.log(`- ${work.title} (${work.year} рік): [Нова / Актуальна]`);
        }
    }
}

classifyWorksByAge(portfolioWorks, 2026);

// Стрілкова функція для перевірки, чи є робота свіжою (створеною не пізніше ніж 2 роки тому)
const isRecent = year => (2026 - year) <= 2;

console.log("\nПеревірка стрілковою функцією isRecent:");
for (const work of portfolioWorks) {
    console.log(`- ${work.title} (${work.year}): свіжа робота? -> ${isRecent(work.year)}`);
}

const listContainer = document.querySelector('#gallery');
const projectsCountElement = document.querySelector('#projects-count');
const addProjectForm = document.querySelector('#add-project-form');
const yearInput = document.querySelector('#project-year');
const filterCategorySelect = document.querySelector('#filter-category');

function renderPortfolio(works) {
    listContainer.innerHTML = '';

    for (const work of works) {
        const card = document.createElement('article');
        card.classList.add('card');
        card.dataset.year = work.year;
        card.dataset.category = work.category;

        const title = document.createElement('h3');
        title.textContent = work.title;

        const img = document.createElement('img');
        img.src = 'assets/img/boss.jpg';
        img.alt = work.title;

        const year = document.createElement('p');
        year.textContent = `Рік: ${work.year} (${work.category})`;

        if (isRecent(work.year)) {
            card.classList.add('recent');
        }

        card.append(title, img, year);
        listContainer.append(card);
    }

    if (projectsCountElement) {
        projectsCountElement.textContent = `Кількість робіт: ${works.length}`;
    }
}

renderPortfolio(portfolioWorks);

if (yearInput) {
    yearInput.addEventListener('input', () => {
        const enteredYear = Number(yearInput.value);
        const currentYear = 2026;

        if (enteredYear > currentYear) {
            yearInput.setCustomValidity('Рік не може бути в майбутньому!');
        } else {
            yearInput.setCustomValidity('');
        }
    });
}

// Форма
addProjectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleInput = document.querySelector('#project-title');
    const categorySelect = document.querySelector('#project-category');

    const title = titleInput.value.trim();
    const year = Number(yearInput.value);
    const category = categorySelect.value;

    const newWork = {
        title: title,
        year: year,
        category: category
    };

    portfolioWorks.push(newWork);
    renderPortfolio(portfolioWorks);

    addProjectForm.reset();

    if (filterCategorySelect) {
        filterCategorySelect.value = 'all';
    }
});

if (filterCategorySelect) {
    filterCategorySelect.addEventListener('change', () => {
        const selectedCategory = filterCategorySelect.value;
        const cards = listContainer.querySelectorAll('.card');

        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            const isHidden = selectedCategory !== 'all' && cardCategory !== selectedCategory;
            card.classList.toggle('hidden', isHidden);
        });
    });
}