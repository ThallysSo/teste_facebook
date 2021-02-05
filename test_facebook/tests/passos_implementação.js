/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    click,
    textBox,
} = require('taiko');
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Vá para o google", async function () {
    await goto("google.com")
});

step("Digite Facebook", async function () {
    await write("facebook");
    await press('Enter')
});

step("Clique no link do Facebook", async function () {
    await click("pt-br.facebook.com");
});

step("Selecione o campo de Email e digite o Email", async function () {
    await click(textBox({placeholder: 'Email ou telefone'}));
    await write("thallysdesouzza@outlook.com");
});

step("Selecione o campo da senha e digite a senha", async function () {
    await click(textBox({placeholder: 'Senha'}));
    await write("Julia1407");
});

step("Entrar", async function () {
    await click("Entrar");
});

step("Página inicial", async function () {
    await goto("facebook.com");
});

step("Clique no campo de texto 'No que você está pensando'", async function () {
    await click("No que você está pensando");
});

step("Digite TESTE_AUTOMATIZADO", async function () {
    await write("TESTE_AUTOMATIZADO");
});

step("Clique em Publicar", async function () {
    await click("Publicar");
});
