import { pricePerMonths, varOne, varTwo } from './pricePerMonths.js';
import { normalizeData, posts } from './normalizeData.js';
import { getData, COMMENTS_URL } from './getData.js';

console.log('\n\n\nTask-1')
console.log(pricePerMonths(varOne))
console.log(pricePerMonths(varTwo))

console.log('\n\n\nTask-2')
console.log(normalizeData(posts))

console.log('\n\n\nTask-3')
getData(COMMENTS_URL)
