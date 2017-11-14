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
    }

    createNewRow(lastId) {
        let newRowObject = this.getDataFromTheForm();
        newRowObject = this.addIdToRow(newRowObject, lastId);
        let notEmptyValues = this.validateForm(newRowObject);
        if (notEmptyValues) {
            this.resetFormInputsValue();
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
        let isNotEmptyNames = true;
        $.each(newRowObject, (key, value) => {
            if (!value) {
                isNotEmptyNames = false;
            }
        });
        return isNotEmptyNames;
    }

    resetFormInputsValue() {
        $(`${this.id} input`).val('');
    }
}