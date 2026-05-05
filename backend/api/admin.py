from django.contrib import admin
from .models import Post, Comment, Like, Category, UserProfile, Review, SystemRequest

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Category)
admin.site.register(UserProfile)
admin.site.register(Review)
admin.site.register(SystemRequest)



# Register your models here.
