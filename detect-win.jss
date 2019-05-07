let {$, sleep} = require('./funcs');
let slots;
 
let sleepTime = 500;
 
module.exports = function(){
 
  // Background
 
  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('http://localhost:3000/game');
    await sleep (2000)
  });
 
  this.When(/^I choose to play as two human players$/, async function () {
    let typeChoiceButtons = await $('.type-choice-btn' );
    for(let typeChoiceButton of typeChoiceButtons){
      await typeChoiceButton.click();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for(let choice of choices){
        let text = await choice.getText();
        if(text === 'Människa'){
          await choice.click();
          // we MUST break because the dom changes after click
          // and erases the old menu.. (tricky...)
          break;
        }
      }
      await sleep(sleepTime * 2);
    }
  });
 
  this.When(/^with two different names$/, async function () {
    let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
    await inputFields[0].sendKeys('Spelare 1');
    await sleep(sleepTime * 2);
    await inputFields[1].sendKeys('Spelare 2');
    await sleep(sleepTime * 2);
  });
 
  this.When(/^press the Börja spela\-button$/, async function () {
    let beginButton = await $('.begin-btn');
    beginButton.click();
    await sleep(sleepTime * 2);
  });
 
  this.Then(/^the game should start$/, async function () {
    let activeMenuLink = await $('.nav-link.active');
    let text = await activeMenuLink.getText();
    await sleep(1000); // small wait needed
    assert.equal(text, 'Avbryt spelet', 'The game did not start!');
    await sleep(sleepTime * 2);
  });
 
  // Scenarios
 
  this.When(/^the first player plays (\d+) bricks in a row horizontally$/, async function (brickstoWin) {
 
    // NOTE: Only began this code, by playing one brick
     //slots = await $('.slot'); 
    //await sleep (1000)
    
    for(let i=0;i<=3;i++)
    {   slots = await $('.slot')
        await slots[i].click();
        await sleep(1000)
        await slots[6].click();
        await sleep(1000)
    }

    
    // clicking slots[0] is putting a coin in column 1
    // clicking slots[1] is putting a coin in column 2
    //console.log(slots.length)
   /* await slots[0].click();
    await sleep(1500)
    await slots[6].click();
    await sleep(1500)
    await slots[1].click();
    await sleep(1500)
    slots = await $('.slot')
    await slots[6].click();
    await sleep(1500)
    //slots = await $('.slot')
    await sleep(1500)
    await slots[2].click();
    await sleep(1500)
    //slots = await $('.slot.marked')
    //slots = await $('.slot.marked')
    slots = await $('.slot')
    await slots[6].click();
    await sleep(1500)
    slots = await $('.slot')
    await slots[3].click();
    await sleep(2000)
    */
   
    // MORE TO WRITE HERE!
 
  });
  this.Then(/^he or she should win$/, async function () {
      let span= await $('span')
      text= await span[1].getText()
      console.log(text)
      assert(text.includes('Spelare 1 vann'),'your player did not win')
});

this.When(/^the first player plays (\d+) bricks in a row vertical$/, async function (brickstoWin) {
    for(i=0;i<=3;i++)
    {   slots = await $('.slot')
        await slots[6].click();
        await sleep(1000)
        await slots[i].click();
        await sleep(1000)
    }
    
});

this.When(/^the first player plays (\d+) bricks in a diagonally \(left to right\)$/, async function (brickstoWin) {
    for(i=0;i<=7;i++)
    {   //spelas bara 1 gång
        if(i==0 ||i==1 || i==2|| i==3 )
        {
        slots = await $('.slot')
        await slots[i].click();
        await sleep(1000)
        }
        //spelas alltid 2
        if(i==1 ||i==2)
        {   slots = await $('.slot')
            await slots[i].click();
            await sleep(1000)
        }
        if(i==4 ||i==5||i==6)
        {   slots = await $('.slot')
            let y=i-2
            console.log(y)
            await slots[y].click();
            await sleep(1000)
        }
        if(i==7)
        {   slots = await $('.slot')
            await slots[3].click();
            await sleep(1000)
            slots = await $('.slot')
            await slots[3].click();
            await sleep(1000)
        }
        
       
    }
    
});
this.When(/^the first player plays (\d+) bricks in a diagonally \(right to left\)$/, async function (brickstoWin){
    for(i=6;i>=0;i--)
    {   //spelas bara 1 gång
        if(i==6 ||i==5 || i==4|| i==3 )
        {
        slots = await $('.slot')
        await slots[i].click();
        await sleep(1000)
        }
        //spelas alltid 2
        if(i==5 ||i==4)
        {   slots = await $('.slot')
            await slots[i].click();
            await sleep(1000)
        }
        if(i==2 ||i==1||i==0)
        {   slots = await $('.slot')
            let y=i+2
            console.log(y)
            await slots[y].click();
            await sleep(1000)
        }
        if(i==0)
        {   slots = await $('.slot')
            await slots[3].click();
            await sleep(1000)
            slots = await $('.slot')
            await slots[3].click();
            await sleep(1000)
        }
        
       
    }

});

/*this.When(/^I choose to play as dump boot against bot$/, async function () {
  let typeChoiceButtons = await $('.type-choice-btn');
  for (let typeChoiceButton of typeChoiceButtons) {
      await typeChoiceButton.click();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for (let choice of choices) {
          let text = await choice.getText();
          if (typeChoiceButton == typeChoiceButtons[1]) {
              if (text === 'bot') {
                  await choice.click();
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
*/


}