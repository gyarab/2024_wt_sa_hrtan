from math import sqrt
from turtle import *

scale = 200
diagonal = sqrt(scale ** 2 + scale ** 2)
forward(scale)
left(135)
forward(diagonal)
left(135)
forward(scale)
left(135)
forward(diagonal)
left(90)
forward(diagonal / 2)
left(90)
forward(diagonal / 2)
left(135)
forward(scale)
right(90)
forward(scale)
exitonclick()
