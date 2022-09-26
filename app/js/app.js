// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import { getDate, getTime, saveData, createElement } from './functions.js';

document.addEventListener('DOMContentLoaded', () => {
    let countTodo = 0;
    let countProgress = 0;
    let countDone = 0;

    function defaultModal() {
        modal.style.display = 'none';
        inputTitle.value = '';
        inputDescription.value = '';
        selectResponsible.value = '';
        inputTitle.style.borderColor = `var(--black)`;
        inputDescription.style.borderColor = `var(--black)`;
        selectResponsible.style.borderColor = `var(--black)`;
    }

    function renameTodo(indexArr) {
        const modalRename = createElement('div', 'modal');
        main.append(modalRename);
        const inputTitleRename = createElement(
            'input',
            'form-input form-input_title'
        );
        const inputDescriptionRename = createElement(
            'input',
            'form-input form-input_description'
        );
        const containerSelectResponsibleRename = createElement(
            'div',
            'modal__selectResponsible'
        );
        const selectResponsibleRename = createElement('select', 'form-select');
        renderSelect(users, selectResponsibleRename);

        const buttonsModalRename = createElement('div');
        const buttonCancelRename = createElement(
            'button',
            'primeBtn primeBtn_modal',
            'Cancel'
        );
        const buttonRename = createElement(
            'button',
            'primeBtn primeBtn_modal',
            'Rename'
        );

        modalRename.append(
            inputTitleRename,
            inputDescriptionRename,
            containerSelectResponsibleRename
        );
        containerSelectResponsibleRename.append(
            selectResponsibleRename,
            buttonsModalRename
        );
        buttonsModalRename.append(buttonCancelRename, buttonRename);

        modalRename.style.display = 'block';
        inputTitleRename.value = todosArr[indexArr].nameTodo;
        inputDescriptionRename.value = todosArr[indexArr].descriptionTodo;
        selectResponsibleRename.value = todosArr[indexArr].responsibleTodo;
        buttonCancelRename.addEventListener('click', (e) => {
            e.preventDefault();
            modalRename.style.display = 'none';
        });

        buttonRename.addEventListener('click', (e) => {
            e.preventDefault();
            todosArr[indexArr].nameTodo = inputTitleRename.value;
            todosArr[indexArr].descriptionTodo = inputDescriptionRename.value;
            todosArr[indexArr].responsibleTodo = selectResponsibleRename.value;
            modalRename.style.display = 'none';
            render(todosArr);
        });
    }

    const todosArr = JSON.parse(localStorage.getItem('todos')) ?? [];
    const API = 'https://jsonplaceholder.typicode.com/users';
    let users =
        JSON.parse(localStorage.getItem('users')) ?? getUsers(API, users);

    async function getUsers(url, arr) {
        try {
            let response = await fetch(url);
            arr = await response.json();
            saveData('users', arr);
        } catch (error) {
            console.log(error.message);
        }
    }

    const main = document.querySelector('#main');
    const trello = createElement('section', 'trello');
    const container = createElement('div', 'container');
    main.append(trello);
    trello.append(container);
    const trelloTitle = createElement('div', 'trello__title row');
    const trelloTitleText = createElement('h2', 'trello__title-text', 'Trello');
    const trelloTitleTime = createElement('p', 'trello__title-time', getTime());

    setInterval(function () {
        trelloTitleTime.innerText = getTime();
    }, 900);

    container.append(trelloTitle);
    trelloTitle.append(trelloTitleText, trelloTitleTime);

    const todos = createElement('form', 'trello__todos row');
    const todo = createElement('div', 'todo row col-4 col-sm-12');
    const todoHead = createElement('div', 'head head_todo');
    const todoHeadTitle = createElement('h2', 'head__title', 'Todo:');
    const todoHeadCount = createElement('span', 'head__col');
    const todoContainer = createElement('div', 'todo__container');
    const todoAdd = createElement(
        'button',
        'primeBtn primeBtn_add',
        'Add todo'
    );
    todoAdd.id = 'todoAdd';
    container.append(todos);
    todos.append(todo);
    todoHead.append(todoHeadTitle, todoHeadCount);
    todo.append(todoHead, todoContainer, todoAdd);

    const progress = createElement('div', 'progress row col-4 col-sm-12');
    const progressHead = createElement('div', 'head head_progress');
    const progressHeadTitle = createElement(
        'h2',
        'head__title',
        'In Progress:'
    );
    const progressHeadCount = createElement('span', 'head__col');
    const progressContainer = createElement('div', 'progress__container');
    todos.append(progress);
    progressHead.append(progressHeadTitle, progressHeadCount);
    progress.append(progressHead, progressContainer);

    const done = createElement('div', 'done row col-4 col-sm-12');
    const doneHead = createElement('div', 'head head_done');
    const doneHeadTitle = createElement('h2', 'head__title', 'Done:');
    const doneHeadCount = createElement('span', 'head__col');
    const doneContainer = createElement('div', 'done__container');

    const deleteAll = createElement(
        'button',
        'primeBtn primeBtn_deleteAll',
        'Delete All'
    );

    deleteAll.addEventListener('click', (e) => {
        e.preventDefault();
        modalWarning.style.display = 'block';
    });

    todos.append(done);
    doneHead.append(doneHeadTitle, doneHeadCount);
    done.append(doneHead, doneContainer, deleteAll);

    //modalAddTodo start

    const modal = createElement('div', 'modal');
    main.append(modal);
    const inputTitle = createElement('input', 'form-input form-input_title');
    inputTitle.placeholder = 'Title';
    const inputDescription = createElement(
        'input',
        'form-input form-input_description'
    );
    inputDescription.placeholder = 'Description';
    const divselectResponsible = createElement(
        'div',
        'modal__selectResponsible'
    );
    const selectResponsible = createElement('select', 'form-select');
    renderSelect(users, selectResponsible);
    selectResponsible.value = '';

    const divButtonModal = createElement('div');
    const buttonCancel = createElement(
        'button',
        'primeBtn primeBtn_modal',
        'Cancel'
    );
    const buttonConfirm = createElement(
        'button',
        'primeBtn primeBtn_modal',
        'Confirm'
    );

    modal.append(inputTitle, inputDescription, divselectResponsible);
    divselectResponsible.append(selectResponsible, divButtonModal);
    divButtonModal.append(buttonCancel, buttonConfirm);

    // end

    //modalWarningDeleteAll
    const modalWarning = createElement('div', 'modal-warning');
    const modalWarningText = createElement(
        'div',
        'modal-warning__text',
        'Warning!!!'
    );
    const buttonOkModalWarning = createElement(
        'button',
        'primeBtn primeBtn_modal',
        'Ok'
    );
    const buttonCancelModalWarning = createElement(
        'button',
        'primeBtn primeBtn_modal',
        'Cancel'
    );
    modalWarning.append(
        modalWarningText,
        buttonOkModalWarning,
        buttonCancelModalWarning
    );
    main.append(modalWarning);
    //end

    //modalWarning if CountProgress >=6
    const modalWarningCount = createElement('div', 'modal-warning');
    const modalWarningCountText = createElement(
        'div',
        'modal-warning__text',
        'A lot of tasks in progress!!!'
    );
    const buttonOkModalWarningCount = createElement(
        'button',
        'primeBtn primeBtn_modal',
        'Ok'
    );
    modalWarningCount.append(modalWarningCountText, buttonOkModalWarningCount);
    main.append(modalWarningCount);

    buttonOkModalWarningCount.addEventListener('click', () => {
        modalWarningCount.style.display = 'none';
    });
    //end

    todoAdd.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    buttonCancelModalWarning.addEventListener('click', (e) => {
        e.preventDefault();
        modalWarning.style.display = 'none';
    });

    buttonOkModalWarning.addEventListener('click', (e) => {
        e.preventDefault();
        todosArr.length = 0;
        saveData('todos', todosArr);
        render(todosArr);
        modalWarning.style.display = 'none';
    });

    buttonCancel.addEventListener('click', (e) => {
        e.preventDefault();
        defaultModal();
    });

    buttonConfirm.addEventListener('click', (e) => {
        e.preventDefault();
        if (
            inputTitle.value != '' &&
            inputDescription.value != '' &&
            selectResponsible.value != ''
        ) {
            todosArr.push({
                id: Math.random(),
                nameTodo: inputTitle.value,
                descriptionTodo: inputDescription.value,
                responsibleTodo: selectResponsible.value,
                date: getDate(),
                isDescription: false,
                isDone: false,
            });
            localStorage.setItem('todos', JSON.stringify(todosArr));
            defaultModal();
        } else {
            inputTitle.value === ''
                ? (inputTitle.style.borderColor = `var(--red)`)
                : (inputTitle.style.borderColor = `var(--black)`);
            inputDescription.value === ''
                ? (inputDescription.style.borderColor = `var(--red)`)
                : (inputDescription.style.borderColor = `var(--black)`);
            selectResponsible.value === ''
                ? (selectResponsible.style.borderColor = `var(--red)`)
                : (selectResponsible.style.borderColor = `var(--black)`);
        }
        render(todosArr);
    });

    function render(object) {
        todoContainer.innerHTML = '';
        progressContainer.innerHTML = '';
        doneContainer.innerHTML = '';
        countDone = 0;
        countTodo = 0;
        countProgress = 0;
        todoHeadCount.innerText = countTodo;
        progressHeadCount.innerText = countProgress;
        doneHeadCount.innerText = countDone;
        object.forEach((objTodo) => {
            todoCreate(objTodo);
        });
    }

    function todoCreate(objTodo) {
        const shellTodo = createElement('div', 'todo__shell');
        shellTodo.id = objTodo.id;

        const nameTodo = createElement('h2', 'todo__name', objTodo.nameTodo);
        const descriptionTodo = createElement(
            'p',
            'todo__description',
            objTodo.descriptionTodo
        );
        const userTodo = createElement(
            'p',
            'todo__user',
            objTodo.responsibleTodo
        );
        const dataTodo = createElement('p', 'todo__data', objTodo.date);
        const buttonEditTodo = createElement(
            'button',
            'button-outline button-outline_edit'
        );
        const buttonDeleteTodo = createElement(
            'button',
            'button-outline button-outline_delete'
        );
        const buttonBackTodo = createElement(
            'button',
            'button-outline button-outline_back'
        );
        const buttonInWork = createElement(
            'button',
            'button-outline button-outline_work'
        );
        const buttonComplete = createElement(
            'button',
            'button-outline button-outline_complete'
        );

        if (objTodo.isDescription === true) {
            shellTodo.append(
                nameTodo,
                descriptionTodo,
                userTodo,
                dataTodo,
                buttonBackTodo,
                buttonComplete
            );
            shellTodo.classList.add('todo__progress');
            progressContainer.append(shellTodo);
            countProgress++;
        } else {
            if (objTodo.isDone === true) {
                shellTodo.append(
                    nameTodo,
                    descriptionTodo,
                    userTodo,
                    dataTodo,
                    buttonDeleteTodo
                );
                shellTodo.classList.add('todo__done');
                doneContainer.append(shellTodo);
                countDone++;
            } else {
                shellTodo.append(
                    nameTodo,
                    descriptionTodo,
                    userTodo,
                    dataTodo,
                    buttonDeleteTodo,
                    buttonEditTodo,
                    buttonInWork
                );
                todoContainer.append(shellTodo);
                countTodo++;
            }
        }
        todoHeadCount.innerText = countTodo;
        progressHeadCount.innerText = countProgress;
        doneHeadCount.innerText = countDone;
    }

    function renderSelect(users, select) {
        users.forEach((el) => {
            let option = `<option value='${el.name}'>${el.name}</option>`;
            select.innerHTML += option;
        });
    }

    function searchIndex(eTarget) {
        let divTodo = eTarget.closest('.todo__shell');
        let todo = todosArr.find((el) => el.id === +divTodo.id);
        let indexTodo = todosArr.indexOf(todo);
        return indexTodo;
    }

    container.addEventListener('click', ({ target, tagName }) => {
        if (
            (tagName = 'BUTTON') &&
            target.classList.contains('button-outline_delete')
        ) {
            todosArr.splice(searchIndex(target), 1);
        }
        if (
            (tagName = 'BUTTON') &&
            target.classList.contains('button-outline_work')
        ) {
            if (countProgress < 6) {
                todosArr[searchIndex(target)].isDescription = true;
            } else {
                modalWarningCount.style.display = 'block';
            }
        }
        if (
            (tagName = 'BUTTON') &&
            target.classList.contains('button-outline_back')
        ) {
            todosArr[searchIndex(target)].isDescription = false;
        }

        if (
            (tagName = 'BUTTON') &&
            target.classList.contains('button-outline_complete')
        ) {
            todosArr[searchIndex(target)].isDone = true;
            todosArr[searchIndex(target)].isDescription = false;
        }

        if (
            (tagName = 'BUTTON') &&
            target.classList.contains('button-outline_edit')
        ) {
            renameTodo(searchIndex(target));
        }
        render(todosArr);
        saveData('todos', todosArr);
    });

    render(todosArr);
});
