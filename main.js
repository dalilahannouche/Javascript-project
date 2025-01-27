// Creating Variables

// Creating an Array of three objects (images) for the slider section, so we will not add others in the HTML
const galleryImages = [
    {
        src : "./assets/gallery/image1.jpg",
        alt : "image 1"
    },
    {
        src : "./assets/gallery/image2.jpg",
        alt : "image 2"
    },
    {
        src : "./assets/gallery/image3.jpg",
        alt : "image 3"
    },

]


const weatherAPIKey = "6d23985636a6e2f80a6f785a70ace018";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

// Creating an Array of six objects (images) for the product section, so we will not add others in the HTML

const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
      },

    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
]

// MENU SECTION  (Ctrl + K + C)

// To open the Menu
function menuHandler(){
    document.querySelector('#open-nav-menu').addEventListener('click', function(){
        document.querySelector('header nav .wrapper').classList.add('nav-open');
   });
   
   // Or I do also 
   // document.querySelector('#close-nav-menu').addEventListener('click', function(){
   //      document.querySelector('header nav .wrapper').classList.toggle('nav-open');
   // });
   
// To close the Menu   
   document.querySelector("#close-nav-menu").addEventListener('click', function(){
       document.querySelector("header nav .wrapper").classList.remove('nav-open');
   })
}

// Function to convert C to F
function celsiusToFahr (temperature){
    let fahr = (temperature * 9/5) + 32;
    return fahr;
}

// Greeting Section

function greetingHandler(){
    
    let greetingText;
    
    let currentHour = new Date().getHours();
    if(currentHour < 12){ // if the condition is true, JS will not see the other conditions
        greetingText = "Good morning";
    }else if(currentHour < 19){
        greetingText = "Good afternoon";
    }else if(currentHour < 24){
        greetingText = "Good evening";
    }else{
        greetingText = "Welcome !";
    }
   
    document.querySelector('h1#greeting').innerHTML = greetingText;
};

// Weather Section

function weatherHandler(){
    navigator.geolocation.getCurrentPosition(position => {

        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
    
        // let url = weatherAPIURL
        //     .replace("{lat}", latitude)
        //     .replace("{lon}", longitude)
        //     .replace("{API key}", weatherAPIKey)
    
        // let url = weatherAPIURL.replace(/{lat}|{lon}|{API key}/g, match => {
        //     switch(match){
        //         case "{lat}" : return latitude;
        //         case "{lon}" : return longitude;
        //         case "{API key}" : return weatherAPIKey;
        //     }
    
        // })
    
        //Code optimized
        let replacements = {
            "{lat}": latitude,
            "{lon}": longitude,
            "{API key}": weatherAPIKey
        };
        
        let url = weatherAPIURL.replace(/{lat}|{lon}|{API key}/g, match => replacements[match]);
        
    
        fetch(url) // when a line is executed, we create a promise with "then"
        .then(response => response.json())  // "then" will create a function to return for us a json file. Since we are again waiting
                                            // for a response, we have to create a new promise with "then"
        .then(data => {
            const condition = data.weather[0].description;
            const location = data.name;
            const temperature = data.main.temp;
            
        
            let celsiusText = `The weather is ${condition} in ${location} and it\'s ${temperature.toFixed(1)} °C outside.`;
            let fahrText = `The weather is ${condition} in ${location} and it\'s ${celsiusToFahr (temperature).toFixed(1)} °F outside.`;
            
            document.querySelector('p#weather').innerHTML = celsiusText;
        
            
            document.querySelector('.weather-group').addEventListener("click", function(e){
                //celcius
                //fahr
            
                if(e.target.id == "celsius"){
                    document.querySelector('p#weather').innerHTML = celsiusText;
                } else if(e.target.id == "fahr") {
                    document.querySelector('p#weather').innerHTML = fahrText;
                }
                
            }).catch(err => {
                    document.querySelector('p#weather').innerHTML = "Error getting the weather temperature. Please refresh the page to try again.";
            })
        }); 
         
    });

}

// Local Time Section

// function clockHandler() {
//     function updateTime() {
//         let localTime = new Date();

//         document.querySelector('span[data-time=hours]').textContent = localTime.getHours().toString().padStart(2, "0");
//         document.querySelector('span[data-time=minutes]').textContent = localTime.getMinutes().toString().padStart(2, "0");
//         document.querySelector('span[data-time=seconds]').textContent = localTime.getSeconds().toString().padStart(2, "0");
//     }

//     // Mise à jour immédiate
//     updateTime();

//     // Mise à jour toutes les secondes
//     setInterval(updateTime, 1000);
// }

// Clcok Handler another solution more optimized

document.addEventListener('DOMContentLoaded', function () {  
    //DOMContentLoaded charge les noeuds (pas le code html de la page,
    // car il ne charge pas les images par exemple qui peuvent être en cours de chargement) comme les "span" afin que le javascript 
    // n'utilise les noeuds
    const hoursElem = document.querySelector('span[data-time=hours]');
    const minutesElem = document.querySelector('span[data-time=minutes]');
    const secondsElem = document.querySelector('span[data-time=seconds]');
    const amPmElem = document.querySelector('.time-letter');

    // Fonction pour obtenir et afficher l'heure actuelle
    function setClock() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        // Format 12 heures avec AM/PM
        let displayHours = hours % 12 || 12; // si le modulo donne un résultat false, il affichera le 12, sinon il affichera l'heure normal
        //ceci est fait simplement pour remplacer le 00 à 12
        let isPM = hours >= 12;

        // Affichage des valeurs
        hoursElem.textContent = displayHours.toString().padStart(2, "0");
        minutesElem.textContent = minutes.toString().padStart(2, "0");
        secondsElem.textContent = seconds.toString().padStart(2, "0");
        amPmElem.textContent = isPM ? "PM" : "AM";
    }

    // L'usage de hours % 12 permet de convertir l'heure de format 24 heures en format 12 heures.
    // Le || 12 est là pour remplacer 0 (le résultat de hours % 12 pour 00:00 ou 12:00) par 12, conformément à la norme du format 12 heures.
    // Sans cette conversion, 00:00 AM ou 12:00 AM serait affiché, ce qui peut prêter à confusion pour l'utilisateur, car on a l'habitude de dire "12 AM" pour minuit et "12 PM" pour midi.
    // Mise à jour immédiate à l'initialisation
    setClock();

    // Mise à jour continue avec un intervalle précis
    setInterval(setClock, 1000);
});


// Galery of Slider


function galeryHandler(){

    // Select the big image (the principal one)
    let mainImage = document.querySelector('#gallery > img');
    
    // Select the thumbnail sections
    let thumbnail = document.querySelector('#gallery .thumbnails'); 
    
    // Display the first image (the principal one) with src and alt 
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;
    
    // The thumbnails composition : 
    // src="./assets/gallery/image1.jpg" 
    // alt="Thumbnail Image 1" 
    // data-array-index="0" 
    // data-selected="true"
    
    // To Browse each elemnt of the Array we use forEach, the order( image, index  )are important
              
    galleryImages.forEach(function(image, index){
      // We will create each thumb
      let thumb = document.createElement('img');
      thumb.src = image.src;
      thumb.alt = image.alt;
      thumb.dataset.arrayIndex = index;
      thumb.dataset.arraySelected = index === 0 ? true : false; // if the index is equal 0, it's selected, otherwise,
                                                                //  all the others thumbnails are not selected (the
                                                                //  condition starts here : === 0 )
      
      thumb.addEventListener('click', function(e) { // e is the element that produced the event "click"
        // for each thumb that we click on, we will display the image on the big slider

        selectedIndex = e.target.dataset.arrayIndex;
        selectedImage = galleryImages[selectedIndex];
    
        mainImage.src = selectedImage.src;
        mainImage.alt = selectedImage.alt;
    
        // Unselect all the thumbnails, we don't need the index, we need the element itself
    
        thumbnail.querySelectorAll('img').forEach(function(img){ 
        // Une fois que tu as tous les éléments <img>, tu utilises la méthode forEach pour itérer sur chacun d'eux.
            img.dataset.arraySelected = false;
    
        });
    
        e.target.dataset.arraySelected = true;
    
      });
    
      thumbnail.appendChild(thumb)
    })
}


// Products Section

//<div class="product-item"></div>
// <img src="./assets/products/img6.png" alt="AstroFiction">
// <div class="product-details">
//   <h3 class="product-title">AstroFiction</h3>
//   <p class="product-author">John Doe</p>
//   <p class="price-title">Price</p>
//   <p class="product-price">$ 49.90</p>

function populateProducts(productList){

    
    // We select the product Section in the HTML, productSection must be defined first before to use it further or access it

    let productSection = document.querySelector('div.products-area'); 

    // the product section is going to be empty
    productSection.textContent = "";

    // We create each element cause we removed everything from the HTML
    // Run a loop into the product and create an HTML element ("product-item")
    // for each of them

    productList.forEach(function(product, index){
        // Create the HTML element for the individual product
        let productElmnt = document.createElement('div');
        productElmnt.classList.add('product-item');

        // Create the product image
        let productImg = document.createElement('img');
        productImg.src = product.image;
        productImg.alt = "Image for : " + product.title;


        // Create the product details section
        let productDetails = document.createElement('div');
        productDetails.classList.add('product-details');

        // Create product title, author, pricetitle and price

        let productTitle = document.createElement('h3');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.title;

        let productAuthor = document.createElement('p');
        productAuthor.classList.add('product-author');
        productAuthor.textContent = product.author;

        let productPriceTitle = document.createElement('p');
        productPriceTitle.classList.add('price-title');
        productPriceTitle.textContent = "Price";

        let productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent =  product.price > 0 ? " $" + product.price.toFixed(2)  : "Free";

        // Add all childs HTML Elements of the product
        productDetails.append(productTitle, productAuthor, productPriceTitle, productPrice);
        productElmnt.append(productImg, productDetails);

        // Add the complte individual product to the products section
        productSection.append(productElmnt)

    });
}

function productsHandler(){

    // We display the number of products in "All", "Free" and "Paid" with the method "filter"
   
    let paidProduct = products.filter(paid => paid.price > 0);

    let freeProduct = products.filter(free => !free.price || free.price <= 0);// if the price doesn't exists or is undefinied OR is the price is less or equals to 0, it's true
    

    populateProducts(products); //before clicking on the filter, we already see ALL the products

 

    // Total number of products
    document.querySelector('.products-filter label[for=all] .product-amount').textContent = products.length;

    // Total number of paid products
    document.querySelector('.products-filter label[for=paid] .product-amount').textContent = paidProduct.length;

    // Total number of free products
    document.querySelector('.products-filter label[for=free] .product-amount').textContent = freeProduct.length;

    // Click handlers to filter

    let productsFilter = document.querySelector('.products-filter');
    productsFilter.addEventListener("click", function(e){
        if (e.target.id === "all") {
            populateProducts(products)
        }
        else if (e.target.id === "paid") {
            populateProducts(paidProduct); 
        } 
        else if (e.target.id === "free") {
            populateProducts(freeProduct)
        }
    })
    
}

// Footer Section

function footerHandler(){

    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `© ${currentYear} - All rights reserved, created by Dalila Hannouche`;
    // © 2024, All rights reserved, created by Dalila Hannouche
}



// Page Load

menuHandler();
greetingHandler();
weatherHandler();
//clockHandler();
galeryHandler();
productsHandler();
footerHandler();