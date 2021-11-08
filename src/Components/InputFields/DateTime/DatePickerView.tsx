import React from 'react';
import Templates from "../../TemplatesIndex";

export class DateTimePickerView {
    format: string;
    // acces: string;
    constructor(format: string) {
        this.format = format;
        // this.acces = acces;
    };

    getView() {
        return <Templates.DatePickerComponent
            dateFormat={this.format} />

    };
};

