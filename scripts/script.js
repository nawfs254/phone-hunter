const loadPhones = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json();
    const phones = data.data; 
    
    displayPhones(phones)
    console.log(`https://openapi.programming-hero.com/api/phones?search=iphone`)
}

const searchPhones = async (searchValue, isViewAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    const data = await res.json();
    const phones = data.data; 
    displayPhones(phones, isViewAll)

    console.log(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
}

const displayPhones = (phones, isViewAll) => {
    const phoneContainer = document.getElementById('phone-container');

    
    phoneContainer.innerHTML = "";

    console.log(phones.length)  
    console.log('is show all', isViewAll)

    if(phones.length >= 9 ){
        viewAllBtn.classList.remove('hidden')
    }
    else{
        viewAllBtn.classList.add('hidden')
    }

    // slice result if showall is not true
    if(!isViewAll){
        phones = phones.slice(0, 9)
    }
    
    // empty search
    

    phones.forEach(phones => {
        // add the new div
        const div = document.createElement('div');
        div.classList = `border-2 box-border p-4 rounded-lg space-y-2 mx-3`;
        div.innerHTML = 
        `<div class="bg-[#0D6EFD0D] py-10 rounded-lg">
            <img src="${phones.image}" alt="" class="mx-auto">
        </div>

        <div class="flex flex-col space-y-2 text-center items-center">
            <h1 class="text-2xl font-bold">${phones.phone_name}</h1>
            <p class="text-lg text-gray-600">${phones.slug}</p>
            <p class="text-2xl font-bold">$<span>${phones.brand}</span></p>
            <button class="btn bg-[var(--blue)] text-white hover:text-black hover:border-[var(--blue)] text-lg md:text-xl px-5 md:px-10 py-0 md:py-1 font-bold box-content w-fit">Show Details</button>

        </div>
        `;
        phoneContainer.appendChild(div);

    });

   toggleLoader(false);
}

// search handle
const searchHandle = (isViewAll) => {
    toggleLoader(true);
    const searchInput =document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchPhones(searchValue, isViewAll);
    console.log(searchValue)
    if(searchValue === ""){
        loadPhones();
    }

    
}

// view all handle
const viewAllBtn = document.getElementById('view-all-btn');
viewAllBtn.onclick = function(isViewAll, searchValue){
    searchHandle(true);
}

// show/hide loader
const toggleLoader = (isLoading) =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('hidden');
    }
    else{
        loader.classList.add('hidden');
    }
}

loadPhones();