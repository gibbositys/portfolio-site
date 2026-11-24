// Обраний фреймворк: React 18 (через CDN + Babel standalone).
// Обґрунтування: React 18 дозволяє будувати інтерфейс із незалежних функціональних компонентів за допомогою хука useState та декларативного синтаксису JSX.
// Перевірка підключення скрипта
console.log('script.js підключено');

// Модель даних портфоліо з унікальним ідентифікатором id
const defaultWorks = [
    {
        id: 1,
        title: 'Вебсайт книжкового магазину',
        year: 2024,
        category: 'Web',
        imageUrl: 'assets/img/boss.jpg',
        description: 'Адаптивний інтернет-магазин із каталогом книг та кошиком замовлень.'
    },
    {
        id: 2,
        title: 'Десктопний застосунок на C#',
        year: 2026,
        category: 'Desktop',
        imageUrl: 'assets/img/boss.jpg',
        description: 'Клієнтський WPF-застосунок із патерном MVVM для візуалізації алгоритмів.'
    },
    {
        id: 3,
        title: 'Консольний трекер завдань',
        year: 2023,
        category: 'Console',
        imageUrl: 'assets/img/boss.jpg',
        description: 'CLI-утиліта для планування навчальних дедлайнів та експорту у JSON.'
    },
    {
        id: 4,
        title: 'Редизайн мобільного застосунку',
        year: 2022,
        category: 'Design',
        imageUrl: 'assets/img/boss.jpg',
        description: 'Мінімалістичний UI/UX-концепт мобільного портфоліо фотографа.'
    }
];

// Робота з localStorage
const STORAGE_KEY = 'portfolioWorks';

function saveToLocalStorage(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function loadFromLocalStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error('Пошкоджені дані в localStorage', error);
        return [];
    }
}

// Схема бази даних IndexedDB
const DB_NAME = 'PortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'works';

// Відкриття бази даних IndexedDB та створення object store у Promise
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Асинхронні CRUD-операції для об'єктного сховища IndexedDB
async function saveWork(work) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(work);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function getAllWorks() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const request = tx.objectStore(STORE_NAME).getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function deleteWork(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// Одноразова міграція даних із localStorage в IndexedDB
const MIGRATION_FLAG = 'portfolioMigrated';

async function migrateFromLocalStorage() {
    if (localStorage.getItem(MIGRATION_FLAG) === 'true') return;

    const existingWorks = await getAllWorks();
    const localWorks = loadFromLocalStorage();

    if (existingWorks.length === 0 && localWorks.length > 0) {
        for (const work of localWorks) {
            await saveWork(work);
        }
    }

    localStorage.setItem(MIGRATION_FLAG, 'true');
}

// Асинхронний рендер з IndexedDB та керування CSS-анімаціями
const listContainer = document.querySelector('#gallery');
const projectsCountElement = document.querySelector('#projects-count');
const addProjectForm = document.querySelector('#add-project-form');

// Керування станом CSS-анімації (старт/пауза через клас .animations-paused)
const toggleAnimationBtn = document.querySelector('#toggle-animation-btn');
let isAnimationPaused = false;

if (toggleAnimationBtn) {
    toggleAnimationBtn.addEventListener('click', () => {
        isAnimationPaused = !isAnimationPaused;
        if (listContainer) {
            listContainer.classList.toggle('animations-paused', isAnimationPaused);
        }
        toggleAnimationBtn.textContent = isAnimationPaused ? 'Відновити анімацію' : 'Пауза анімації';
    });
}

function showStorageError(message) {
    if (projectsCountElement) {
        projectsCountElement.textContent = message;
        projectsCountElement.style.color = '#b91c1c';
    }
}

// Відображення поточного стану з IndexedDB із каскадною появою карток
function renderPortfolio(works, newWorkId = null) {
    if (!listContainer) return;
    listContainer.innerHTML = '';

    works.forEach((work, index) => {
        const card = document.createElement('article');
        card.classList.add('card', 'card--animated');
        card.dataset.id = work.id;

        const delay = work.id === newWorkId ? 0 : Math.min(index * 0.08, 0.6);
        card.style.animationDelay = `${delay}s`;

        const title = document.createElement('h3');
        title.textContent = work.title;

        const imgWrap = document.createElement('div');
        imgWrap.classList.add('card-img-wrap');

        const img = document.createElement('img');
        img.src = work.imageUrl || 'assets/img/pug.jpg';
        img.alt = work.title;
        img.onerror = () => {
            img.src = 'assets/img/pug2.jpg';
        };
        imgWrap.append(img);

        const info = document.createElement('p');
        info.textContent = `Рік: ${work.year} (${work.category})`;

        const desc = document.createElement('p');
        desc.textContent = work.description || 'Опис проєкту портфоліо.';

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.textContent = 'Видалити';
        deleteBtn.addEventListener('click', async () => {
            try {
                await deleteWork(work.id);
                const updatedWorks = await getAllWorks();
                renderPortfolio(updatedWorks);
            } catch (error) {
                console.error('Помилка видалення з IndexedDB:', error);
                showStorageError('Не вдалося видалити запис із бази даних.');
            }
        });

        card.append(title, imgWrap, info, desc, deleteBtn);
        listContainer.append(card);
    });

    if (projectsCountElement) {
        projectsCountElement.style.color = '';
        projectsCountElement.textContent = `Кількість робіт: ${works.length}`;
    }
}

// Додавання нової роботи через форму та запуск анімації появи
if (addProjectForm) {
    addProjectForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const titleInput = document.querySelector('#project-title');
        const yearInput = document.querySelector('#project-year');
        const categorySelect = document.querySelector('#project-category');
        const descInput = document.querySelector('#project-description');

        const newWork = {
            id: Date.now(),
            title: titleInput.value.trim(),
            year: Number(yearInput.value),
            category: categorySelect.value,
            imageUrl: 'assets/img/boss.jpg',
            description: descInput ? descInput.value.trim() : 'Новий проєкт, доданий користувачем.'
        };

        try {
            await saveWork(newWork);
            const updatedWorks = await getAllWorks();
            renderPortfolio(updatedWorks, newWork.id);
            addProjectForm.reset();
        } catch (error) {
            console.error('Помилка збереження в IndexedDB:', error);
            showStorageError('Не вдалося зберегти роботу в IndexedDB.');
        }
    });
}

async function initApp() {
    try {
        await migrateFromLocalStorage();
        let works = await getAllWorks();

        if (works.length === 0) {
            for (const item of defaultWorks) {
                await saveWork(item);
            }
            works = await getAllWorks();
        }

        renderPortfolio(works);
    } catch (error) {
        console.error('Помилка відкриття IndexedDB:', error);
        showStorageError('Сховище IndexedDB недоступне у поточному режимі браузера.');
    }
}

initApp();
