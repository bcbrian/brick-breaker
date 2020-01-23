# brick-breaker

## The Goal

We are building a bricker breaker game for to get a foundational understanding of the react api.

## The Steps

### Design and User Story

As a user I can play brick breaker. The top and sides work act as walls. The bottom "wall" counts as a life lost. 
When all lifes are lost it is a game over. Points are accumulated via the ball bouncing off of bricks placed above the paddle.
The paddle is the users tool to bounce the ball around the screen.

#### More coming later... designs and stuff...

### Lets Build the App

#### 1. Make the Paddle 

The Paddle can just be a simple react component. Using Create React App (CRA) then we can use a external stylesheet.

#### 2. Make a game container.

This is the container so we can use absolute positioning to allow us to use math to know where everything is.

#### 3. Adjust the Paddle

Now that we have a container we need to absolute position the paddle so we can control it.

#### 4. Control the Paddle

Now we are going to use JS event system to control the mouse. We will start off simple here but some of this system will likely needed to be moved around.

> Note: we are adding an event listener to the window via `useEffect`, once `useState` is add we can show a memory leak with no cleanup in the `useEffect`. 
