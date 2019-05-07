Feature: Bot behaviour observation
wawa
Background: start the game
 Given that I goto the game page
  When I choose to play as human player against bot
  And with two different names
  And press the Börja spela-button
  Then the game should start
 

Scenario: find out the procent of identical moves of the smart bot
   When i play my move in a certin order
   And i wait for the bot to play his turn
   And i repeat the last 2 steps for 5 times with different positions
   And repeated the last 3 steps for 5 times 
   Then i should be able to get how identical or unique are the bot steps


