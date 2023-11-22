// sample url = "https://api.data.gov.my/data-catalogue?id=births&filter=2003-05-04@date";

let url = "https://api.data.gov.my/data-catalogue?id=births&";

const birthday = document.querySelector('.js-input-birthday');


document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    requestBirthday();
});


// This functions use fetch to make GET Requests to the Government API
function requestBirthday () {

  // If the birth day value is empty, return without requesting
  if (emptyBirthDayInput()){
    return;
  }

  // End porint = url + some filter values
  // see https://developer.data.gov.my/request-query for more filter values / query parameters
  let endPoint = `${url}filter=${birthday.value}@date`;


  fetch(endPoint, {
    method: "GET",
    redirect: "follow",
  }).then(response => {
      if (response.ok){
        return response.json()
      }
    })
    .then((jsonResponse) => {
      const birthdayText = setBirthDayText(jsonResponse[0].births);
      document.querySelector('.js-count-birthday').innerHTML = birthdayText;
    })
    .catch(e => console.log(e));
}



function emptyBirthDayInput() {
  return birthday.value && birthday.value !== ''? false : true;
}


function setBirthDayText(birthdayCount) {
  return `On ${birthday.value}, there were ${birthdayCount} babies born in Malaysia.`
}

