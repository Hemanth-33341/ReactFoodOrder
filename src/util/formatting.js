
//functions for formatting the meal price 

export const currencyFormatter = new Intl.NumberFormat('en-US',{
    style:'currency',
    currency: 'INR'
});