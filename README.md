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

# Differences between this and the original "words" page:
- in the "spaced repetition" box on the right, the number of words of each strength is displayed next to the strength bars image
- the info box that appears when you click on a word does not have the audio button or the "more details" button.
- instead of the translation, the info box contains the gender of the word (in case it has one, otherwise it's empty)

# To those who will look at the code...
I am not professional or very experienced and i'm pretty sure there would've been better ways to implement the same functionality. So if you have any suggestions regarding code quality, let me know!

Feel free to leave feedback or suggestions if you miss anything!
