export function createElement(tag, className, text) {
    //функция для создание элементов
    let el = document.createElement(tag);
    text ? (el.innerText = text) : null;

    if (className) {
        let arr = className.split(' ');
        for (let elArr of arr) {
            el.classList.add(elArr);
        }
    }
    return el;
}

export function getDate() {
    //дата
    let d = new Date();
    return `${d.getDay()}. ${d.getMonth()}. ${d.getFullYear()}`;
}

export function getTime() {
    // время
    let d = new Date();
    return `${d.getHours()}:${
        d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
    }`;
}

export function saveData(key, obj) {
    //для сохранения
    localStorage.setItem(`${key}`, JSON.stringify(obj));
}
