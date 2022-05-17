class Publication {
    constructor(title, price, type, copies, publisher, discount, tax){
        this.title = title
        this.price = price
        this.type = type
        this.copies = copies
        this.publisher = publisher
        this.discount = discount
        this.tax = tax
    }

    round_number(number, dec_places){
        return (Math.round(number * (10**dec_places))) / (10 ** dec_places);
    }

    toString(){
        const publication_string ='title: ' + this.title + '\n' +
                                  'type: ' + this.type + '\n' +
                                  'price: ' + this.price + '$\n' +
                                  'public price:' + this.round_number(this.get_public_price(),2) +'$\n'+
                                  'copies: ' + this.copies + '\n' +
                                  'publisher: ' + this.publisher + '\n' +
                                  'discount: ' + this.discount + '%\n';
        return publication_string
    }

    get_public_price(){
        return this.price + this.price * (0.3 + this.tax) - this.price / 100 * this.discount
    }
}

class Book extends Publication{
    constructor(title,author,type,price,copies,pages,publication_year,publisher,discount){
        super(title, price, type, copies, publisher, discount, 0.1)
        this.author = author
        this.pages = pages
        this.publication_year = publication_year
    }

    toString(){
        const stringBook = super.toString()
        const stringBook2 = "author: " + this.author + "\n" +
                     "pages: " + this.pages + "\n" +
                     "publication_year: " + this.publication_year;
        return stringBook + stringBook2
    }
}

class Magazine extends Publication{
    constructor(title, type, release_number, publisher, periodicy, release_date, price, copies, discount){
        super(title, price, type, copies, publisher, discount, 0.2)
        this.release_number = release_number
        this.periodicy = periodicy
        this._release_date = release_date
    }

    set release_date(value){
        const time = value.getTime();
        this._release_date = time;
    }

    get release_date(){
        const date = new Date(this._release_date);
        return date
    }

    toString(){
        const stringMagazine = super.toString()
        const stringMagazine2 = "release_number: " + this.release_number + "\n" + 
                                "periodicy: " + this.periodicy + "\n" + 
                                "release_date: " + this.release_date;
     return stringMagazine + stringMagazine2                         
    }
} 

exports.Book = Book;
exports.Magazine = Magazine;
