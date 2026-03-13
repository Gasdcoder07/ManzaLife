from django.db import models
from django.contrib.auth.models import User

# Nuestros modelos irán a partir de aquí:

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True) # Útil para URLs amigables (ej: /categoria/playas)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    USER_TYPES = [
        ("admin", "Admin"),
        ("writter", "Escritor"),
        ("reader", "Lector")
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    is_local_business = models.BooleanField(default=False) # Para saber si es dueño de un lugar
    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPES,
        default="reader"
    )

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    image = models.ImageField(upload_to="posts/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    STATUS_CHOICES = (
        ('draft', 'Borrador'),
        ('published', 'Publicado'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')

    def __str__(self):
        return self.title

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="reviews")
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)]) # Estrellas del 1 al 5
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'post')

