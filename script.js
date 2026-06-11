//Fetch and Display Products:

const container = document.querySelector(".card-container");

const Loading = document.querySelector(".load");

const search = document.querySelector("input");

const category = document.querySelector(".category");

const button = document.querySelector("button");

 let data = [];
async function fetchData(){
    try{
     Loading.innerHTML = "Loading...."
    const response = await fetch("https://fakestoreapi.com/products");
    console.log(response);

  data = await response.json();
    console.log(data);
    displayData(data);


    }
    catch(error){
        console.log(error)

    }
    finally{
        Loading.innerHTML = "";
    }
}


function displayData(data){
    container.innerHTML = "";
  data.forEach((products) => {
      console.log(products)

      let card = document.createElement("div");
      card.classList.add("Product-card");


      card.innerHTML = `
    <img src="${products.image}" alt="${products.title}">
    <h3>title: ${products.title}</h3>
    <p>price: ${products.price}</p>
    <p>description: ${products.description.slice(0, 150)}</p>
    <p>category: ${products.category}</p>
    <p>rating: ${products.rating.rate} `;
     
      container.appendChild(card);
  });
   
}
fetchData();
function filterProducts(productData) {
  const searchText = search.value.toLowerCase();
  const selectedCategory = category.value;

    const filteredProducts = productData.filter((product) => {
    const matchTitle = product.title.toLowerCase().includes(searchText);

    const matchCategory =
      selectedCategory === "All category" || product.category === selectedCategory;

    return matchTitle && matchCategory;
        
  });
    displayData(filteredProducts);
 
}
 


button.addEventListener("click",()=> filterProducts(data));

category.addEventListener("change",()=> filterProducts(data));
