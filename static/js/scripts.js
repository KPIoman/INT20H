const blocks1 = document.querySelectorAll('.block_dishes .block_scrol_1 .block_block_dishes_item');
const blocks2 = document.querySelectorAll('.block_dishes .block_scrol_2 .block_block_dishes_item');
const block_scrol1 = document.querySelector('.block_scrol_1');
const blockDishes = document.getElementById('block_dishes');
const mainbutton = document.getElementById('block_ak')
const blockFridge = document.getElementById('block_Fridge');
const block_scrol2 = document.querySelector('.block_scrol_2');
const buttonNext = document.getElementById('button_slayder_right');
const buttonPrev = document.getElementById('button_slayder_left');
const width = document.querySelector('.block_block_dishes_item').offsetWidth;
const block_meny = document.getElementById("block_meny");
// let productBlocksFridge;
let position=0, countdishes = 0;

mainbutton.onclick = function(){
	if (mainbutton.innerHTML.includes("Fridge")){
		mainbutton.innerHTML = '<div id="block_ak1"><p id="text_meny_future">Main</p></div><img src="/static/image/home.png" alt="" style="height: 100%; margin-left: 0.2vw;">';
		blockDishes.style.display = "none";
		blockFridge.style.display = "block";
		block_meny.style.display = "block";
	}
	else{
		mainbutton.innerHTML = '<div id="block_ak1"><p id="text_meny_future">Fridge</p></div><img src="/static/image/Fridge.png" alt="" style="height: 100%;">';
		blockDishes.style.display = "block";
		blockFridge.style.display = "none";
		block_meny.style.display = "none";
	}
}

checkStEnd();

buttonNext.addEventListener('click', function() {
	countdishes++;
	position-=17.38;
	rolldishes();
	checkEndDishes();
	checkStEnd();
});

buttonPrev.addEventListener('click', function() {
	countdishes--;
	position+=17.38;
	rolldishes();
	checkStEnd();
	checkEndDishes();
});

function rolldishes(){
	if(countdishes<blocks1.length-3) block_scrol1.style.transform = `translateX(${position}vw)`;
	if(countdishes<blocks2.length-3) block_scrol2.style.transform = `translateX(${position}vw)`;
}
function checkEndDishes(){
	if(countdishes>=blocks1.length-5 && countdishes>=blocks2.length-5){
		buttonNext.style.display = 'none';
		console.log('End');
	}else{
		buttonNext.style.display = 'block';
		console.log('RemoveEnd')
	}
}
function checkStEnd(){
	if(countdishes==0){
		buttonPrev.style.display = 'none';
		console.log('Start')
	}else{
		buttonPrev.style.display = 'block';
		console.log('RemoveStart')
	}
}
const blockMenyrets = document.getElementById('block_recipe_popup');
function getRecipe(id) {
  $.ajax({
    type: "POST",
    url: "/get_id",
    data: {id: id},
    success: function(Recipe){
      blockMenyrets.style.display = "block";
	  text = ""
	  for (er = 0; er < Recipe["extendedIngredients"].length; er++){
		text = text + `${Recipe["extendedIngredients"][er]["aisle"]},  quantity of product: ${Recipe["extendedIngredients"][er]["amount"]}, consistency: ${Recipe["extendedIngredients"][er]["consistency"] } <br>` 
	  }
      blockMenyrets.innerHTML= `<button id="exit_block"><strong>+</strong></button><div id="img_end_tect_resept"><img src="${Recipe["image"]}" alt="" id="img_recipe"><div id="block_all_text_in_popup"><p id="text_popup_thag">${Recipe["title"]}</p><p id="recipe_text">${Recipe["instructions"]}</p><p id="text_popup_ingrad">${text}</p></div></div>`
      const exitButtonMenyrets = document.getElementById('exit_block');
      exitButtonMenyrets.onclick = function () {
        blockMenyrets.style.display = "none";
      }
      console.log(Recipe);
    }
  });
}
// document.forms.publish.onsubmit = function() {
// 	var message = this.message.value;
// 	$.ajax({
// 		url: `https://api.spoonacular.com/food/ingredients/search?query=${message.replace(/ /g, ',')}&apiKey=3d7b2193ddc2428fae65f393615763e8`,
// 		method: 'get',
// 		dataType: 'json',
// 		success: function(data){
// 			const block_holod = document.getElementById('fridge_blocks_menu');
// 			let htmlInsert = `<ul>`
// 			for(let ier=0; ier < data["results"].length; ier++){
// 				htmlInsert = htmlInsert + `<li><div class="block_block_fridge_menu_item"><img src="https://spoonacular.com/cdn/ingredients_500x500/${data["results"][ier]["image"]}" alt="" class="img_block_block_fridge_menu_item"></div></li>`
// 			}
// 			htmlInsert += `</ul>`
// 			block_holod.innerHTML= htmlInsert
// 			productBlocksFridge = document.querySelectorAll('.block_block_fridge_menu_item')
// 			loadSerachProduct()
// 			console.log(data);
// 			console.log(data["results"][0]["image"]);
// 			// alert(data.error);  
// 		}
// 	});
// 	return false;
//   };


//   фіввппавівіііііііііііііііііііііііііі

// function loadSerachProduct(){
// 	for (var i = 0; i < productBlocksFridge.length; i++) productBlocksFridge.item(i).setAttribute("onclick", "checkClickBlockProduct(" + i + ")");
// }


// -----------------------------------------------------------------------------------------------------------------



