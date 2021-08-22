from django.db import models
from rest_framework import serializers
# Create your models here.

class Book(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=19, decimal_places=4)
    pages = models.IntegerField(default = 0)


class BookSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    price = serializers.DecimalField(max_digits=19, decimal_places=2)
    pages = serializers.IntegerField(default = 0)
    id = serializers.IntegerField()