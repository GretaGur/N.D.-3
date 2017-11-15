class TableNewRow {
    constructor(id, properties, idColumnName) {
        this.id = id;
        this.properties = properties;
        this.idColumnName = idColumnName;
    }


    equalMethod(item) {
        return this.value == item;
    }

    drawNewRowForm() {
        $(this.id).html("");
        $.each(this.properties, (key, element) => {
            $(this.id).append($('<input></input>')
                .attr({ name: element })
                .attr({ placeholder: element })
            )
        });
        $(this.id).append($('<div></div>')
            .attr({ id: "submit" })
            .text("Submit")
        );
        $(this.id).append($('<div></div>')
            .attr({ id: "message" })
        );
    }

    createNewRow(lastId) {
        let newRowObject = this.getDataFromTheForm();
        newRowObject = this.addIdToRow(newRowObject, lastId);
        let notEmptyValues = this.validateForm(newRowObject);
        if (notEmptyValues) {
            this.resetFormInputsValue();
            this.showSuccesMessage();
            return newRowObject;
        } else {
            return false;
        }
    }

    getDataFromTheForm() {
        let newRowObject = {};
        $(`${this.id} input`).each(function () {
            newRowObject[$(this).attr("name")] = $(this).val();
        });
        return newRowObject;
    }

    addIdToRow(newRow, lastId) {
        newRow[this.idColumnName] = (lastId + 1);
        return newRow;
    }

    validateForm(newRowObject) {
        this.clearMessage();
        let isNotEmptyNames = true;
        $.each(newRowObject, (key, value) => {
            if (!value) {
                isNotEmptyNames = false;
                this.showErrorMessage(key);
            }
        });
        return isNotEmptyNames;
    }

    resetFormInputsValue() {
        $(`${this.id} input`).val('');
    }

    clearMessage() {
        $("#message").text('');
    }

    showErrorMessage(key) {
        $("#message").append(`${key} input is empty <br>`).css('color', 'red');
    }

    showSuccesMessage() {
        $("#message").text(`Row is added`).css('color', 'green');
    }
}