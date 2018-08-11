# DuoWords
This script adds the "words" button for languages that don't already have it. It doesn't actually load the words page but instead recreates it.

# How to install
- Install Tampermonkey in your browser if you haven't already (you can also use others, but these are the steps for Tampermonkey)
- Open the File "DuoWordsScript.js", click on "raw" and copy the URL
- On the "Utulities" Page in Tampermonkey you can parse the URL and click install
- Open the "Installed Userscripts" Page to make sure the script is activated
- Now when you open www.duolingo.com/ the script will be started automatically

# Nice to know
- If your word list is very long or your internet connection is very slow, you might not be able to use the button right after it appears because it has to load all the words first. Just wait a few seconds and try again, now it should work

# Differences between the original "words" page:
- in the "spaced repetition" box on the right, the number of words of each strength is displayed next to the strength bars image
- the info box that appears when you click on a word does not have the audio button or the "more details" button.
- instead of the translation, the info box contains the gender of the word (in case it has one, otherwise it's empty)

# What i want to implement next:
- automatic refresh of the page when switching the language so the button appears or disappears without a manual refresh. currently the page has to be refreshed to update the button.  
- clicking on "words" while already on the words page will refresh the table in case something changed. currently the page needs to be refreshed to update it.
- updating the arrows in the table head when the words are ordered (just like it is on the original words page).
- clicking on the skill name in the info box will start the skill practise

Feel free to leave feedback or suggestions if you miss anything!
