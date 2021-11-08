import React from 'react';
import Templates from "../../../TemplatesIndex";

export class MarkdownView {
    constructor() {
        this.getView();
    }

    public getView() {
        return <Templates.MarkdownComponent />
    };

};