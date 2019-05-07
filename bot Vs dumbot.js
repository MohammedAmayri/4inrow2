let { $, sleep } = require('./funcs');
let slots;
let win=0;
let lose=0;
let sleepTime = 500;
//let cucumber = require('cucumber');
//let timeout=cucumber.setDefaultTimeout((60 * 1000))
//timeout;


module.exports = function () {


    this.Given(/^that I go to the game page$/, async function () {
        await helpers.loadPage('http://localhost:3000/game');
        await sleep(2000)
    });

    this.When(/^I choose to play as dump boot against bot$/, async function () {
        let typeChoiceButtons = await $('.type-choice-btn');
        for (let typeChoiceButton of typeChoiceButtons) {
            await typeChoiceButton.click();
            let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
            for (let choice of choices) {
                let text = await choice.getText();
                if (typeChoiceButton == typeChoiceButtons[1]) {
                    if (text === 'bot') {
                        
                        // we MUST break because the dom changes after click
                        // and erases the old menu.. (tricky...)
                        break;
                    }

                }
                else if (text === 'Dum bot') {
                    await choice.click();
                    // we MUST break because the dom changes after click
                    // and erases the old menu.. (tricky...)
                    break;
                }
            }
            await sleep(sleepTime * 2);
        }
    });


    this.When(/^with two differents names$/, async function () {
        let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
        await inputFields[0].sendKeys('Spelare 1');
        await sleep(sleepTime * 2);
        await inputFields[1].sendKeys('Spelare 2');
        await sleep(sleepTime * 2);
    });

    this.When(/^click the Börja spela\-button$/, async function () {
        let beginButton = await $('.begin-btn');
        beginButton.click();
        await sleep(sleepTime * 2);
    });

    this.Then(/^the game should begin$/, async function () {
        let activeMenuLink = await $('.nav-link.active');
        let text = await activeMenuLink.getText();
        await sleep(1000); // small wait needed
        assert.equal(text, 'Avbryt spelet', 'The game did not start!');
        await sleep(sleepTime * 2);
    });




    this.Then(/^the smart bot should win$/, { timeout: 30 * 1000 }, async function () {
        //      await sleep(20000)
        let span = await $('span')

        let n = 4
        while (n = !0) {
            let span = await $('span')
            if (span[1] == undefined) {
                await sleep(sleepTime * 10);
            }
            else
                break;
        }


        await sleep(2000)
        span = await $('span')
        let text = await span[1].getText()
        if (text.includes('Spelare 1 vann')) {
            
            lose++

        }
        else {
            
            win++
        }
        
        console.log(win, lose)
    });
}