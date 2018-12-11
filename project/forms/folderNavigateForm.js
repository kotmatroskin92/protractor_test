'use strict';
const BasePage = require("../../framework/basePage");
const navFoldersLocator = "//div[@id='b-nav_folders']";

class FolderNavigateForm extends BasePage{
    constructor() {
        super(element(by.xpath(navFoldersLocator)), "Navigate to folders form");
    }

    navigateTo(navFolderItem) {
        element(by.xpath(`${navFoldersLocator}//a[contains(@href, '${navFolderItem}')]`)).click();
    }
}

module.exports = FolderNavigateForm;