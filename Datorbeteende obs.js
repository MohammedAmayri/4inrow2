let {$, sleep} = require('./funcs');
let slots;
 
let sleepTime = 500;
 
module.exports = function(){
 
  // Background
 
  this.Given(/^that I goto the game page$/, async function () {
    await helpers.loadPage('http://localhost:3000/game');
    await sleep (2000)
  });
 
  this.When(/^I choose to play as human player against bot$/, async function () {
    let typeChoiceButtons = await $('.type-choice-btn' );
    let l=typeChoiceButtons.length
    console.log(l)
    for(let h=0;h<l;h++){
      await typeChoiceButtons[h].click();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for(let choice of choices){
        let text = await choice.getText();
        if(text === 'Människa'&&h==0){
          await choice.click();
          // we MUST break because the dom changes after click
          // and erases the old menu.. (tricky...)
          break;
        }
        if(text === 'bot'&&h==1){
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
  this.When(/^i play my move in a certin order$/, async function () {
        await sleep(1000)
          slots= await $('.slot')
        
        await sleep(1000)
        

        await slots[6].click()
        await sleep(1000)


  });
  this.When(/^i wait for the bot to play his turn$/, async function () {
    await sleep(1000)
    slots= await $('.slot')
        await slots[5].click()
        await sleep(1500)


});
  this.When(/^i repeat the last (\d+) steps for (\d+) times with different positions$/, async function () {
    await sleep(1000)
        slots= await $('.slot')
        await slots[4].click()
        await sleep(1500)
        slots= await $('.slot')
        await slots[2].click()
        await sleep(1500)
        slots= await $('.slot')
        await slots[1].click()
        await sleep(1500)
        slots= await $('.slot')
        await slots[0].click()
        await sleep(1500)
        slots= await $('.slot')
        await slots[0].click()
        await sleep(1500)
  });
  this.When(/^repeated the last (\d+) steps for (\d+) times$/, async function () {
    let myarr,myarr2,myarr3,myarr4,myarr5=[];
    for(let z=0;z<=5;z++)
    {
        slots= await $('.slot')
        await slots[6].click()
        await sleep(1000)
        slots= await $('.slot')
        await slots[5].click()
        await sleep(1500)
        slots= await $('.slot')
        await slots[4].click()
        await sleep(1500)
        slots= await $('.slot')
        await slots[2].click()
        await sleep(1500)
        slots= await $('.slot')
        await slots[1].click()
        await sleep(1500)
        slots= await $('.slot')
        await slots[0].click()
        await sleep(1500)
        slots= await $('.slot')
        await slots[0].click()
        await sleep(1500)
       
        for(let i=1;i<=42;i++)
         {    let path= '/html/body/div/main/div/div[2]/div[$s]'.replace('$s',i)
              let path2=path.toString()
              let div= await driver.findElement(by.xpath(path2))
              let classs= await div.getAttribute('class')
             
              if(classs.includes('red'))
              {
                  myarr$z[i].replace('$z',z)='RED'+i
              }
              await sleep(500)
              if(classs.includes('yellow'))
              {
                myarr$z[i].replace('$z',z)='YELLOW'+i
              }
              if(classs.includes('empty'))
              {
                myarr$z[i].replace('$z',z)='EMPTY'+i
              }
              //console.log(classs)
              //console.log(myarr[i])
         
          }

    }
  });
  this.Then(/^i should be able to get how identical or unique are the bot steps$/, async function () {
   //
  });
 

}