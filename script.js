let items = [];
let sortDirection = [];
let selectedItems = new Set();

// Fetch the CSV file (assuming it's named 'Resources.csv')
fetch('Resources.csv')
    .then(response => response.text())
    .then(csvData => {
        items = csvData.split('\n').map(row => row.split(','));
        sortDirection = new Array(items[0].length).fill(1);
        displayTable(items);
    })
    .catch(error => console.error('Error fetching CSV:', error));

function displayTable(data) {
    const table = document.getElementById('csvTable');
    table.innerHTML = '';

    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // Add an empty header for the checkbox column
    data[0].forEach((cell, index) => {
        const th = document.createElement('th');
        th.classList.add('header');
        const span = document.createElement('span');
        span.textContent = cell;
        th.appendChild(span);
        const arrow = document.createElement('span');
        arrow.textContent = ' ↑↓';
        arrow.classList.add('arrow');
        arrow.addEventListener('click', () => sortData(index));
        th.appendChild(arrow);
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    for (let i = 1; i < data.length; i++) {
        const dataRow = document.createElement('tr');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('row-checkbox');
        checkbox.checked = selectedItems.has(data[i].join(','));
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                dataRow.classList.add('selected');
                selectedItems.add(data[i].join(','));
            } else {
                dataRow.classList.remove('selected');
                selectedItems.delete(data[i].join(','));
            }
            updateClearSelectionButton();
        });
        const checkboxCell = document.createElement('td');
        checkboxCell.appendChild(checkbox);
        dataRow.appendChild(checkboxCell);
        data[i].forEach((cell, cellIndex) => {
            const td = document.createElement('td');
            if (cellIndex === 0) {
                const img = document.createElement('img');
                img.src = cell;
                img.alt = 'Thumbnail';
                img.classList.add('thumbnail');
                td.appendChild(img);
            } else {
                td.textContent = cell;
            }
            dataRow.appendChild(td);
        });
        if (selectedItems.has(data[i].join(','))) {
            dataRow.classList.add('selected');
        }
        table.appendChild(dataRow);
    }
}

function sortData(columnIndex) {
}

function exportCSV() {
}

function clearSelection() {
}

function updateClearSelectionButton() {
}

const csvFileInput = document.getElementById('csvFileInput');
csvFileInput.addEventListener('change', handleFileUpload);

const exportButton = document.getElementById('exportButton');
exportButton.addEventListener('click', exportCSV);

const clearSelectionButton = document.getElementById('clearSelectionButton');
clearSelectionButton.addEventListener('click', clearSelection);

let isTableView = true;

document.getElementById('toggleViewButton').addEventListener('click', toggleView);

function toggleView() {
    isTableView = !isTableView;
    if (isTableView) {
        document.getElementById('csvTable').style.display = '';
        document.getElementById('csvGallery').style.display = 'none';
        displayTable(items);
    } else {
        document.getElementById('csvTable').style.display = 'none';
        document.getElementById('csvGallery').style.display = '';
        displayGallery(items);
    }
}

function displayGallery(data) {
    const gallery = document.getElementById('csvGallery');
    gallery.innerHTML = '';

    for (let i = 1; i < data.length; i++) {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        data[i].forEach((cell, cellIndex) => {
            const p = document.createElement('p');
            p.textContent = data[0][cellIndex] + ': ' + cell; // Display the header label and the cell data
            if (cellIndex === 0) {
                const img = document.createElement('img');
                img.src = cell;
                img.alt = 'Thumbnail';
                img.classList.add('thumbnail');
                div.appendChild(img);
            } else {
                div.appendChild(p);
            }
        });
        gallery.appendChild(div);
    }
}
