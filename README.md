# The 100 Chair Problem

## THE PROBLEM:
Imagine there are people sitting in N chairs arranged in a circle. Each chair is evenly spaced apart from its neighbors. Additionally, each chair is given an number starting with 1 and increasing by 1 to N, such that the chair to the right of a person sitting in chair 1 is numbered 2.

You are standing in the center of this circle of chairs. You start by pointing at the person in chair number 1. You tell this person to leave. When they leave, they take their chair with them and all of the other people sitting in chairs spread out to maintain an even spacing between the chairs. The chair with the lowest number is always closest to the bottom of the circle. The chairs always maintain their original numbering.

Skipping the person sitting in chair #2, you then tell the person sitting in #3 to leave -- that is, you skipped 1 person and told the next to leave. Once #3 has left, you then skip 2 people and tell #6 to leave. Continuing in this fashion, skipping one more person than you did before and telling people to leave, eventually there will be only one chair remaining. At this point, the process is completed. There are no more eliminations and the person in the remaining chair is declared the winner.

## THE CHALLENGE:
Your task is to build a visualization of this process using provided chair assets ([PNG](https://media1.popsugar-assets.com/static/imgs/interview/chair.png), [SVG](https://media1.popsugar-assets.com/static/imgs/interview/chair.svg)), HTML, CSS, and JavaScript (feel free to also include any libraries or frameworks) using [codepen](https://codepen.io), [jsfiddle](https://jsfiddle.net), or any other online code editor of your choosing. For this exercise, you may ignore mobile layouts (as we have not provided a mobile mock). Additionally, if you are working on a smaller screen, feel free to scale the project such that it fits on the screen that you are working on. If you do scale the project, make sure to do so proportionally such that relative sizes of all visual elements are the same. If you refer to the [mock](https://media1.popsugar-assets.com/static/imgs/interview/100_Chair_Problem.png), you will see that there is a form on the left side, and a circle of chairs on the right side. The form has two inputs and three buttons. Below is an outline of the different inputs and how they affect the behavior of the application:

"Chairs" number input field - This field is where a user can type the number of chairs to use in the simulation. This correlates to the variable N in the description above. When this field is changed by the user, any running simulation should be stopped and set to an initial state with the number of chairs provided. This field should default to 100.

"ms" number input field - This is the amount of time that must elapse between eliminations when running the simulation. This field may be changed during the running of a simulation. Its values can range from 0 to any positive integer. This field should default to 200 and allow all possible positive integers. As a convenience to the user, it should allow steps of 100.

"Run Simulation" button - When this button is clicked, the simulation will be run automatically pausing for "ms" milliseconds between eliminations. While the simulation is running, this button should change to read "Pause Simulation" and when clicked will pause the simulation. A click on "Pause Simulation" will stop all further eliminations and the button should return to reading "Run Simulation" and should behave as specified above.

"Single Step" button - When clicked, a single elimination will be run if there is one to be run. When this button is clicked the elimination should happen immediately with no delay. This button can be pressed during a running simulation and it will register an elimination following the standard rules. When clicked during a simulation, any timers in place should not be refreshed, and should be run "on schedule". If a user clicks the single step button while the simulation is running when there are only two chairs remaining, the simulation should be stopped after removing the second to last chair.

"Reset" link - When clicked, any running simulations should be stopped and all fields should be restored to their default values.

## COPY (used in the html):
This simulation represents a modified version of the Josephus problem. Given the inputs of a number of chairs and a timer value, it visualizes the elimination of the participants using the timer as the delay between eliminations. Additionally you may step through the simulation manually by using the remove chair button.

## DESIGN INFORMATION:
Typography - The font (Source Sans Pro) can be found using google fonts. Adding the following to the HEAD of the page will load the correct fonts to use:
```
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,600" rel="stylesheet">
```
If you are unfamiliar with google fonts, the documentation can be found here: https://developers.google.com/fonts/docs/getting_started

* Headline
  * Weight: Semi-Bold (600)
  * Size: 24px
  * Color: #62687C
* Body Copy
  * Weight: Light (300)
  * Size: 16px
  * Line Height: 1.5
  * Color: #62687C
* Form Field Copy
  * Weight: Regular (300)
  * Size: 16px
  * Color: #4A4A4A
* Form Label Copy
  * Weight: Regular (300)
  * Size: 16px
  * Color: #9a9a9a
* Remove Chair Button Copy
  * Weight: Regular (300)
  * Size: 16px
  * Color: #FFFFFF

* Colors
  * Left Side Background: #F6F6F6
  * Form Field Borders: #C4CDD5
  * Form Field Labels: #FFFFFF > #F9FAFB (gradient)
  * Run Simulation Button: #FFFFFF
  * Remove Chair Button Border: #12B9EF
  * Remove Chair Button Fill: #34C9F9 > #24C4F8 (gradient)
* Animations
  * Chair Removal: opacity fade to 0 over 1s.
  * Chair Re-Layout: chairs fill empty space after removal over 1s.