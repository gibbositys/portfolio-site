// Перевірка підключення скрипта
console.log('script.js підключено');

// Дані портфоліо
const portfolioWorks = [
    { title: 'Вебсайт книжкового магазину', year: 2024, category: 'Web' },
    { title: 'Десктопний застосунок на C#', year: 2026, category: 'Desktop' },
    { title: 'Консольний трекер завдань', year: 2023, category: 'Console' },
    { title: 'Редизайн мобільного застосунку', year: 2022, category: 'Design' },
]

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

console.log ("\nПеревірка стрілковою функцією isRecent:");
for (const work of portfolioWorks) {
    console.log(`- ${work.title} (${work.year}): свіжа робота? -> ${isRecent(work.year)}`);
}