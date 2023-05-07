/**
* Function to escape characters in preparation for conversion to regex
* 
* @author Brian L
* @see {@link https://stackoverflow.com/a/7317957|Regex matching list of emoticons of various type}
*
* @param {string} text - The text to be escaped
*
* @returns {string} text - Input text with special regex characters escaped
*  
* 
*/
function RegExpEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
export default RegExpEscape