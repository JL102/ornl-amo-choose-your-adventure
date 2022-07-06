
/**
 * Parse handcrafted text into pretty-printed HTML. Currently supported: \n -> newline; {text} -> emphasized text
 * @param text 
 * @returns Object for passing to "dangerouslySetInnerHTML" attribute (https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
 */
export function parseSpecialText(text: string): {__html: string} {
	let newText = text
		.replace(/{([^{}]*?)}/g, '<span class="emphasis">$1</span>')
		.replace(/(\n)|(\\n)/g, '<br/>');
	return {
		__html: newText
	};
}