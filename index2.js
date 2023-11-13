
const quotecontainer =document.getElementById('quote-container');
const quotetext =document.getElementById('quote');
const quotauthor =document.getElementById('author');
const btntwitter =document.getElementById('twitter');
const btnnewquote =document.getElementById('new-quote');
const loader =document.getElementById('loader');

//ApiQuotes =[];

/*async function newQuote(){
    const quotetext =  ApiQuotes.quoteText;
    const quoteAuthor =  ApiQuotes.quoteAuthor;
console.log(quoteAuthor + quotetext);
quotauthor.textContent =quoteAuthor;
quotetext.textContent= quotetext;


}*/
function showloader (){
loader.hidden=false;
quotecontainer.hidden=true;
}
function complete(){
    loader.hidden=true;
quotecontainer.hidden=false;
}

async function getQuote(){
    showloader();
    const apiUrl= 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
    const response =await fetch(apiUrl);
   const data = await response.json();
   if(data.quoteAuthor === ''){
    quotauthor.innerText= 'unknow';
   }
   else{
    quotauthor.innerText= data.quoteAuthor;
   }
   
    if(data.quoteText.length>70){
        quotetext.classList.add('long-quote');
    }
    else{
        quotetext.classList.remove('long-quote');

    }
    quotetext.innerText =data.quoteText;
   
    

   
   complete();
    
    console.log(data);
    
    }
    catch(error){
        getQuote();
       
        console.log('error is ', error);
    }

}
function TweetQuote() {
    
    const tweetUrl ='https://twitter.com/intent/tweet?text='+quotetext.innerText +'_' +quotauthor.innerText;
    window.open(tweetUrl, '_blank');
  }
  btntwitter.addEventListener('click',TweetQuote);
btnnewquote.addEventListener('click',getQuote);
getQuote();