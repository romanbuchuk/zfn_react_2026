let count = 1;

function subscribeToEvents(){
    const actionButton = document.querySelector('#action-btn');
    actionButton?.addEventListener('click', handleClick);

    console.log('--------- subscribeToEvents ---------');
}

function handleClick() {
    const ulElement = document.querySelector('#list');
    const liElement = document.createElement('li');

    // liElement.textContent = 'New Item ' + count;
    liElement.textContent = `New Item ${count}`;
    ulElement?.appendChild(liElement);

    // count = count + 1;
    // count += 1;
    count++;
}

subscribeToEvents();