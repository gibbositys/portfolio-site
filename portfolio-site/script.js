// Обраний фреймворк: React 18 (через CDN + Babel standalone).
// Обґрунтування: React 18 дозволяє будувати інтерфейс із незалежних функціональних компонентів за допомогою хука useState та декларативного синтаксису JSX.
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

// function renderPortfolio(works) {
//     if (!listContainer) return;
//     listContainer.innerHTML = '';

//     for (const work of works) {
//         const card = document.createElement('article');
//         card.classList.add('card');
//         card.dataset.id = work.id;

//         const title = document.createElement('h3');
//         title.textContent = work.title;

//         const img = document.createElement('img');
//         img.src = work.thumbnailUrl || 'assets/img/boss.jpg';
//         img.alt = work.title || 'Зображення роботи';
//         img.onerror = () => {
//             img.src = 'assets/img/boss.jpg'
//         };

        

//         const info = document.createElement('p');
//         if (work.id) {
//             info.textContent = `Робота №${work.id} (з API)`;
//         } else {
//             info.textContent = `Рік: ${work.year} (${work.category})`;
//         }

//         if (work.year && isRecent(work.year)) {
//             card.classList.add('recent');
//         }

//         card.append(title, img, info);
//         listContainer.append(card);
//     }

//     if (projectsCountElement) {
//         projectsCountElement.textContent = `Кількість робіт: ${works.length}`;
//     }
// }

// renderPortfolio(portfolioWorks);

// if (yearInput) {
//     yearInput.addEventListener('input', () => {
//         const enteredYear = Number(yearInput.value);
//         const currentYear = 2026;

//         if (enteredYear > currentYear) {
//             yearInput.setCustomValidity('Рік не може бути в майбутньому!');
//         } else {
//             yearInput.setCustomValidity('');
//         }
//     });
// }

// // Форма
// addProjectForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const titleInput = document.querySelector('#project-title');
//     const categorySelect = document.querySelector('#project-category');

//     const title = titleInput.value.trim();
//     const year = Number(yearInput.value);
//     const category = categorySelect.value;

//     const newWork = {
//         title: title,
//         year: year,
//         category: category
//     };

//     portfolioWorks.push(newWork);
//     renderPortfolio(portfolioWorks);

//     addProjectForm.reset();

//     if (filterCategorySelect) {
//         filterCategorySelect.value = 'all';
//     }
// });

// if (filterCategorySelect) {
//     filterCategorySelect.addEventListener('change', () => {
//         const selectedCategory = filterCategorySelect.value;
//         const cards = listContainer.querySelectorAll('.card');

//         cards.forEach(card => {
//             const cardCategory = card.dataset.category;
//             const isHidden = selectedCategory !== 'all' && cardCategory !== selectedCategory;
//             card.classList.toggle('hidden', isHidden);
//         });
//     });
// }

// const loadingStateElemnt = document.querySelector('#loading-state');

// function showLoading(isLoading) {
//     if (!loadingStateElemnt) return;
//     loadingStateElemnt.classList.toggle('hidden', !isLoading);
// }

// const errorMessageElemnt = document.querySelector('#error-message');

// function showError(message) {
//     if (!errorMessageElemnt) return;
//     if (message) {
//         errorMessageElemnt.textContent = message;
//         errorMessageElemnt.classList.remove('hidden');
//     } else {
//         errorMessageElemnt.textContent = '';
//         errorMessageElemnt.classList.add('hidden');
//     }
// }

// // Практична робота №9: Отримання робіт з API JSONPlaceholder (Варіант 2: Photos)
// // Ендпоінт: https://jsonplaceholder.typicode.com/photos?albumId=1
// const API_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=1';

// async function loadPortfolioData() {
//     showLoading(true);
//     showError('');

//     try {
//         const responce = await fetch(API_URL);

//         if (!responce.ok) {
//             if (responce.status === 404) {
//                 throw new Error('Альбом не знайдено');
//             }
//             throw new Error(`Сервер відповів кодом ${responce.status}`);
//         }

//         const data = await responce.json();
//         renderPortfolio(data);
//     } catch (error) {
//         console.error('Помилка завантаження даних:', error);

//         if (error.message === 'Альбом не знайдено') {
//             showError('Альбом не знайдено');
//         } else {
//             showError('Не вдалося завантажити дані. Спробуйте пізніше.');
//         }

//         if (listContainer) listContainer.innerHTML = '';
//         if (projectsCountElement) projectsCountElement.textContent = 'Кількість робіт: 0';
//     } finally {
//         showLoading(false);
//     }
// }

// // Кнопка повторного запиту даних
// const refreshBtn = document.querySelector('#refresh-btn');

// if (refreshBtn) {
//     refreshBtn.addEventListener('click', () => {
//         loadPortfolioData();
//     });
// }

// loadPortfolioData();

// Окремий компонент картки портфоліо
function PortfolioItem({ title, year, category, thumbnailUrl, description}) {
    // Локальний реактивний прапорець для розгортання списку
    const [expanded, setExpanded] = React.useState(false);

    return (
        <article 
        className="card"
        onClick={() => setExpanded(!expanded)}
        style={{cursor: 'pointer'}}
        >
            <h3>{title}</h3>
            <img src={thumbnailUrl} alt={title} />
            <p>Рік: {year} ({category})</p>

            {expanded && (
            <p style = {{ borderTop: '1px solid #e0e0e0', paddingTop: '0.75rem', color: '#1a1a1a'}}>
                {description}
            </p>
            )}
            <p style={{ fontWeight: 'bold', color: '#b45309'}}>
                {expanded ? '▲ Згорнути опис' : '▼ Детальніше...'}
            </p>
        </article>
    );
}

// Кореневий компонент App із реактивним станом works
function App() {
    const [works, setWorks] = React.useState([
        {
            id: 1,
            title: 'Вебсайт книжкового магазину',
            year: 2024,
            category: 'Web',
            thumbnailUrl: 'assets/img/boss.jpg',
            description: 'Адаптивний інтернет-магазин із каталогом книг, фільтрацією за жанрами та кошиком замовлень.'
        },
        {
            id: 2,
            title: 'Десктопний застосунок на C#',
            year: 2026,
            category: 'Desktop',
            thumbnailUrl: 'assets/img/boss.jpg',
            description: 'Клієнтський WPF-застосунок із патерном MVVM для візуалізації алгоритмів пошуку.'
        },
        {
            id: 3,
            title: 'Консольний трекер завдань',
            year: 2023,
            category: 'Console',
            thumbnailUrl: 'assets/img/boss.jpg',
            description: 'Швидка CLI-утиліта для планування навчальних дедлайнів та збереження історії у JSON.'
        },
        {
            id: 4,
            title: 'Редизайн мобільного застосунку',
            year: 2022,
            category: 'Design',
            thumbnailUrl: 'assets/img/boss.jpg',
            description: 'Мінімалістичний UI/UX-концепт мобільного портфоліо фотографа з акцентом на візуальний контент.'
        }
    ]);

    return (
        <div>
            <p id="projects-count">Кількість робіт: {works.length}</p>

            <div id="gallery" className="cards">
                {works.map(work => (
                    <PortfolioItem
                        key={work.id}
                        title={work.title}
                        year={work.year}
                        category={work.category}
                        thumbnailUrl={work.thumbnailUrl}
                        description={work.description}
                    />
                ))}
            </div>
        </div>
    );
}

const rootElement = document.getElementById('portfolio-app');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}