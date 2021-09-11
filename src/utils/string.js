
/**
 * Convert kebab-case text to pascal-case
 * 
 * @param {String} kebabString - string in kebab-case
 * @returns {String} string in pascal-case
 */

export const kebabToPascal = kebabString => {
    const clearAndUppercase = kebabString => kebabString.replace(/\-/g, '').toUpperCase();
    const pascalString = kebabString.replace(/(^\w|-\w)/g, clearAndUppercase);
    return pascalString;
}


/**
 * Convert kebab-case text to camel-case
 * 
 * @param {String} kebabString - string in kebab-case
 * @returns {String} string in camel-case
 */

export const kebabtoCamel = kebabString => {
    const clearAndUppercase = kebabString => kebabString.replace(/\-/g, '').toUpperCase();
    const camelString = kebabString.replace(/\-\w/g, clearAndUppercase);
    return camelString;
}