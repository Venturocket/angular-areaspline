# angular-areaspline
Simple areaspline chart directive. Uses d3's area chart.

## Usage
#### Markup
As an element:
```
<areaspline
	data="{string}"
	width="{float}"
	height="{float}">
</areaspline>
```
As an attribute:
```
<div
	areaspline
	data="{string}"
	width="{float}"
	height="{float}">
</div>
```

#### Parameters
|Param	|Type	|Details|
|-------|-------|-------|
|data	|string	|Angular expression from which to get the data. Expects an array of numbers, e.g. `[ 1, 2, 3, ...]` |
|width	|integer|Gets passed directly to the SVG |
|height	|integer|Gets passed directly to the SVG |

