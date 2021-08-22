console.log("hello")

window.onload = initAll;

function initAll() 
{
    saveBookButton = document.getElementById('save_book')
    saveBookButton.onclick = saveBook;
}

function saveBook() 
{   
    console.log("clicked")
    var name = document.getElementById('book_name').value;
    var price = document.getElementById('book_price').value;
    var pages = document.getElementById('book_pages').value;

   
    var url ='/save_book?name=' + name +'&price=' + price +'&pages=' + pages;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
              if(req.responseText)
              {
                document.getElementById('book_name').value = ""
                document.getElementById('book_price').value  = ""
                document.getElementById('book_pages').value = ""
                
              }

        }
    };
    req.open("GET",url, true);
    req.send();

} 

function showAllBooks() 
{
    console.log("show")
    var url ='/getAllBooks';
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {        
            var data = eval(req.responseText);
            var div = document.getElementById('profile')
            div.innerHTML = "";
            var table = document.createElement('table')

                var row = table.insertRow(0);
                var name = row.insertCell(0);
                var price = row.insertCell(1);
                var pages = row.insertCell(2);
                var deletebooks = row.insertCell(3);

                name.innerHTML = "Book Name";
                price.innerHTML = "Book Price";
                pages.innerHTML = "Number of Pages";
                deletebooks.innerHTML = "Delete";
                name.className = "table-dark"
                price.className = "table-dark"
                pages.className = "table-dark"
                deletebooks.className = "table-dark"

                for(var i=0; i<data.length; i++) 
                {
                    var row = table.insertRow(i+1);
                    var name = row.insertCell(0);
                    var price = row.insertCell(1);
                    var pages = row.insertCell(2);
                    var deletebook = row.insertCell(3);
                    name.innerHTML = data[i].name;
                    price.innerHTML = data[i].price;
                    pages.innerHTML = data[i].pages;
                    deletebook.innerHTML = '&times';
                    deletebook.className = 'text-danger text-center';
                    deletebook.style.fontsize = '20px';
                    deletebook.style.cursor = 'pointer';
                    deletebook.id = data[i].id;
                    deletebook.className = 'deleteButton';
                    
                    deletebook.onclick = function() 
                    {   
                        var obj = this;
                        var id = this.id;
                        console.log("id: " + id);
                        var url ='/deletebook?id='+id;
                        var req = new XMLHttpRequest();
                        req.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                               
                                if(req.responseText == 'true')
                                 {
                                    table.deleteRow(obj.parentNode.rowIndex)
                                 }
                            }
                        };
                        req.open("GET",url, true);
                        req.send();

                    }
                } 
            table.className = 'table text-center'
            div.appendChild(table)
        }
    };
    req.open("GET",url, true);
    req.send();
}

// deletebook.innerHTML = '<i class= "fa fa-trash-o" style="font-size:36px" aria-hidden="true"></i>';