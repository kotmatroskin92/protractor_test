'use strict';
const BasePage = require("../../framework/basePage");
const navFoldersLocator = "//div[@id='b-nav_folders']";

class FolderNavigateForm extends BasePage{
    constructor() {
        super(element(by.xpath(navFoldersLocator)), "Navigate folders form");
    }

    navigateTo(navFolderItem) {
        return element(by.xpath(`${navFoldersLocator}//a[contains(@href, '${navFolderItem}')]`)).click();
    }
}

module.exports = FolderNavigateForm;