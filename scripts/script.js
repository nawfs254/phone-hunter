const loadPhones = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json();
    const phones = data.data; 
    
    displayPhones(phones)
}

const searchPhones = async (searchValue) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    const data = await res.json();
    const phones = data.data; 
    console.log(searchValue);
    displayPhones(phones)
}

const displayPhones = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    
    const searchBtn = document.getElementById('search-btn')
    phoneContainer.innerHTML = "";


    

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

    // search handle
    searchBtn.onclick = function(){
        const searchInput =document.getElementById('search-input');
        const searchValue = searchInput.value;
        console.log(searchValue);
        searchPhones(searchValue);
    }
}

loadPhones();