let table = new Table(data, "result");
table.drawTable();
let newRow = new TableNewRow("#new-row-form", table.getHeaders(), "id");

document.querySelectorAll("input[name='inlineRadioOptions']").forEach((radio) => {

    radio.addEventListener("change", (event) => {
        let filter = new TableFilter("gender", event.target.value, "eq");
        table.filter(filter);
    });
});
$('#open-new-row-form').bind("click", (event) => {
    newRow.drawNewRowForm();
});
$('#new-row-form').on('click', '#submit', () => {
    let newRowObject = newRow.createNewRow(table.getLastId("id"));
    newRowObject ? table.addNewRow(newRowObject) : "";
});