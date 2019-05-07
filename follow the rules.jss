let { $, sleep } = require('./funcs');
let slots;
let win = 0;
let lose = 0;
let sleepTime = 500;
//let cucumber = require('cucumber');
//let timeout=cucumber.setDefaultTimeout((60 * 1000))
//timeout;


module.exports = function () {


    this.Given(/^that I go to the game page$/, async function () {
        await helpers.loadPage('http://localhost:3000/game');
        await sleep(2000)
    });

    this.When(/^I choose to play as human against human$/, async function () {
        let typeChoiceButtons = await $('.type-choice-btn');
        for (let typeChoiceButton of typeChoiceButtons) {
            await typeChoiceButton.click();
            let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
            for (let choice of choices) {
                let text = await choice.getText();
                if (text === 'Människa') {
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
    //fråga om varför får du length undefined när det är bara 1
    this.Then(/^as player no 1 should be the only one who get to play first$/, async function () {
        await sleep(1500)
        let slots = await $('.slot')
        await slots[6].click();
        await sleep(1500)
        slots = await $('.slot')
        await slots[6].click();
        await sleep(1500)
        slots = await $('.slot')
        await slots[6].click();

        let first = await $('.slot.red')
        assert(first, 'where the hell is it?')
        console.log(first.length)
        // assert(first,'can not find that')
        //assert(first.length==1,'wrong order of playing')
        let second = await $('.slot.yellow')
        //assert(second==41,'wrong order of playing2')
        assert(first.length == 2 && second.length == undefined, 'your testing is not correct')
    });

    this.When(/^i play 3 moves$/, async function () {

        for (let q = 0; q < 3; q++) {
            await sleep(1500)
            slots = await $('.slot')
            await slots[6].click();
            let red=await $('.slot.red')
            let yellow=await $('.slot.yellow')
            switch (q) {
                case 0 :
                assert(red.length==undefined,'youre counting wrong')
                  break;
                  case 1 :
                  assert(yellow.length==undefined,'youre counting wrong2')
                    break;
                    case 2 :
                    assert(red.length==2,'youre counting wrong3')
                      break;
            
                      }   
           
        await sleep(1000)

        }

    });
   

    this.Then(/^i can see that i got 1 yellow and 2 red in the right order$/, async function () {
        red=await $('.slot.red')
        yellow=await $('.slot.yellow')
        assert(red.length==2&&yellow.length==undefined)

    
    });
    this.When(/i play 7 times at column no 6$/, async function () {
       for(let i=0;i<=7;i++)
       {    
            slots = await $('.slot')
            await slots[6].click();
            await sleep(1000)

       }

    
    });
    this.Then(/^i can only see that i got 3 yellow and 3 red daims$/, async function () {
        red=await $('.slot.red')
        yellow=await $('.slot.yellow')
        assert(red.length==3&&yellow.length==3)

    
    });
    this.When(/^i try to play at column number 7$/, async function () {
        slots = await $('.slot')
        await slots[7].click();
        await sleep(1000)
    
    });
    //fråga hur man hittar positionen av en daim
    this.Then(/^i should be able to see my daim in column no 1 instead$/, async function () {
        slots = await $('.slot')
        let p=await slots[0].getAttribute('id')
        
        let g= await $('.slot.red')
        assert(p==g,'are you sure about the position of your daim?')
    
    });
    this.When(/^we draw$/, { timeout: 90 * 1000 }, async function () {
        let l=6
        
        for(i=0;i<=11;i++)
        {   
            for(y=0;y<=i;y++)
            {    if(y>=6)
                {
                    break;
                }
                else
                {
                    slots = await $('.slot')
                    await slots[l].click();
                    await sleep(1000)
                }
            
            
            }
            
            l--
            if(l<0)
                {
                    l=6;
                }
            
        }
    });
    this.Then(/^should get drawing massege$/, async function () {
        span = await $('.game-info')
         let text = await span.getText()
         assert(text.includes('oavgjort'),'why not')
    
    });
    this.When(/^i play one move$/, async function () {
        for(let i=0;i<=5;i++)
        {
            slots = await $('.slot')
            await slots[i].click();
            await sleep(1000)
        }
       
    });
    this.Then(/^i should be able to get back the position of it$/,{timeout: 25 * 1000}, async function () {
        
       
        let myarr=[];
      for(let i=1;i<=42;i++)
       {    let path= '/html/body/div/main/div/div[2]/div[$s]'.replace('$s',i)
            let path2=path.toString()
            let div= await driver.findElement(by.xpath(path2))
            let classs= await div.getAttribute('class')
           
            if(classs.includes('red'))
            {
                myarr[i]='RED'+i
            }

            if(classs.includes('yellow'))
            {
                myarr[i]='YELLOW'+i
            }
            if(classs.includes('empty'))
            {
                myarr[i]='EMPTY'+i
            }
            console.log(classs)
            console.log(myarr[i])
       
        }
        for(i=0;i<=myarr.length;i++)
        {   
                console.log(myarr[i])
                if(i%7==0)
                {
                    console.log( "\n")
                }
            
        }
    });
}