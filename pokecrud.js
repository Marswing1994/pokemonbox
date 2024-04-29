filteredPokeArray = [];
userPokemon = [];
spriteButtons = [];
menuCreated = false;

class pokemon {
    constructor(name,level,id,type,abilities,sprites,hp,moves) {
        this.name = name;
        this.level = level;
        this.id = id;
        this.type = type;
        this.abilities = abilities;
        this.sprites = sprites;
        this.hp = hp;
        this.moves = moves;
    }
}

const successfulExecution = (result) => {
    let allPokemonArray = result.results;

    allPokemonArray.forEach(monster => {
        getPokemonInfo(monster);
    });
    
    createUserPokemonList(filteredPokeArray);
    console.log(userPokemon);

    displayPokeInfo(userPokemon[0]);

    updateCurrentPokemonList();

    generateCreatePokemonMenu();

    let createButton = document.getElementById("createBtn");
    createButton.onclick = function () {
        if (userPokemon.length < 42) {
            showCreateMenu();
        } else {
            alert("Your pokebox is full. Release pokemon before you can add anymore.");
        }
        
    };//--------------------------------------------------------------------------

};

const showCreateMenu = () => {
    $("#createMenu").fadeIn();
}

//--------------CREATE--------------------
const generateCreatePokemonMenu = () => {

    // <option value="Read">Read</option>


    //adds drop box options
    filteredPokeArray.forEach((monster) => {

        let dropItem = `<option value="` + monster.name +`">${monster.name}</option>`;

        $("#pokemon-selection").prepend(dropItem);

    });

    

    // Create input boxes and set initial values to pokemon[0] from full pokemon array. (Bulbasaur).
    let nameLabel = `<label for="id_name">Name: </label>`;

    let levelLabel = `<label for="id_level">Level: </label>`;

    let hpLabel = `<label for="id_hp">HP: </label>`;

    let nameInput = `<input type="text" id="id_name_input" name="name_input" value="${filteredPokeArray[0].name}" maxlength="30" size="30"/>`;

    let levelInput = `<input type="text" id="id_level_input" name="level_input" value="${filteredPokeArray[0].level}" maxlength="3" size="5"/>`;

    let hpInput = `<input type="text" id="id_hp_input" name="hp_input" value="${filteredPokeArray[0].hp}" maxlength="3" size="5"/>`;

    let combinedInput = $(nameLabel + nameInput + "<br><br>" + levelLabel + levelInput + "<br><br>" + hpLabel + hpInput + "<br><br>");

    $("#createMenu").append(combinedInput);


    //adds add button
    let addButton = document.getElementById("addButton");
    addButton.onclick = function () {addPokemon()};

    let dropDownBox = document.getElementById("pokemon-selection");

    dropDownBox.addEventListener("change", () => {
        
        filteredPokeArray.forEach((monster) => {

            if (dropDownBox.value == monster.name) {
                updateCreateLabels(monster);
            }
        });
    });

};

const updateCreateLabels = (monster) => {
    let upperName = monster.name[0].toUpperCase() + monster.name.slice(1);
    document.getElementById("id_name_input").value = upperName;
    document.getElementById("id_level_input").value = monster.level;
    document.getElementById("id_hp_input").value = monster.hp;
};

const addPokemon = () => {

    //-------
    let chosenPokemon = $("#pokemon-selection").val();

    let pokemonInQuestion = null;
    filteredPokeArray.forEach((monster) => { 
        if (monster.name == chosenPokemon) {
            pokemonInQuestion = monster;
        }
    });


    let upperName = pokemonInQuestion.name[0].toUpperCase() + pokemonInQuestion.name.slice(1);

    let pokemonMoves = [];
        let moveCount = 4;
        if (pokemonInQuestion.moves.length < 4) {
            moveCount = pokemonInQuestion.length;
        }
        for (m = 0; m < moveCount; m++) {
            let move = Math.round(Math.random());
            if (move == 1) {
                pokemonMoves.push(pokemonInQuestion.moves[m]);
            }
            if (m == pokemonInQuestion.moves.length - 1 && pokemonMoves.length == 0) {
                pokemonMoves.push(pokemonInQuestion.moves[0]);
            }
        }

    let level = Math.round(Math.random() * (100) + 1);

    let newPokemon = new pokemon (
        //name,level, id,type,abilities,sprites,hp,moves
        upperName,
        pokemonInQuestion.level,
        pokemonInQuestion.id,
        pokemonInQuestion.type,
        pokemonInQuestion.abilities,
        pokemonInQuestion.sprites.front_default,
        pokemonInQuestion.hp,
        pokemonMoves,
    );

    newPokemon.level = level;

    userPokemon.push(newPokemon);

    updateCurrentPokemonList();
    displayPokeInfo(newPokemon);
   
    console.log(userPokemon);

    $("#createMenu").fadeOut();

};

//------------READ----------------------
const displayPokeInfo = (monster) => {

    $("#display").empty();

    console.log(monster.name + " displayPokeInfo");

    let name = monster.name;

    let level = monster.level;

    let id = monster.id;

    let hp = monster.hp;

    let moves = monster.moves;

    let wrapper = $("#display");

    let openPara = `<p>`;

    let closePara = `</p>`;

    let openH3 = `<h3>`;

    let closeH3 = `</h3>`;

    let image = `<img src="${monster.sprites}" alt="Pokemon sprite" class="pokeSprite">`;

    let idLine = openPara + "No. " + id + closePara;

    let nameLine = openH3 + name + closeH3;

    let levelLine = openH3 + "Lv: " + level + closeH3;

    let typesToString = "";

    let type = monster.type;

    for (i = 0; i < type.length; i++) {
        if (i == type.length -1) {
            typesToString += `${type[i].type.name}`; 
        } else {
            typesToString += `${type[i].type.name}` + ', '; 
        } 
    };

    let typeLine = openPara + "Type: " + typesToString + closePara;

    let hpLine = openPara + "HP: " + hp + closePara;

    let abilitiesToString = "";

    let abilities = monster.abilities;

    for (i = 0; i < abilities.length; i++) {
        if (i == abilities.length -1) {
            abilitiesToString += `${abilities[i].ability.name}`; 
        } else {
            abilitiesToString += `${abilities[i].ability.name}` + ', '; 
        } 
    }

    let abilitiesLine = openPara + "Abilities: " + abilitiesToString + closePara;

    let movesToString = "";

    for (i = 0; i < moves.length; i++) {
        if (i == moves.length -1) {
            movesToString += `${moves[i].move.name}`; 
        } else {
            movesToString += `${moves[i].move.name}` + ', '; 
        } 
    }

    let movesLine = openPara + "Moves: " + movesToString + closePara;

    let combined = $(idLine + image + nameLine + levelLine + typeLine + hpLine + abilitiesLine + movesLine + "<br>");
        
    wrapper.prepend(combined);

    let editButton = document.getElementById("editBtn");
    editButton.onclick = function () {editPokemon(monster)};


    let deleteButton = document.getElementById("deleteBtn");
    deleteButton.onclick = function () {deletePokemon(monster)};

};

//---------------UPDATE----------------------------------
const editPokemon = (monster) => {

    $("#editPokeInfo").fadeIn();

    let wrapper = $("#editPokeInfo");

    let alert = `<p id="alert">Leave blank if you wish items to remain unchanged.</p>`

    let editName = `<input type="text" id="id_name_edited" name="name_edited" value="" maxlength="60" size="20" placeholder="Nickname" />`;

    let editLevel = `<input type="text" id="id_level_edited" name="level_edited" value="" maxlength="3" size="20" placeholder="Updated Level" />`;

    let editHP = `<input type="text" id="id_hp_edited" name="hp_edited" value="" maxlength="60" size="20" placeholder="Updated HP" />`;

    let saveBtn = `<button id="saveButton")">SAVE</button>`;

    let popUp = $(alert + editName + "<br>" + editLevel + "<br>"  + editHP + "<br>" + saveBtn);
    console.log(popUp);
    wrapper.append(popUp);

    let saveButton = document.getElementById("saveButton");
    saveButton.onclick = function () {saveEdits(monster)};

};

const saveEdits = (monster) => {

    let pokemonInQuestion = userPokemon.indexOf(monster);

    let editedName = $("#id_name_edited").val();

    let editedLevel = $("#id_level_edited").val();

    let editedHP = $("#id_hp_edited").val();

    if (editedName != "") {

        monster.name = editedName;

    };

    if (editedLevel != "") {

        monster.level = editedLevel;

    };

    if (editedHP != "") {

        monster.hp = editedHP;

    };

    displayPokeInfo(userPokemon[pokemonInQuestion]);
    updateCurrentPokemonList();
    console.log(userPokemon);

    $("#editPokeInfo").fadeOut();

    $("#editPokeInfo").empty();

};

const updateCurrentPokemonList = () => {
    let spriteDisplay = $("#sprites");
    spriteDisplay.empty();
    spriteButtons = [];
    let buttonID = "";
    userPokemon.forEach((monster) => {
        let imageBtn = ``;
        if (spriteButtons.includes(monster.name)) {
            let count = userPokemon.filter(x => x == monster.name).length;
            let countInArray = spriteButtons.filter(x => x == monster.name + '#').length;
            let actCount = 1;
            console.log("duplicate: " + monster.name);
            if (countInArray != count) {
                actCount = countInArray+1;
            }
            buttonID = monster.name + "button" + actCount;
            imageBtn = `<button class="spriteBtn" id="${buttonID}"> <img src="${monster.sprites}" alt="Pokemon sprite" class="pokeSprite"> </button>`;
        } else {
            buttonID = monster.name + "button";
            imageBtn = `<button class="spriteBtn" id="${buttonID}"> <img src="${monster.sprites}" alt="Pokemon sprite" class="pokeSprite"> </button>`;
        }
        spriteDisplay.append(imageBtn);
        // for checks
        spriteButtons.push(monster.name);
        
        let objElement = document.getElementById(buttonID);
        objElement.onclick = function () {
            displayPokeInfo(monster);
        };

    });
}

//-----------------DELETE--------------------------------
const deletePokemon = (monster) => {

    let pokemonInQuestion = userPokemon.indexOf(monster);

    alert("You released " + monster.name + ". Goodbye " + monster.name + "!");

    console.log("Released " + monster.name);

    userPokemon.splice(pokemonInQuestion, 1);

    updateCurrentPokemonList();

    displayPokeInfo(userPokemon[0]);

    console.log(userPokemon);

};

//creates 30 random pokemon for user with random amount of abilities based off their total number of abilities with that being a random ability off that list
const createUserPokemonList = (mainArray) => {
    userPokemon = []
    //1025 total pokemon in main array
    let displayPokemon = 36;
    
    for (i = 0; i < displayPokemon; i++) {
        // ---------------------------total pokemon in pokeApi
        let rndLrgNum = Math.random() * (1025);
        // ---------------------------random pokemon to add to list
        let pokemonToAdd = mainArray.at(rndLrgNum);
        // ---------------------------abilities
        let pokemonAbilities = [];
        for (a = 0; a < pokemonToAdd.abilities.length; a++) {
            let ability = Math.round(Math.random());
            if (ability == 1) {
                pokemonAbilities.push(pokemonToAdd.abilities[a]);
            }
            if (a == pokemonToAdd.abilities.length - 1 && pokemonAbilities.length == 0) {
                pokemonAbilities.push(pokemonToAdd.abilities[0]);
            }
        }
        // ---------------------------moves
        let pokemonMoves = [];
        let moveCount = 4;
        if (pokemonToAdd.moves.length < 4) {
            moveCount = pokemonToAdd.length;
        }
        for (m = 0; m < moveCount; m++) {
            let move = Math.round(Math.random());
            if (move == 1) {
                pokemonMoves.push(pokemonToAdd.moves[m]);
            }
            if (m == pokemonToAdd.moves.length - 1 && pokemonMoves.length == 0) {
                pokemonMoves.push(pokemonToAdd.moves[0]);
            }
        }
        // ---------------------------sprites
        let spriteURL = "";

        let randomNum = Math.round(Math.random() * (100));
        let isShiny = false;
        if (randomNum > 98) { //shiny

            spriteURL = pokemonToAdd.sprites.front_shiny;
            isShiny = true;
            console.log("You got a shiny " + pokemonToAdd.name +", yay!");

        } else {

            spriteURL = pokemonToAdd.sprites.front_default;

        };

        // ---------------------------level
        let level = Math.round(Math.random() * (100) + 1);

        // ---------------------------create pokemon

        // ---------------------------name
        let pokemonName = "";
        if (isShiny) {
            pokemonName = pokemonToAdd.name + " ✨";
        } else {
            pokemonName = pokemonToAdd.name;
        }

        let upperName = pokemonName[0].toUpperCase() + pokemonName.slice(1);

        let newPokemon = new pokemon (
            //name,id,type,abilities,sprites,hp,moves
            upperName,
            level,
            pokemonToAdd.id,
            pokemonToAdd.type,
            pokemonAbilities,
            spriteURL,
            pokemonToAdd.hp,
            pokemonMoves,
        );

        userPokemon.push(newPokemon);
    }
}

//Builds Initial Pokemon array with only the info we want from api.
const getPokemonInfo = (pokemonURL) => {
    $.ajax({

        type: "GET",
        url: pokemonURL.url,
        dataType: "json",
        async: false,

        success: function (data) {

            let pocketMonster = new pokemon(
                //name,id,type,abilities,sprites,hp,moves
                data.name, 
                0,
                data.id, 
                data.types, 
                data.abilities, 
                data.sprites, 
                data.stats[0].base_stat, 
                data.moves
            );
            
            filteredPokeArray.push(pocketMonster);

        },

        error: function (xhr, status, error) {

            alert(
                "Result: " +
                  status +
                  " " +
                  error +
                  " " +
                  xhr.status +
                  " " +
                  xhr.statusText
              );

        },

      });
}

//gets the info from the api
const getAllPokemon = () => {

    $.ajax({

        type: "GET",
        url: "https://pokeapi.co/api/v2/pokemon?limit=1025",
        dataType: "json",
        

        success: function (data) {

            successfulExecution(data);

        },

        error: function (xhr, status, error) {

          alert(
            "Result: " +
              status +
              " " +
              error +
              " " +
              xhr.status +
              " " +
              xhr.statusText
          );

        },

      });

};

$("#editPokeInfo").hide();

$("#createMenu").hide();

$(document).ready(getAllPokemon);