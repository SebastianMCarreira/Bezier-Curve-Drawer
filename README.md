# Bezier Cruve Drawer

This project is a personal JavaScript implementation of the well known algorithm to draw Bezier curves using HTML5 canvas for rendering.

Bezier curves are a way to draw curves from a given set of points (3 or more). This is done by calculating intermediate points for a given value of "t" until the set of calculated points is just one, this point will be one of the curve's points. Ideally, to calculate every point in the curve, one would have to calculate for every value of t between 0 and 1. In practice, to calculate n points in the curve, one takes n values of t between 0 and 1 and does this calculation for each one of them.

More information about Bezier Curves and the algorithm in https://en.wikipedia.org/wiki/B%C3%A9zier_curve

## Requirements

Only the three files in the repository (except for this README and the .git) and a web browser are needed (Chrome, Firefox and Edge were tested).

## Use

Open index.html with your preferred web browser to start the application.

You can set points by clicking anywhere in the canvas (anywhere below the horizontal line) or by placing your desired coordinates in the inputs labeled X and Y and clicking the "Add Poin" button.

If you want to delete the last point, click the "Remove Last" button, if you need to delete another point, you will have to delete every one from the last. You can also click the "Reset" button to delete every placed point.

You may want to see the strokes to know exactly what's the order of the points. To do so, check the "See Strokes" checkbox.

By default, only 20 points of the curve will be calculated, you can change that by placing the amount you want in the "Curve Points" labeled input. I have tested this with up to 10 000 points without any performance issues and at this point, the curve will already be rendered as a thick line so trying more is usless.

Once you set every point, click "Draw Curve" and every point will be calculated and rendered in the canvas. You can then click "Erase Cruve" if you want to edit the points to draw a similar curve instead.