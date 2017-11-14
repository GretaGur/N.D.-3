class Table {
    constructor(data, tableId) {
        this.data = data;
        this.table = document.getElementById(tableId);
        this.headers = this.getHeaders();
        this.filters = [];
    }

    drawTable(updatedData) {
        this.resetTable();
        this.drawHeaders();
        this.drawRows(updatedData || this.data);
    }

    getHeaders() {
        let headers = [];
        this.data.forEach(dataItem => {
            let keys = Object.keys(dataItem);
            keys.forEach(key => {
                if (headers.indexOf(key) === -1) {
                    headers.push(key);
                }
            });
        });

        return headers;
    }

    resetTable() {
        this.table.innerHTML = "";
    }

    drawHeaders() {
        let row = document.createElement('tr');

        this.headers.forEach(element => {
            let cell = document.createElement('th');
            cell.innerText = element;
            row.appendChild(cell);
        });

        this.table.appendChild(row);
    }

    drawRow(dataItem) {
        let tr = document.createElement('tr');

        this.headers.forEach(key => {
            let cell = document.createElement('td');
            cell.innerText = dataItem[key] || "";
            tr.appendChild(cell);
        });

        this.table.appendChild(tr);
    }

    drawRows(data) {
        data.forEach(dataItem => {
            this.drawRow(dataItem);
        });
    }

    filter(filter) {
        this.filters[filter.name] = filter;

        let filteredData = this.data.filter((dataItem) => {
            return filter.operatorMethod(dataItem[filter.name]);
        });

        this.drawTable(filteredData);
    }

    getLastId(idName) {
        let lastId = 0;
        $.each(this.data, (key, dataItem) => {
            (dataItem.id > lastId) ? lastId = dataItem.id : "";
        });
        return lastId;
    }

    addNewRow(newRow) {
        let supplementData = this.addNewRowToData(newRow);
        this.drawTable(supplementData);
    }

    addNewRowToData(newRow) {
        let supplementData = this.data;
        supplementData.push(newRow);
        return supplementData;
    }
}