
const quotecontainer =document.getElementById('quote-container');
const quotetext =document.getElementById('quote');
const quotauthor =document.getElementById('author');
const btntwitter =document.getElementById('twitter');
const btnnewquote =document.getElementById('new-quote');
const loader =document.getElementById('loader');




let ApiQuotes = [];
function loading(){
  loader.hidden=false;
  quotecontainer.hidden=true;
}
function complete(){
  loader.hidden=true;
  quotecontainer.hidden=false;
}


function NewQuote(){
  loading();
    const quote= ApiQuotes[Math.floor(Math.random()*ApiQuotes.length)];
    //console.log(ApiQuotes);
    //console.log(quote); 
    if(!quote.author){
      quote.author='unkown';
    }
    else {
  quotauthor.textContent =quote.author; 
    }
if(quote.text.length>40){

  quotetext.classList.add('long-quote');
}
else {
  quotetext.classList.remove('long-quote');
}
  quotetext.textContent =quote.text;
  complete();

}



async function getQuote(){
  loading();
    const apiUrl ='https://type.fit/api/quotes';
    try{
    const response = await fetch(apiUrl);
    ApiQuotes = await response.json();

    //console.log(ApiQuotes);
    NewQuote();
}catch(error)
{

}


}

function TweetQuote() {
  const tweetUrl ='https://twitter.com/intent/tweet?text='+quotetext.textContent +'_' +quotauthor.textContent ;
  window.open(tweetUrl, '_blank');
}
btnnewquote.addEventListener('click',NewQuote);
btntwitter.addEventListener('click' ,TweetQuote);

getQuote();


