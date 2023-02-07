const buttonNextFridge = document.getElementById('button_fridge_slayder_right');
const blockFridgeScroll = document.querySelectorAll('.fridge_block_scrol_1');
const buttonPrevFridge = document.getElementById('button_fridge_slayder_left');
const buttonEndFridge = document.getElementById('block_block_fridge_button');
const fridgeSearchMenuDiv = document.getElementById('fridge_main_menu');
let productBlocksListFridge;
const widthRoll = 13.33;
let positionfridge = 0, countfridge = 5, countfridgeerVisibleColums = 5, indexesForNewFridgeBLocks = [4, 9, 14];
let myFridgeELements, countfridgeFillElementsForClasses;
let removeButton, clickBlockForSaveProduct;
let mas_id_Fridge = [], mas_name_Fridge = [];
let text_Fridge;
const api_key = "f3cd0361edff4cafaec27267cc4ac7fa"
// https://api.spoonacular.com/recipes/716429/information?apiKey=3d7b2193ddc2428fae65f393615763e8
// https://api.spoonacular.com/recipes/9040;11976;11529/card?apiKey=3d7b2193ddc2428fae65f393615763e8
// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=ed97ce280fd047f2b75791d8bb9e8fab
// https://api.spoonacular.com/food/ingredients/11529/information?amount=1&apiKey=9459b77b3de14757b8581ec4dcea4c23

	loadNodeListMyFridgeElements();
	addInvisibilitiOnLastBlock();
	
	function loadSerachProduct(){
		productBlocksListFridge = document.querySelectorAll('.fridge_main_menu .fridge_menu .fridge_blocks_menu .block_block_fridge_menu_item');
		for (var i = 0; i < productBlocksListFridge.length; i++) productBlocksListFridge.item(i).setAttribute("onclick", "checkClickBlockProduct(" + i + ")");
	}
	
	function loadNodeListMyFridgeElements(){
		myFridgeELements = document.querySelectorAll('.block_main_fridge .block_fridge .fridge_block_scrol_1 .block_block_fridge_item');
		addMethodsOnMyFridgeBlocks();
	}
	
	function addMethodsOnMyFridgeBlocks(){
		for(var i = 0; i < myFridgeELements.length; i++){
			myFridgeELements.item(i).setAttribute("onclick", "checkClickBlock(" + i + ")");
			myFridgeELements.item(i).setAttribute("onmouseenter", "checkOnMouseOverBlock(" + i + ")");
			myFridgeELements.item(i).setAttribute("onmouseleave", "checkOnMouseOutBlock(" + i + ")");
		}
	}
	
	function checkClickBlock(i){
		openSearchMenu();
		clickBlockForSaveProduct = myFridgeELements.item(i);
	}
	
	function checkOnMouseOverBlock(i){
		if(myFridgeELements.item(i).innerHTML != '<img src="static/image/add.png" class="block_block_fridge_menu_start_picture" alt="">'){
			myFridgeELements.item(i).insertAdjacentHTML("beforeEnd", '<button class="deleteButton" onclick="removeProduct('+i+')"><img src="static/image/delete.png" alt="" class="deleteButtonImg"></button>');
			removeButton = document.querySelector('.deleteButton');
		}
	}
	
	function checkOnMouseOutBlock(i){
		if(removeButton!=null) removeButton.remove();
		removeButton = null;
	}
	
	function closeSearchMenu(){
		fridgeSearchMenuDiv.style.display = 'none';
	}
	
	function openSearchMenu(){
		fridgeSearchMenuDiv.style.display = 'flex';
	}
	
	function checkClickBlockProduct(i){
		clickBlockForSaveProduct.innerHTML = productBlocksListFridge.item(i).innerHTML;
		clickBlockForSaveProduct.classList.add('block_block_fridge_menu_picture');
		clickBlockForSaveProduct.setAttribute("name", `${mas_name_Fridge[i]}`);
		console.log(mas_id_Fridge[i])
		$.ajax({
			url: `https://api.spoonacular.com/food/ingredients/${mas_id_Fridge[i]}/information?amount=1&apiKey=${api_key}`,
			method: 'get',
			dataType: 'json',
			success: function(data){
				if(data["categoryPath"].length >= 1){
					clickBlockForSaveProduct.setAttribute("id", data["categoryPath"][data["categoryPath"].length - 1])
				}
				// якщо ошибка---------------------------------------------------------------------------------------------
			}
		});
		checkForAddNedBlocks();
		closeSearchMenu();
	}
	
	function removeProduct(i){
		myFridgeELements.item(i).innerHTML = '<img src="static/image/add.png" class="block_block_fridge_menu_start_picture" alt="">';
		myFridgeELements.item(i).classList.remove('block_block_fridge_menu_picture');
		myFridgeELements.item(i).removeAttribute("name");
	}
	
	function addInvisibilitiOnLastBlock(){
		myFridgeELements.item(myFridgeELements.length-1-(myFridgeELements.length/3-countfridge)).style.display = 'none';
		myFridgeELements.item(myFridgeELements.length-2-(myFridgeELements.length/3-countfridge)).style.removeProperty('display');
	}
	
	function addNewFridgeBlocks(){
		for(var i = 0; i < 3; i++){
			myFridgeELements.item(indexesForNewFridgeBLocks[i]).insertAdjacentHTML('afterEnd','<div class="block_block_fridge_item"><img src="static/image/add.png" class="block_block_fridge_menu_start_picture" alt=""></div>');
		}
		loadNodeListMyFridgeElements();
		indexesForNewFridgeBLocks[0]+=1; indexesForNewFridgeBLocks[1]+=2; indexesForNewFridgeBLocks[2]+=3;
		rollNext();
	}
	
	function checkForAddNedBlocks(){
		countfridgeFillElementsForClasses = document.getElementsByClassName('block_block_fridge_menu_picture');
		if(countfridgeFillElementsForClasses.length == myFridgeELements.length-1) addNewFridgeBlocks();
	}
	
	function rollNext(){
		positionfridge-=widthRoll;
		countfridge++;
		roll();	
	}
	
	function rollPrev(){
		positionfridge+=widthRoll;
		countfridge--;
		roll(); 
	}
	
	function roll(){
		for(var i = 0; i < 3; i++){
			blockFridgeScroll.item(i).style.transform = `translateX(${positionfridge}vw)`;
		}
		checkDoVisibleButton();
		addInvisibilitiOnLastBlock();
	}
	
	function checkDoVisibleButton(){
		if(countfridge == countfridgeerVisibleColums) {
			buttonPrevFridge.setAttribute('hidden', false);
		}else{
			buttonPrevFridge.removeAttribute('hidden');
		}
		if(countfridge == (myFridgeELements.length/3) && (myFridgeELements.length/3) > 5){
			buttonNextFridge.setAttribute('hidden', false);
		}else{
			buttonNextFridge.removeAttribute('hidden');
		}
	}
	
	buttonNextFridge.addEventListener('click', function() { rollNext(); });
	buttonPrevFridge.addEventListener('click', function() { rollPrev(); });
	document.forms.publish.onsubmit = function() {
		var message = this.message.value;
		$.ajax({
			url: `https://api.spoonacular.com/food/ingredients/search?query=${message.replace(/ /g, ',')}&apiKey=${api_key}`,
			method: 'get',
			dataType: 'json',
			success: function(data){
				const block_holod = document.getElementById('fridge_blocks_menu');
				let htmlInsert = `<ul>`
				for(let ier=0; ier < data["results"].length; ier++){
					mas_id_Fridge[ier] = data["results"][ier]["id"]
					mas_name_Fridge[ier] = data["results"][ier]["name"]
					htmlInsert = htmlInsert + `<li><div class="block_block_fridge_menu_item"><img src="https://spoonacular.com/cdn/ingredients_500x500/${data["results"][ier]["image"]}" alt="" class="img_block_block_fridge_menu_item"></div></li>`
				}
				console.log(mas_id_Fridge)
				htmlInsert += `</ul>`
				block_holod.innerHTML= htmlInsert
				productBlocksFridge = document.querySelectorAll('.block_block_fridge_menu_item')
				loadSerachProduct()
				console.log(data);
				console.log(data["results"][0]["image"]);
				// alert(data.error);  
			}
		});
		return false;
	  };
function createReceptWithMyProducts(){
	countfridgeFillElementsForClasses = document.getElementsByClassName('block_block_fridge_menu_picture');
	text_Fridge = ''
	for(var i = 0; i < countfridgeFillElementsForClasses.length; i++){
		console.log(countfridgeFillElementsForClasses.item(i).getAttribute("name"));
		text_Fridge += countfridgeFillElementsForClasses.item(i).getAttribute("name")
		if (i != countfridgeFillElementsForClasses.length - 1){
			text_Fridge += ',+'
		}
		}
		console.log(text_Fridge)
		$.ajax({
			url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${text_Fridge}&number=14&apiKey=${api_key}`,
			method: 'get',
			dataType: 'json',
			success: function(data){
				console.log(data)
				let text_Fridge1 = ''
				let text_Fridge2 = ''
				for(var i = 0; i < data.length; i++){
					if(i % 2 == 0){
						text_Fridge1 += `<div class="block_block_dishes_item" style="overflow: hidden;"><img class="img_content_meny" style="border-radius: 20px; max-height: 100%;" src="${data[i]["image"]}" onclick="getRecipe(${data[i]["id"]})"></div>`
					}
					else{
						text_Fridge2 += `<div class="block_block_dishes_item" style="overflow: hidden;"><img class="img_content_meny" style="border-radius: 20px; max-height: 100%;" src="${data[i]["image"]}" onclick="getRecipe(${data[i]["id"]})"></div>`
					}
				}
				block_scrol1.innerHTML = text_Fridge1
				block_scrol2.innerHTML = text_Fridge2
				mainbutton.innerHTML = '<div id="block_ak1"><p id="text_meny_future">Fridge</p></div><img src="/static/image/Fridge.png" alt="" style="height: 100%;">';
				blockDishes.style.display = "block";
				blockFridge.style.display = "none";
				block_meny.style.display = "none";
			}
		});
}
function fin_function(e){
	console.log(e)
	countfridgeFillElementsForClasses = document.getElementsByClassName('block_block_fridge_menu_picture');
	for(var i = 0; i < countfridgeFillElementsForClasses.length; i++){
		if (countfridgeFillElementsForClasses.item(i).getAttribute("id") != e){
			countfridgeFillElementsForClasses.item(i).style.opacity = '0.3';
		}
	}
}
function Clear_sort(){
	for(var i = 0; i < countfridgeFillElementsForClasses.length; i++){
		countfridgeFillElementsForClasses.item(i).style.opacity = '1';
	}
}