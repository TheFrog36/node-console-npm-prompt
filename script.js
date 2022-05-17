const prompt = require('prompt');
const model = require('./model.js')
const fs = require('fs')
const book1 = new model.Book('Clue of the wooden footprint', 'Hadyn Kisembo', 'mystery', 10, 13, 420, 1984, 'Adelphi Edizioni', 0);
const book2 = new model.Book('2132: decimation', ' Bình Ren', 'sci-fi', 14, 6, 234, 1967, 'Rizzoli', 5);
const book3 = new model.Book('Long past dawn', 'Amag Omega', 'romance', 10, 5, 199, 1935, 'Rusconi libri editori', 7);
const book4 = new model.Book('Cry of steel', 'Yong Tenzin', 'crime', 20, 15, 201, 2008, 'Cairo editore', 50);
const book5 = new model.Book("Dragon's tears", 'Sinclair Durga', 'fantasy', 39, 30, 162, 2018, 'Fandango', 49);
const book6 = new model.Book('Sign of the burnt violin', 'Kei Bilge', 'mistery', 8, 6, 137, 1866, 'Fazi editore', 27);
const book7 = new model.Book('Crimson colony', 'Sal Arden', 'sci-fi', 50, 12, 264, 1801, 'La Corte editori', 31);
const book8 = new model.Book('Black lace', 'romance', 'Liwin Nor', 49, 4, 132, 1945, 'De Agostini editore', 24);
const book9 = new model.Book('The man in the vale', 'Safaa Terry', 'crime', 11, 8, 255, 2002, 'Giulio Einaudi editore', 21)
const book10 = new model.Book('Smoke and the rose', 'Amora Duha', 'fantasy', 39, 15, 464, 1942, 'Giunti editore', 7);
const magazine1 = new model.Magazine("Woman's day", "women's magazine", 708, "Agra SRL", 'daily', new Date('2022-05-04'), 9, 30, 2);
const magazine2 = new model.Magazine('Country living', 'forniture magazine', 333, 'Bioa', 'weekly', new Date('2022-05-13'), 12, 24, 2)
const magazine3 = new model.Magazine('Southern living', 'cooking magazine', 11, 'Sprea editori', 'annual', new Date('2023-05-03'), 8, 22, 43)
const magazine4 = new model.Magazine('Popular science', 'scintific journal', 278, 'La Scienza', 'daily', new Date('2022-05-04'), 9, 21, 18)
const magazine5 = new model.Magazine('Weight watchers', 'sports magazine', 620, 'SPORTCOM', 'monthly', new Date('2022-06-03'), 5, 19, 6)

const bookArray = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10];
const magazineArray = [magazine1,magazine2,magazine3,magazine4,magazine5]


const publicationArray = readData();
console.log(publicationArray)
console.log('benvenuto in book manager!')
startMenu();


function startMenu() {
  console.log('sono disponibili tre opzioni');
  console.log('1) aggiungi un pubblicazioni');
  console.log('2) lista libri');
  console.log('3) esci')

  prompt.start();

  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };

  prompt.get(schema, startMenuManager);
}

function startMenuManager(err, result){
  if (result.selection === '1') {
    insertMenu();
  } else if (result.selection === '2'){
    printMenu();
  } else if (result.selection === '3') {
    console.log('Grazie e a Presto!')
    process.exit();
  } else {
    console.log('selezione non disponibile');
    startMenu();
  }
}

function printMenu() {
  console.log('sono disponibili tre opzioni');
  console.log('1) lista in ordine di inserimento');
  console.log('2) lista in ordine alfabetico del titolo');
  console.log('3) lista in ordine di prezzo')
  console.log('4) torna al menù principale')
  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };
  prompt.get(schema, printMenuManager);
}

function printMenuManager(err, result) {
  if (result.selection === '1') {
    printArray(publicationArray);
    startMenu();
  } else if (result.selection === '2') {
    printArrayOrderdByTitle(publicationArray);
    startMenu();
  } else if (result.selection === '3') {
    printArrayOrderdByPrice(publicationArray);
    startMenu();
  } else if (result.selection === '4') {
    startMenu();
  } else {
    console.log('selezione non disponibile');
    printMenu();
  }
}

function printArrayOrderdByPrice(array){
    const copy = [...array]
    copy.sort((a,b) => a.price - b.price)
    printArray(copy)
}

function printArrayOrderdByTitle(array){
  const copy = [...array];   
  copy.sort(comparePublicationByTitle);
  printArray(copy);
}

function comparePublicationByTitle(pub1, pub2){
  return pub1.title.localeCompare(pub2.title);
}

function printArray(arrayToPrint){
  for (const pub of arrayToPrint) {
    console.log(pub.toString());
    console.log('----------------------')
  }
}


function insertMenu(){

  console.log('sono disponibili tre opzioni');
  console.log('1) aggiungi un libro');
  console.log('2) aggiungi un magazine');
  console.log('3) torna al menù principale')
  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };

  prompt.get(schema, insertMenuManager);
} 

function insertMenuManager(err, result){
  if (result.selection === '1') {
    insertBook();
  } else if (result.selection === '2') {
    insertMagazine();
  } else if (result.selection === '3') {
    startMenu();
  } else {
    console.log('selezione non disponibile');
    insertMenu();
  }
}

function insertBook() { //title,author,type,price,copies,pages,publication_year,publisher,discount
  const schema = {
    properties: {
      title: {
        description: 'inserisci il titolo',
      },
      author: {
        description: 'inserisci l\'autore',
      },
      type: {
        description: 'inserisci il genere',
      },
      price: {
        description: 'inserisci il prezzo',
      },
      copies: {
        description: 'inserisci il numero di copie',
      },
      pages: {
        description: 'inserisci il numero di pagine',
      },
      publication_year: {
        description: 'inserisci l\'anno di pubblicazione',
      },
      publisher: {
        description: 'inserisci la casa editrice',
      },
      discount: {
        description: 'inserisci lo sconto',
      },
    }
  };

  prompt.get(schema, insertBookManger);
  
}

function insertBookManger(err, result){
  const book = new model.Book(result.title,result.author,result.type,parseInt(result.price),parseInt(result.copies),parseInt(result.pages),parseFloat(result.publication_year),result.publisher,parseFloat(result.discount));
  publicationArray.push(book);
  console.log(publicationArray);
  saveData(bookArray)
  startMenu();
}


function insertMagazine() {


  const schema = {
    properties: {
      title: {
        description: 'inserisci il titolo',
      },
      publisher: {
        description: 'inserisci la casa editrice',
      },
      release:{
        description: 'inserisci il numero di uscita'
      }
    }
  };

  prompt.get(schema, insertMagazineManger);

}

function insertMagazineManger(err, result) {
    saveData(magazineArray)
  const magazine = new model.Magazine(result.title, result.publisher, result.release);
  publicationArray.push(magazine);
  console.log(publicationArray);
  startMenu();
}

function saveData(array){
    const JSONArray = JSON.stringify(array)
    try{
        fs.writeFileSync('./dataFile.json', JSONArray)
    } catch (error) {
        console.log('Impossibile salvare file', error.message)
    }
}

function readData(){
    let JSONArray
    try{
        JSONArray = fs.readFileSync('./dataFile.json', 'utf8')
    } catch (error) {
        console.log('impossibile leggere il file', error.message)
        JSONArray = []
    }
    const array = JSON.parse(JSONArray);
    // console.log(array)
    const pubArray = []
    for (const object of array) {
        pubArray.push(publicationFactory(object))
    }
    return pubArray
}

function publicationFactory(obj){
    if(obj.author){
        //creo libro
        return new model.Book(obj.title,obj.author,obj.type,obj.price,obj.copies,obj.pages,obj.publication_year,obj.publisher,obj.discount)
    }
    else {
        //creo magazine
    }
}