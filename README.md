# angular-areaspline [![Build Status](https://secure.travis-ci.org/Venturocket/angular-areaspline.png?branch=master)](http://travis-ci.org/Venturocket/angular-areaspline)
Simple areaspline chart directive. Uses d3's area chart.

## Usage
#### Markup
As an element:
```
<areaspline
	data="{string}"
	width="{float}"
	height="{float}"
	transition="{bool}">
</areaspline>
```
As an attribute:
```
<div
	areaspline
	data="{string}"
	width="{float}"
	height="{float}"
	transition="{bool}">
</div>
```

#### Parameters
|Param	|Type	|Required|Default|Details|
|-------|-------|--------|-------|-------|
|data	|string	|yes    |none |Angular expression from which to get the data. Expects an array of numbers, e.g. `[ 1, 2, 3, ...]` |
|transition|bool |no |false |If true, an animated transition will be performed when the chart's data is updated.|
|width	|float |no    |'auto' |Gets passed directly to the SVG for sizing purposes. If not given, the width will resize when the window is resized or a 'resizeAreaSpline' event is fired. |
|height	|float |no    |'auto' |Gets passed directly to the SVG for sizing purposes. If not given, the height will resize when the window is resized or a 'resizeAreaSpline' event is fired. |

