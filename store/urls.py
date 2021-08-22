from django.urls import path,include
from . import views
urlpatterns = [
    
    path('',views.home,name = 'home'),
    path('save_book',views.saveBook,name = 'saveBook'),
    path('getAllBooks',views.getAllBooks,name = 'getAllBooks'),
    path('deletebook',views.deletebook,name = 'deletebook'),
]
