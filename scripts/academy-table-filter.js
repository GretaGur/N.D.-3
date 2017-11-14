class TableFilter {
    constructor(name, value, operator) {
        this.name = name;
        this.value = value;
        this.operator = operator;

        this.methods =
            {
                eq: this.equalMethod,
                ct: "",
                lt: "",
                gt: this.greaterThanMethod
            };

        this.operatorMethod = this.assignMethod();
    }

    assignMethod() {
        return this.methods[this.operator];
    }

    equalMethod(item) {
        return this.value == item;
    }

    greaterThanMethod(item) {
        return this.value > item;
    }
}