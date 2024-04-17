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

function exportCSV() {
    const title = document.getElementById('titleInput').value;
    const contactPerson = document.getElementById('contactPersonInput').value;
    const startDateTime = document.getElementById('startDateTimeInput').value;
    const endDateTime = document.getElementById('endDateTimeInput').value;
    const selectedRows = Array.from(selectedItems).map(item => item.split(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + `Title,${title}\nContact Person,${contactPerson}\nStart Date & Time,${startDateTime}\nEnd Date & Time,${endDateTime}\nNumber of Items Selected,${selectedRows.length}\n` + [items[0], ...selectedRows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();
}

function clearSelection() {
    selectedItems.clear();
    displayTable(items);
    updateClearSelectionButton();
}

function updateClearSelectionButton() {
    const clearSelectionButton = document.getElementById('clearSelectionButton');
    clearSelectionButton.textContent = `Clear Selection (${selectedItems.size})`;
    if (selectedItems.size > 0) {
        clearSelectionButton.classList.add('amber');
    } else {
        clearSelectionButton.classList.remove('amber');
    }
}

const csvFileInput = document.getElementById('csvFileInput');
csvFileInput.addEventListener('change', handleFileUpload);

const exportButton = document.getElementById('exportButton');
exportButton.addEventListener('click', exportCSV);

const clearSelectionButton = document.getElementById('clearSelectionButton');
clearSelectionButton.addEventListener('click', clearSelection);

/* Add your existing JavaScript here */

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
