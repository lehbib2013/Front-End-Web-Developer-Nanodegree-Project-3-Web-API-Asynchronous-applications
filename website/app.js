/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = ',us&appid=4ec3803c15b2162ed272f554734e0217&units=imperial';

//https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', generateAction);

function generateAction(e) {

  const zipcode = document.getElementById('zip').value;

  getWeatherInfos(baseURL, zipcode, apiKey,)
    // New Syntax!
    .then(function (data) {
      // Add data
      //console.log(data);√addProjectData
      postData('/addProjectData', { content: data.content, date: data.date, temp: data.temp });
    })
    .then(function (data) {
      // Add data
      //console.log(data);
      updateUI();
    })
}



const getWeatherInfos = async (baseUrl1, zipCode1, apiKey1) => {
  const response = await fetch(baseUrl1 + zipCode1 + apiKey1);
  const newfeelings = document.getElementById('feelings').value;
  try {
    const data = await response.json();
    console.log("Calling getWeatherInfos...");
    let formatedReturnedData = { content: newfeelings, date: newDate, temp: data.main.temp };
    console.log(formatedReturnedData);
    return await formatedReturnedData;
  } catch (error) {
    console.log("Calling ERROR getWeatherInfos...");
    console.log(error);
  }

}
const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    console.log("Calling postData...");
    return await response.json();
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const updateUI = async () => {

  const returnedData = await fetch('/retProjectDataToUI');
  try {
    const retData = await returnedData.json();

    console.log("Calling updateUI...");
    console.log(retData);
    /* gernerateInfosList(retData); */

    document.getElementById('date').innerHTML = retData.date;
    document.getElementById('temp').innerHTML = Math.round(retData.temp) + 'degrees';
    document.getElementById('content').innerHTML = retData.content;


  } catch (error) {
    console.log("error", error);
  }

}

/*
function gernerateInfosList(data) {
  const containerContent = document.getElementById('.holder.entry');

  const containerContent = document.getElementById('holderentry');
  let list = '<div class = "title">Most Recent Entry</div>';
  data.forEach((item) => {
    // add html tags for list items
    // dataset.nav returns DOMStringMap {nav: section 1}
    list += `
     <div class = "entryHolder">
    <div class = "date">${item.date}</div> 
    <div class = "temp">${Math.round(item.temp) + 'degrees'}</div>
    <div class = "content">${item.content}</div>
    </div>`;
  });
  containerContent.innerHTML = list;
 
} */