from django.shortcuts import render
from django.http import HttpResponse
from .models import Book,BookSerializer
from django.contrib import messages
import json
# Create your views here.

def home(request):
    return render(request,'basic.html');

def saveBook(request):
    name = request.GET.get('name')
    price = request.GET.get('price')
    pages = request.GET.get('pages')
    book = Book(name=name, price=price, pages=pages)

    try:
        book.save()
        messages.success(request,  "Your book has been added successfully")
        return HttpResponse('true')
    except:
        return HttpResponse('false')

def getAllBooks(request):
    listt = list();
    books = Book.objects.all() # Query set
    for bk in books:
       ser = BookSerializer(bk)
       listt.append(ser.data)  # json object
       print(ser.data) 
    print(listt)   # json list
    return HttpResponse(json.dumps(listt)) # convert python list to json array


def deletebook(request):
    id = request.GET.get('id')
    book = Book.objects.filter(id= id)
    print(id)
    try:
       book.delete();
       return HttpResponse('true')
    except:
        return HttpResponse('false')

def signup(request):
    name = request.GET.get('name')
    

