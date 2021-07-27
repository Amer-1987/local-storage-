'use strict'

// let parent = document.getElementById('parent');


let leftImageElement = document.getElementById('left-image');

let middleImageElement = document.getElementById('middle-image');

let rightImageElement = document.getElementById('right-image');


let maxAttempts = 10;
let userAttemptsCounter = 0;


let leftImageIndex;
let middleImageIndex;
let rightImageIndex;

let namesArr = [];

let votesArr = [];

let shownArr = [];

function Product(name, path) {
    this.name = name;
    this.path = path;
    this.votes = 0;
    this.shownNum = 0;

    Product.all.push(this);

    namesArr.push(this.name);



}










function updateStorage() {

    let stringArr = JSON.stringify(Product.all);
    console.log(stringArr);
    localStorage.setItem('votes', stringArr);




    // let stringArr2 = JSON.stringify(shownArr);
    // console.log(stringArr2);
    // localStorage.setItem('shown', stringArr2);


}


function getVotesandShown() {

    let data = localStorage.getItem('votes');
    // console.log(data);

    let parsedArr = JSON.parse(data);
    // console.log(parsedArr.length);

if (parsedArr !== null){
   Product.all=parsedArr;


}
    // for (let i = 0; i < parsedArr.length; i++) {
    //     // console.log(parsedArr[i]);
    //     votesArr[i] += (parseInt(parsedArr[i]));


    // }


    // let data2 = localStorage.getItem('shown');
    // // console.log(data2);

    // let parsedArr2 = JSON.parse(data2);
    // // console.log(parsedArr2.length);



    // for (let j = 0; j < parsedArr2.length; j++) {
    //     console.log(parsedArr2[j]);
    //     shownArr[j] += (parseInt(parsedArr2[j]));

    //     // console.log(Product.all);
        

    // }


}







Product.all = [];


new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

// console.log(Product.all);

// taken from w3schools and teacher demo
function getRandomIndex() {

    return Math.floor(Math.random() * Product.all.length);
}

// console.log(getRandomIndex());

// render function

let previousRound = [];

function renderThreeProducts() {

    leftImageIndex = getRandomIndex();
    middleImageIndex = getRandomIndex();
    rightImageIndex = getRandomIndex();

    while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex || previousRound.includes(leftImageIndex) || previousRound.includes(middleImageIndex) || previousRound.includes(rightImageIndex)) {

        leftImageIndex = getRandomIndex();
        middleImageIndex = getRandomIndex();
        rightImageIndex = getRandomIndex();


    }
    // while (rightImageIndex === middleImageIndex) {
    //     rightImageIndex = getRandomIndex();
    // }
    console.log(previousRound);

    previousRound = [leftImageIndex, middleImageIndex, rightImageIndex];

    console.log(leftImageIndex, middleImageIndex, rightImageIndex);

    // console.log(Product.all[leftImageIndex].name);
    // console.log(Product.all[middleImageIndex].name);
    // console.log(Product.all[rightImageIndex].name);



    leftImageElement.src = Product.all[leftImageIndex].path;
    middleImageElement.src = Product.all[middleImageIndex].path;
    rightImageElement.src = Product.all[rightImageIndex].path;

    Product.all[leftImageIndex].shownNum++;
    Product.all[middleImageIndex].shownNum++;
    Product.all[rightImageIndex].shownNum++;

    // console.log(Product.all[leftImageIndex].shownNum++);
    // console.log(Product.all[middleImageIndex].shownNum++);
    // console.log(Product.all[rightImageIndex].shownNum++);


}

renderThreeProducts();



//handle with clicking 


parent.addEventListener('click', handleUserClick);

function handleUserClick(event) {

    // console.log(event.target.id);



    // console.log(userAttemptsCounter);


    if (userAttemptsCounter < maxAttempts) {

        if (event.target.id === 'left-image') {
            Product.all[leftImageIndex].votes++;
            // console.log(Product.all[leftImageIndex]);
            renderThreeProducts();
            userAttemptsCounter++;

        } else if (event.target.id === 'middle-image') {
            Product.all[middleImageIndex].votes++;
            // console.log(Product.all[middleImageIndex]);
            renderThreeProducts();
            userAttemptsCounter++;

        } else if (event.target.id === 'right-image') {
            Product.all[rightImageIndex].votes++;
            // console.log(Product.all[rightImageIndex]);
            renderThreeProducts();
            userAttemptsCounter++;

        } else {
            alert('Click within the border of the images ');

        }

    } else {

        //  button function taken from www.sebhastian.com
        let button = document.createElement("button");
        button.innerHTML = "View Results";
        button.addEventListener("click", viewingResult);

        function viewingResult() {
            let list = document.getElementById('resultList');

            for (let i = 0; i < Product.all.length; i++) {
                let listItem = document.createElement('li');

                list.appendChild(listItem);

                listItem.textContent = `${Product.all[i].name} had (${Product.all[i].votes}) votes, and was seen (${Product.all[i].shownNum}) times. `;
            }
            button.removeEventListener("click", viewingResult);
            showChart();
        };
        document.body.appendChild(button);

        for (let i = 0; i < Product.all.length; i++) {
            console.log(Product.all[i].votes);
            console.log(votesArr[i]);

            votesArr.push(Product.all[i].votes);
            shownArr.push(Product.all[i].shownNum);

            // votesArr[i] += parseInt(Product.all[i].votes);
        }

           
            // shownArr[j] += parseInt(Product.all[j].shownNum);

            

            // shownArr.push(Product.all[i].shownNum);

        

        console.log(votesArr);
        updateStorage();


        parent.removeEventListener('click', handleUserClick);

    }

}

function showChart() {

    const data = {
        labels: namesArr,
        datasets: [{
            label: 'Votes',
            barPercentage: 1,

            data: votesArr,

            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            hoverOffset: 4,

            borderWidth: 1
        },
        {
            label: 'Shown',
            barPercentage: 1,

            data: shownArr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',

            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',

            ],
            borderWidth: 1
        }

        ]

    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,

                    text: "Your Favourite Product "
                }
            },
            scales: {
                y: {
                    beginAtZero: true,

                }
            }
        }
    };


    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

}


getVotesandShown();


